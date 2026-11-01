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
```

### MongoDB

The server requires MongoDB. For a free hosted database, create a free cluster
in [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database),
create a database user, and allow your development IP address in Network Access.
Copy the Node.js connection string from Atlas into `server/.env` as `MONGO_URI`,
replacing the username, password, and cluster placeholders. URL-encode any
special characters in the database user's password. Alternatively, use a local
MongoDB connection string such as `mongodb://127.0.0.1:27017/hustlehub`.

The [server/.env.example](server/.env.example) file shows the required variable
and the optional AI settings. Copy it to `server/.env`, fill in `MONGO_URI`,
and replace the `JWT_SECRET` placeholder with a random secret. You can generate
one locally with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
Keep the secret private and do not commit your `.env` file. Then start the
server from the `server/` directory.

### Optional AI Copilot

The server runs without AI credentials; only the Copilot needs an AI provider.
For a free, local setup, install [Ollama](https://ollama.com), then download a
model in a terminal:

```bash
ollama pull llama3.2
```

Create `server/.env` with:

```env
OPENAI_BASE_URL=http://localhost:11434/v1
AI_MODEL=llama3.2
```

Start Ollama and then run the server with `npm run dev` from `server/`.
Alternatively, set `OPENAI_API_KEY` to use OpenAI's API; API usage may incur
charges. If neither provider is configured, the rest of the server still works
and Copilot requests return a configuration error.

## 📚 Project Structure

```HustleHub/
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
```
