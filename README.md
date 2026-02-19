# AthenaOS Dashboard 🏏
### Advanced Real-Time Emotion Analytics for Women's Cricket

AthenaOS is a next-generation sports analytics dashboard that visualizes the **emotional pulse** of a cricket match. It goes beyond traditional stats (runs/wickets) to quantify Pressure, Momentum, and Collapse Risk in real-time.

![AthenaOS Dashboard](https://via.placeholder.com/1200x600?text=AthenaOS+Dashboard+Preview)

## 🚀 Features

*   **E(t) Emotion Score**: A proprietary algorithm quantifying match excitement ball-by-ball.
*   **Pressure Index**: Quantifies the mounting pressure on batters based on RRR, wickets, and match phase.
*   **Real-Time Heatmaps**: Visualizes intensity distribution across overs.
*   **AI Storyteller**: Generates narrative summaries of the match using Google Gemini 1.5 Flash.
*   **RAG Chatbot**: Chat with an AI assistant that knows the match context and cricket rules.
*   **Multi-Modal Input**: Analyze matches via:
    *   Pre-loaded scenarios
    *   ESPNcricinfo URLs
    *   Video Uploads (Whisper Transcriptions)
    *   Raw Commentary Text

## 🛠️ Tech Stack

*   **Frontend**: Next.js 14, TailwindCSS, Framer Motion, Recharts / Chart.js
*   **Backend**: FastAPI (Python), Uvicorn
*   **AI/ML**: Google Gemini 1.5, OpenAI Whisper, VADER Sentiment Analysis
*   **Database**: In-memory (for MVP), extensible to PostgreSQL/Supabase

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/athenaos-dashboard.git
cd athenaos-dashboard
```

### 2. Backend Setup
```bash
cd athenaos_backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd ../athenaos-ui
npm install
```

## 🏃‍♂️ Usage

1.  **Start the Backend**:
    ```bash
    # In athenaos_backend terminal
    uvicorn app.new_main:app --host 0.0.0.0 --port 8000 --reload
    ```

2.  **Start the Frontend**:
    ```bash
    # In athenaos-ui terminal
    npm run dev
    ```

3.  Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the dashboard.

## 🔑 Environment Variables

Required `.env` keys (not included in repo):
*   `GEMINI_API_KEY`: For AI features
*   `NEXT_PUBLIC_FIREBASE_*`: For authentication context

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
