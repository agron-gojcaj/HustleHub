# HustleHub

HustleHub is a job-search organizer for tracking applications, interview
progress, and the people you meet during your search. It is a full-stack
JavaScript app: a React frontend calls an Express API, which stores user and job
search data in MongoDB.

## What you can do

- Create an account, sign in, and update your profile or password.
- Add job applications and track their company, position, and status
  (`Applied`, `Interviewing`, `Offer`, or `Rejected`).
- Filter and sort applications, edit their details/status, or delete them.
- Open an application’s **Details** to add and manage related contacts and
  interviews. Application details can also include a job link, notes, and
  applied date when provided through the API.
- View application counts by status and a chart of applications by month.
- Open the optional AI Copilot to ask general job-search, application, or
  interview-preparation questions.

The Copilot is a lightweight chat integration, not an autonomous agent. It
doesn't read or update your application records. Contacts and interviews are
managed from an application’s **Details** view.

## How it works

The frontend is a Vite/React single-page app. It sends JSON requests to the
Express server at `http://localhost:5000`; the server uses Mongoose to read and
write MongoDB documents. Registration and login return a JWT. The browser keeps
that token in local storage and sends it as a Bearer token for protected profile
and job-search requests. Each account's applications, contacts, and interviews
are associated with that user.

The API is mounted under `/api`:

| Area | Routes |
| --- | --- |
| Authentication and profile | `/api/auth` |
| Applications | `/api/applications` |
| Contacts | `/api/contacts` |
| Interviews | `/api/interviews` |
| AI Copilot | `/api/ai/agent` |

## Requirements

- Node.js 18 or newer and npm
- A MongoDB Atlas cluster or a local MongoDB server
- (Optional) Ollama for a free, local AI Copilot, or an OpenAI API key

## Run locally

### 1. Get the code and install dependencies

From the repository root, install each app's dependencies:

```bash
cd server
npm ci
cd ../client
npm ci
```

### 2. Configure the server

Copy `server/.env.example` to `server/.env`. Fill in the required settings:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/hustlehub?retryWrites=true&w=majority
JWT_SECRET=<a-long-random-secret>
```

For `MONGO_URI`, replace the placeholders with your MongoDB database user's
credentials and Atlas cluster host. The `/hustlehub` path selects the database;
for a local MongoDB instance, you can instead use
`mongodb://127.0.0.1:27017/hustlehub`. In Atlas, create a database user and
allow your development IP address in Network Access. URL-encode special
characters in the database user's password.

Generate a signing secret locally with Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Put the generated value in `JWT_SECRET`. Keep `server/.env` private; it is
ignored by Git and must not be committed. Changing this secret invalidates
existing login tokens, so users will need to sign in again.

### 3. Start the server and frontend

Open two terminals from the repository root.

In the first terminal:

```bash
cd server
npm run dev
```

In the second terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite (normally
`http://localhost:5173`). The API listens on port `5000` by default. The
frontend currently uses this local API address directly, so both processes
should run on the same computer.

Register from the app to create your first account, then use the dashboard to
add applications. Use **Details** on an application to manage its contacts and
interviews. Use the sidebar to view analytics, edit your profile, or log out.

## Optional AI Copilot

The server and the rest of the app work without configuring an AI provider.
Without one, Copilot requests return a configuration error.

### Free local provider with Ollama

Install [Ollama](https://ollama.com), start it, and download a model:

```bash
ollama pull llama3.2
```

Set these values in `server/.env`:

```env
OPENAI_BASE_URL=http://localhost:11434/v1
AI_MODEL=llama3.2
```

Restart the server after changing `.env`. If you use an OpenAI-compatible local
server other than Ollama, set `OPENAI_BASE_URL` to that server's compatible API
URL and `AI_MODEL` to a model it provides.

### OpenAI API

To use OpenAI instead, set `OPENAI_API_KEY` in `server/.env`, remove or comment
out `OPENAI_BASE_URL`, and optionally set `AI_MODEL` (defaults to
`gpt-4o-mini`). API usage may incur charges. Never put provider keys in the
frontend or commit them to Git.

## Useful commands

Run these from the corresponding directory:

| Directory | Command | Purpose |
| --- | --- | --- |
| `server` | `npm run dev` | Start the API with automatic restarts |
| `server` | `npm start` | Start the API |
| `client` | `npm run dev` | Start the Vite development server |
| `client` | `npm run build` | Build the frontend for production |
| `client` | `npm run lint` | Run ESLint |

## Project layout

```text
HustleHub/
├── client/
│   └── src/
│       ├── components/   # Dashboard, application, contact, and interview UI
│       └── pages/        # Login, registration, dashboard, analytics, profile
└── server/
    ├── config/           # MongoDB connection
    ├── controllers/      # API request handlers
    ├── middleware/       # Authentication and error handling
    ├── models/           # Mongoose schemas
    ├── routes/           # Express API routes
    ├── services/         # AI Copilot integration
    └── server.js         # API entry point
```

## Troubleshooting

- **`MONGO_URI is not set`**: check that `server/.env` exists and contains a
  non-empty `MONGO_URI`.
- **MongoDB connection fails**: verify the Atlas host, database username and
  password, URL-encode special password characters, and allow your IP in Atlas
  Network Access.
- **`JWT_SECRET is not set`**: add a random `JWT_SECRET` to `server/.env` and
  restart the server.
- **Copilot configuration error**: configure Ollama or an OpenAI API key as
  described above. Restart the server after editing `.env`.
- **Login or API calls fail**: confirm MongoDB and the server are running, then
  check the browser's Network panel and the server terminal for the request
  error.
