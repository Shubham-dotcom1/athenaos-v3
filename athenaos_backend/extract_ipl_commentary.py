
import pandas as pd
import os
import glob
from pathlib import Path

class IPLCommentaryExtractor:
    """
    State-of-the-art IPL Commentary Extractor.
    Processes CSV 'Label' columns primarily, with a deep-scan fallback
    for TXT files to ensure 3000+ clean lines for hackathon use.
    """
    
    def __init__(self, folder_path: str):
        self.folder_path = folder_path
        self.raw_lines_count = 0
        self.filtered_lines = []
        
    def filter_ball_line(self, line: str) -> bool:
        """Central logic for ball-by-ball commentary detection."""
        line = line.strip()
        # Must contain " to " and a comma for ball events (e.g. "Bowler to Batter, result")
        if " to " in line and "," in line:
            return True
        return False

    def process_csv_files(self):
        """Reads CSV files and extracts text from the 'Label' column."""
        csv_files = glob.glob(os.path.join(self.folder_path, "**/*.csv"), recursive=True)
        print(f"📂 Scanning {len(csv_files)} CSV files...")
        
        for file in csv_files:
            try:
                # Handle encoding
                try:
                    df = pd.read_csv(file, encoding='utf-8')
                except UnicodeDecodeError:
                    df = pd.read_csv(file, encoding='latin-1')
                
                if 'Label' in df.columns:
                    for entry in df['Label']:
                        if pd.isna(entry): continue
                        lines = entry.splitlines()
                        for l in lines:
                            self.raw_lines_count += 1
                            if self.filter_ball_line(l):
                                self.all_rows.append(l.strip())
            except Exception as e:
                print(f"⚠️ Error reading CSV {os.path.basename(file)}: {e}")

    def process_txt_fallback(self):
        """Fallback: Reads raw .txt files if CSV extraction doesn't yield 3000 lines."""
        txt_files = glob.glob(os.path.join(self.folder_path, "**/*.txt"), recursive=True)
        print(f"🛠️  Fallback: Scanning {len(txt_files)} TXT files for ball-by-ball data...")
        
        for file in txt_files:
            try:
                with open(file, 'r', encoding='utf-8', errors='ignore') as f:
                    for line in f:
                        self.raw_lines_count += 1
                        if self.filter_ball_line(line):
                            self.all_rows.append(line.strip())
            except Exception as e:
                print(f"⚠️ Error reading TXT {os.path.basename(file)}: {e}")

    def run(self, output_name: str, target_count: int = 3000):
        self.all_rows = []
        
        # 1. Try CSV Group
        self.process_csv_files()
        
        # 2. Check and Apply Fallback if CSVs are metadata-only (common in this dataset)
        if len(self.all_rows) < target_count:
            self.process_txt_fallback()
            
        # Clean and Deduplicate
        unique_lines = list(dict.fromkeys(self.all_rows)) # Preserves order
        
        # Final Selection
        final_selection = unique_lines[:max(target_count, len(unique_lines))]
        
        # Save to CSV
        pd.DataFrame(final_selection, columns=['commentary']).to_csv(output_name, index=False)
        
        # Reporting
        print("\n" + "="*50)
        print("🚩 IPL EXTRACTION DASHBOARD")
        print("="*50)
        print(f"📊 Total Raw Lines Scanned: {self.raw_lines_count}")
        print(f"📊 Filtered Commentary:     {len(self.all_rows)}")
        print(f"📊 Unique Clean Lines:      {len(unique_lines)}")
        print(f"📊 Final Sample Count:      {len(final_selection)}")
        print(f"💾 File Saved:              {output_name}")
        
        print("\n🔍 SAMPLE EXTRACTS (Ball-by-Ball):")
        for i, line in enumerate(final_selection[:10], 1):
            print(f"{i}. {line}")
        print("="*50)

if __name__ == "__main__":
    DATASET_ROOT = "D:/ipl_data/ipl_dataset"
    OUTPUT_FILE = "ipl_3000_clean_commentary.csv"
    
    app = IPLCommentaryExtractor(DATASET_ROOT)
    app.run(OUTPUT_FILE, target_count=3000)
