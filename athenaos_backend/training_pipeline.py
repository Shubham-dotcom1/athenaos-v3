import os
import re
import logging
import time
import pandas as pd
import torch
import numpy as np
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from transformers import (
    DistilBertTokenizerFast,
    DistilBertForSequenceClassification,
    Trainer,
    TrainingArguments,
    DataCollatorWithPadding
)

# -----------------------------------------------------------------------------
# LOGGING CONFIGURATION
# -----------------------------------------------------------------------------
LOG_FILE = "training_pipeline.log"
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE, encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# -----------------------------------------------------------------------------
# DATASET AND MODEL PATHS
# -----------------------------------------------------------------------------
INPUT_CSV = "ipl_3000_clean_commentary.csv"
LABELED_CSV = "ipl_labeled_commentary.csv"
MODEL_PATH = "emotion_model/"

# -----------------------------------------------------------------------------
# PHASE 1: AUTO LABELING
# -----------------------------------------------------------------------------
def auto_label(df: pd.DataFrame) -> pd.DataFrame:
    """
    Applies rule-based labeling to the commentary column.
    Labels: 0 (Neutral), 1 (Positive), 2 (Pressure)
    """
    logger.info("Starting Phase 1: Auto Labeling...")
    
    def get_label(text):
        text = str(text).lower()
        
        # Define keyword sets
        pressure_keywords = ["out", "bowled", "caught", "wicket", "lbw", "dismissed"]
        positive_keywords = ["six", "four", "boundary", "maximum", "century", "fifty"]
        
        # Check for Pressure (Word boundary aware)
        is_pressure = any(re.search(rf"\b{w}\b", text) for w in pressure_keywords)
        # Check for Positive (Word boundary aware)
        is_positive = any(re.search(rf"\b{w}\b", text) for w in positive_keywords)
        
        # Heuristic: If it has 'out'/'wicket' it's likely pressure even if a four was hit (e.g. "out next ball after a four")
        # But if it's just 'mid-wicket', the regex \bwicket\b will FAIL on "mid-wicket" (because of the hyphen)
        # Wait, \b matches hyphen? No, \b is between \w and [^\w]. Hyphen is [^\w].
        # So \bwicket\b WOULD match "mid-wicket".
        # Let's be even safer: negative lookbehind/lookahead for common cricket terms
        
        if is_pressure:
            # Check if 'wicket' is part of a position
            if "mid-wicket" in text or "wicket-to-wicket" in text or "wicketkeeper" in text:
                # Re-evaluate: if it still has 'out' or 'bowled' as separate words, it's pressure
                other_pressure = any(re.search(rf"\b{w}\b", text) for w in ["out", "bowled", "caught", "lbw", "dismissed"])
                if not other_pressure:
                    is_pressure = False

        if is_pressure: return 2
        if is_positive: return 1
        return 0

    df['label'] = df['commentary'].apply(get_label)
    
    label_map = {0: "Neutral", 1: "Positive", 2: "Pressure"}
    dist = df['label'].value_counts().to_dict()
    human_dist = {label_map[k]: v for k, v in dist.items()}
    
    logger.info(f"Label distribution: {human_dist}")
    return df

# -----------------------------------------------------------------------------
# DATASET WRAPPER
# -----------------------------------------------------------------------------
class CommentaryDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

# -----------------------------------------------------------------------------
# PHASE 2: TRAINING AND EVALUATION
# -----------------------------------------------------------------------------
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, predictions, average='weighted')
    acc = accuracy_score(labels, predictions)
    return {
        'accuracy': acc,
        'f1': f1,
        'precision': precision,
        'recall': recall
    }

def run_pipeline():
    start_time = time.time()
    logger.info("Training Pipeline Started.")
    
    try:
        # Load Data
        if not os.path.exists(INPUT_CSV):
            logger.error(f"Input file {INPUT_CSV} not found.")
            return
            
        df = pd.read_csv(INPUT_CSV)
        df = df.dropna(subset=['commentary'])
        logger.info(f"Dataset loaded. Total rows: {len(df)}")
        
        # Phase 1: Labeling
        df = auto_label(df)
        df.to_csv(LABELED_CSV, index=False)
        logger.info(f"Labeled data saved to {LABELED_CSV}")
        
        # Runtime Safety Checks
        if len(df) < 1000:
            logger.error("Security check failed: Less than 1000 samples found.")
            return
            
        if len(df['label'].unique()) < 3:
            logger.error("Security check failed: Not all 3 classes are present.")
            return

        # Prepare for Training
        train_texts, val_texts, train_labels, val_labels = train_test_split(
            df['commentary'].tolist(), 
            df['label'].tolist(), 
            test_size=0.2, 
            random_state=42
        )
        
        logger.info(f"Split sizes: Train={len(train_texts)}, Test={len(val_texts)}")
        
        # Tokenization
        logger.info("Initializing Tokenizer (distilbert-base-uncased)...")
        tokenizer = DistilBertTokenizerFast.from_pretrained('distilbert-base-uncased')
        
        train_encodings = tokenizer(train_texts, truncation=True, padding=True)
        val_encodings = tokenizer(val_texts, truncation=True, padding=True)
        
        train_dataset = CommentaryDataset(train_encodings, train_labels)
        val_dataset = CommentaryDataset(val_encodings, val_labels)
        
        # Model Setup
        device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"Detecting Device: {device.upper()}")
        
        model = DistilBertForSequenceClassification.from_pretrained(
            'distilbert-base-uncased', 
            num_labels=3
        ).to(device)
        
        # Training Arguments
        training_args = TrainingArguments(
            output_dir='./results',
            num_train_epochs=3,
            per_device_train_batch_size=16,
            per_device_eval_batch_size=16,
            learning_rate=2e-5,
            eval_strategy="epoch",  # Fixed for transformers 5.x
            save_strategy="epoch",
            logging_dir='./logs',
            logging_steps=10,
            load_best_model_at_end=True,
            report_to="none" # Hackathon style: no wandb/tensorboard overhead
        )
        
        # Trainer Initialization
        trainer = Trainer(
            model=model,
            args=training_args,
            train_dataset=train_dataset,
            eval_dataset=val_dataset,
            compute_metrics=compute_metrics,
        )
        
        # Phase 2: Training
        logger.info("Phase 2: Starting Model Training...")
        trainer.train()
        logger.info("Training complete.")
        
        # Phase 3: Evaluation
        logger.info("Phase 3: Evaluating Model...")
        metrics = trainer.evaluate()
        
        logger.info(f"Final Metrics: {metrics}")
        
        # Save Model
        if not os.path.exists(MODEL_PATH):
            os.makedirs(MODEL_PATH)
        trainer.save_model(MODEL_PATH)
        tokenizer.save_pretrained(MODEL_PATH)
        logger.info(f"Model saved to {MODEL_PATH}")
        
    except Exception as e:
        logger.exception(f"An error occurred during training: {e}")
    finally:
        end_time = time.time()
        elapsed = end_time - start_time
        logger.info(f"Pipeline Finished. Total Runtime: {elapsed:.2f} seconds")

if __name__ == "__main__":
    run_pipeline()
