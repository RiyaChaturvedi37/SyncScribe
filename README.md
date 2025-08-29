### ✨ SyncScribe – Cloud-Based Collaborative Document Editor

SyncScribe is a real-time collaborative document editor  built with React.js, Node.js, Express, MongoDB, and AWS S3.
It allows users to create, edit, and manage documents securely in the cloud with real-time synchronization.

🚀 Features

✍️ Create & Edit Documents – Write and edit text with live autosave.

🔄 Real-time Sync – Multiple users can edit the same document simultaneously.

☁️ Cloud Storage – All documents are safely stored in AWS S3.

👤 User Authentication – Secure login and signup using JWT.

🔒 Logout Functionality – Users can securely log out of their account.

📂 Dashboard – View and manage all your documents in one place.

🛠 Tech Stack

Frontend: React.js, Axios, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Cloud Storage: AWS S3

Authentication: JWT + Cookies

📂 Project Structure
CLOUD DOC EDITOR/
│
├── backend/
│   ├── config/          # DB & AWS config
│   ├── models/          # Mongoose models (User, Document)
│   ├── routes/          # API routes
│   ├── server.js        # Express server
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Editor, Auth UI
│   │   ├── pages/       # Login, Signup, Dashboard
│   │   ├── App.js       
│
└── README.md

🔑 Authentication & Logout

Users can sign up and log in.

Session is managed with JWT tokens stored in cookies.

A dedicated Logout API allows users to securely end their session.

▶️ Running the Project
1. Clone the repository
git clone https://github.com/your-username/syncscribe.git
cd syncscribe

2. Setup Backend
cd backend
npm install
npm run dev

3. Setup Frontend
cd frontend
npm install
npm start

4. Environment Variables

Create .env in backend/ with:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_KEY=your_aws_secret
AWS_REGION=your_region
S3_BUCKET_NAME=your_bucket

📝 Future Improvements

Rich text formatting (bold, italic, underline).

Role-based permissions.

Version history of documents.

Live chat while editing.

Author
Riya Chaturvedi