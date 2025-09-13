# 🚀 HustleHub – Job Search Organizer

HustleHub is a full-stack web application that helps job seekers **organize and track their job applications, contacts, and interviews** in one place.  
It’s designed to make the job hunt less overwhelming with **clear dashboards, structured tracking, and simple workflows**.

---

## ✨ Features

- 📂 **Application Tracking**  
  Keep tabs on every application with role, company, status, and notes.

- 👤 **Contact Management**  
  Store recruiter and hiring manager details to stay on top of networking.

- 📊 **Analytics Dashboard**  
  Visualize your progress with charts (applications by status, company, timeline).

- 🔒 **Secure Authentication**  
  Role-based access and protected routes with JWT.

- 💬 **Optional AI Copilot (early prototype)**  
  Simple chatbot powered by a language model that helps with resume bullets and interview prep.  
  *This is currently a lightweight LLM integration and not a full agent.*

---

## 🏗️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS for styling
- Recharts for data visualization

**Backend**
- Node.js + Express.js
- RESTful API design
- JWT authentication

**Database**
- MongoDB (Mongoose ODM)

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB installed locally or a MongoDB Atlas cluster
- (Optional) OpenAI API Key if you want to test the Copilot

### Clone & Install
```bash
git clone https://github.com/yourusername/hustlehub.git
cd hustlehub

## 📚 Project Structure
HustleHub/
  ├── server/
  │   ├── controllers/       # request handlers
  │   ├── routes/            # API routes
  │   ├── models/            # Mongoose schemas
  │   ├── services/          # utility + copilot integration
  │   ├── config
  │   ├── middleware
  │   ├── utils
  │   └── server.js          # Express app entry
  ├── client/
  │   ├── src/components/    # React components (Dashboard, Copilot, etc.)
  │   ├── src/assets/         
  │   ├── src/pages/         # Login, Register, Dashboard pages
  │   └── src/App.jsx
  └── README.md