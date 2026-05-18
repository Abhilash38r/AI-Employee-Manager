require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Root landing page
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>AI Employee Manager API</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: #0f0f1a;
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      overflow-x: hidden;
    }
    .bg-glow {
      position: fixed; top: -150px; left: 50%; transform: translateX(-50%);
      width: 700px; height: 400px;
      background: radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%);
      pointer-events: none;
      animation: pulse 4s ease-in-out infinite;
    }
    @keyframes pulse { 0%,100%{opacity:.6;transform:translateX(-50%) scale(1)} 50%{opacity:1;transform:translateX(-50%) scale(1.1)} }
    .container { max-width: 860px; width: 100%; position: relative; z-index: 1; }
    .badge {
      display: inline-flex; align-items: center; gap: .5rem;
      background: rgba(99,102,241,.15); border: 1px solid rgba(99,102,241,.35);
      color: #a5b4fc; padding: .35rem .9rem; border-radius: 999px;
      font-size: .78rem; font-weight: 600; letter-spacing: .05em;
      margin-bottom: 1.5rem; text-transform: uppercase;
      animation: fadeDown .6s ease both;
    }
    @keyframes fadeDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
    h1 {
      font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 700; line-height: 1.15;
      background: linear-gradient(135deg, #a5b4fc 0%, #818cf8 40%, #c084fc 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      animation: fadeDown .7s .1s ease both;
    }
    .subtitle {
      margin-top: .9rem; color: #94a3b8; font-size: 1.05rem; line-height: 1.7;
      animation: fadeDown .7s .2s ease both;
    }
    .status-bar {
      display: flex; align-items: center; gap: .6rem;
      margin: 1.8rem 0; animation: fadeDown .7s .3s ease both;
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e; animation: blink 1.5s infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
    .status-text { color: #22c55e; font-weight: 600; font-size: .95rem; }
    .grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1rem; margin-top: 2rem; animation: fadeDown .7s .4s ease both;
    }
    .card {
      background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
      border-radius: 16px; padding: 1.4rem 1.6rem;
      transition: border-color .25s, transform .25s, box-shadow .25s;
      cursor: default;
    }
    .card:hover { border-color: rgba(99,102,241,.5); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(99,102,241,.15); }
    .card-header { display: flex; align-items: center; gap: .7rem; margin-bottom: 1rem; }
    .method {
      font-size: .7rem; font-weight: 700; padding: .2rem .55rem;
      border-radius: 6px; letter-spacing: .06em;
    }
    .post { background: rgba(34,197,94,.15); color: #4ade80; }
    .get  { background: rgba(59,130,246,.15); color: #60a5fa; }
    .put  { background: rgba(234,179,8,.15);  color: #fbbf24; }
    .del  { background: rgba(239,68,68,.15);  color: #f87171; }
    .endpoint { font-size: .88rem; font-family: 'Courier New', monospace; color: #c4b5fd; }
    .desc { color: #94a3b8; font-size: .84rem; line-height: 1.5; }
    .section-title {
      font-size: .75rem; font-weight: 700; letter-spacing: .1em;
      text-transform: uppercase; color: #6366f1; margin: 2rem 0 .8rem;
      animation: fadeDown .7s .35s ease both;
    }
    footer {
      margin-top: 3rem; text-align: center; color: #475569; font-size: .82rem;
      animation: fadeDown .7s .5s ease both;
    }
    footer span { color: #6366f1; }
  </style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="container">
    <div class="badge">⚡ REST API</div>
    <h1>AI Employee Manager</h1>
    <p class="subtitle">A powerful MERN-stack backend with JWT authentication, MongoDB Atlas, and AI-powered employee insights via OpenRouter.</p>

    <div class="status-bar">
      <div class="dot"></div>
      <span class="status-text">Server is Live &amp; Running</span>
    </div>

    <div class="section-title">🔐 Auth Endpoints</div>
    <div class="grid">
      <div class="card">
        <div class="card-header">
          <span class="method post">POST</span>
          <span class="endpoint">/api/auth/register</span>
        </div>
        <p class="desc">Register a new user with name, email and password.</p>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="method post">POST</span>
          <span class="endpoint">/api/auth/login</span>
        </div>
        <p class="desc">Login and receive a JWT token for protected routes.</p>
      </div>
    </div>

    <div class="section-title">👥 Employee Endpoints</div>
    <div class="grid">
      <div class="card">
        <div class="card-header">
          <span class="method get">GET</span>
          <span class="endpoint">/api/employees</span>
        </div>
        <p class="desc">Fetch all employees. Requires Bearer token.</p>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="method post">POST</span>
          <span class="endpoint">/api/employees</span>
        </div>
        <p class="desc">Add a new employee record. Requires Bearer token.</p>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="method put">PUT</span>
          <span class="endpoint">/api/employees/:id</span>
        </div>
        <p class="desc">Update an existing employee by ID.</p>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="method del">DEL</span>
          <span class="endpoint">/api/employees/:id</span>
        </div>
        <p class="desc">Delete an employee record by ID.</p>
      </div>
    </div>

    <div class="section-title">🤖 AI Endpoints</div>
    <div class="grid">
      <div class="card">
        <div class="card-header">
          <span class="method post">POST</span>
          <span class="endpoint">/api/ai/recommend</span>
        </div>
        <p class="desc">Get AI-powered performance insights for all employees using OpenRouter.</p>
      </div>
    </div>

    <footer>Built with ❤️ using <span>Node.js · Express · MongoDB · JWT</span></footer>
  </div>
</body>
</html>`);
});


// Error handling middleware for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
