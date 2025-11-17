# real-estate-chatbot



🏡 Real Estate Analysis Chatbot



A full-stack AI-powered chatbot that analyzes real-estate locality trends using Excel data.

Built with React (frontend) + Node.js/Express (backend) + XLSX analysis.



🚀 Features

✅ Chatbot Analysis



Analyze price trends of any locality



Compare two areas (e.g., Ambegaon Budruk vs Aundh)



Automatically extracts relevant rows from Excel sheet



Generates:



Summary report



Price trend graph



Table for raw data



✅ Backend (Node.js + Express)



Reads Excel file (Sample\_data.xlsx)



Filters data by area



Generates chart values



Returns JSON API response



✅ Frontend (React)



User query input box



Shows summary, line chart, and table



Uses Bootstrap + Recharts



Calls backend API using Axios



🗂 Folder Structure

real-estate-chatbot/

│

├── backend/

│   ├── index.js

│   ├── Sample\_data.xlsx

│   └── package.json

│

├── frontend/

│   ├── src/

│   │   └── App.js

│   └── package.json

│

└── README.md



🛠️ Tech Stack

Frontend:



React



Axios



Bootstrap



Recharts



Backend:



Node.js



Express



XLSX



CORS



Dotenv



⚙️ Installation

1️⃣ Clone the repository

git clone https://github.com/ParthbHirpara/real-estate-chatbot.git

cd real-estate-chatbot



📦 Backend Setup

cd backend

npm install

npm start





Backend will run at:

👉 http://localhost:5000



💻 Frontend Setup

cd frontend

npm install

npm start





Frontend runs at:

👉 http://localhost:3000

