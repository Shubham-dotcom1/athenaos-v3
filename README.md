
<div align="center">

# 🏏 AthenaOS Dashboard v3
### Advanced Real-Time Emotion Analytics for Women's Cricket

![AthenaOS Banner](https://via.placeholder.com/1200x400?text=AthenaOS+Dashboard+Preview)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688.svg)](https://fastapi.tiangolo.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**AthenaOS** is a next-generation sports analytics dashboard that visualizes the **emotional pulse** of a cricket match.  
It goes beyond traditional stats (runs/wickets) to quantify **Pressure**, **Momentum**, and **Collapse Risk** in real-time.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage)

</div>

---

## 🚀 Features

| Feature | Description |
| :--- | :--- |
| **📈 E(t) Emotion Score** | A proprietary algorithm quantifying match excitement ball-by-ball. |
| **🔥 Pressure Index** | Quantifies the mounting pressure on batters based on RRR, wickets, and match phase. |
| **🛡️ ArmorIQ Security** | **Intent Assurance** middleware ensuring agent alignment and cryptographic verification. |
| **🏏 IPL Emotion Model** | Fine-tuned **DistilBERT** model achieving **99.78% accuracy** on cricket commentary. |
| **🤖 AI Storyteller** | Generates narrative summaries of the match using **Google Gemini 1.5 Flash**. |
| **💬 RAG Chatbot** | Secure, data-grounded AI assistant with intent-token verification. |
| **🎥 Multi-Modal Input** | Analyze matches via ESPNcricinfo URLs, Video Uploads (Whisper), or Raw Commentary. |

## 🛠️ Tech Stack

### **Frontend**
*   ![Next.js](https://img.shields.io/badge/next.js-000000?style=flat&logo=nextdotjs&logoColor=white) **Next.js 14**
*   ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white) **TailwindCSS**
*   **Framer Motion** (Animations)
*   **Recharts / Chart.js** (Visualizations)

### **Backend**
*   ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi) **FastAPI**
*   ![Python](https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=ffdd54) **Python**
*   **Uvicorn** (ASGI Server)

### **AI & Security**
*   ✨ **Google Gemini 1.5 Flash** (RAG & Narratives)
*   🛡️ **ArmorIQ AI** (Intent Assurance & Security Layer)
*   🏏 **DistilBERT** (Fine-tuned for cricket sentiment)
*   🗣️ **OpenAI Whisper** (Audio processing)

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Shubham-dotcom1/athenaos-v3.git
cd athenaos-v3
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

---

## 🏃‍♂️ Usage

### 1. Start the Backend
```bash
# In athenaos_backend terminal
uvicorn app.new_main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Start the Frontend
```bash
# In athenaos-ui terminal
npm run dev
```

Visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the dashboard.

---

## 🔑 Environment Variables

Create a `.env` file in `athenaos_backend` and `.env.local` in `athenaos-ui` with the following keys:

*   `GEMINI_API_KEY`: For AI story generation and RAG chatbot.
*   `ARMOR_IQ_API_KEY`: To enable intent assurance and security tracking.
*   `NEXT_PUBLIC_FIREBASE_*`: For user authentication context.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

<div align="center">
  <sub>Built with ❤️ by the AthenaOS Team</sub>
</div>