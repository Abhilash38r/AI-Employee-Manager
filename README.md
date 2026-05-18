# AI Driven Employee Management System

This is a complete MERN stack project developed for the AI308B examination.

## 📂 Folder Structure
```text
fsdend/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   └── employeeController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Employee.js
│   │   └── User.js
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   └── employeeRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── AddEmployee.jsx
    │   │   ├── AIRecommendations.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── package.json
```

## 🛠️ Installation Commands
1. **Clone/Download the repository**
2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm start
   ```
3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔑 Environment Variables (`.env` example)
Place this in the `backend/.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-driven-employee-management
JWT_SECRET=super_secret_jwt_key_308b
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## 🧪 API Testing Examples (Postman/Thunder Client)

### 1. Register User (POST `/api/auth/register`)
- **Body (JSON):**
  ```json
  {
    "name": "Admin",
    "email": "admin@test.com",
    "password": "password123"
  }
  ```

### 2. Login User (POST `/api/auth/login`)
- **Body (JSON):**
  ```json
  {
    "email": "admin@test.com",
    "password": "password123"
  }
  ```
- *Copy the returned token to use in the Authorization header (Bearer Token) for the following requests.*

### 3. Add Employee (POST `/api/employees`)
- **Headers:** `Authorization: Bearer <your_token>`
- **Body (JSON):**
  ```json
  {
    "name": "Aman Verma",
    "email": "aman@gmail.com",
    "department": "Development",
    "skills": ["React", "Node.js", "MongoDB"],
    "performanceScore": 85,
    "experience": 3
  }
  ```

### 4. Search Employee (GET `/api/employees/search?department=Development`)
- **Headers:** `Authorization: Bearer <your_token>`

### 5. AI Recommendation (POST `/api/ai/recommend`)
- **Headers:** `Authorization: Bearer <your_token>`
- *No body required. Analyzes the employees in the database.*

## 🚀 Deployment Steps on Render

### Backend Deployment
1. Go to [Render](https://render.com/) and click **New > Web Service**.
2. Connect your GitHub repository.
3. Set the Root Directory to `backend`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Under **Environment Variables**, add:
   - `PORT`: 10000 (Render default)
   - `MONGO_URI`: Your MongoDB Atlas URI.
   - `JWT_SECRET`: A secure random string.
   - `OPENROUTER_API_KEY`: Your OpenRouter API Key.
7. Click **Create Web Service**.

### Frontend Deployment
1. Go to [Render](https://render.com/) and click **New > Static Site**.
2. Connect your GitHub repository.
3. Set the Root Directory to `frontend`.
4. Build Command: `npm run build`
5. Publish directory: `dist`
6. Note: Before building, ensure you change `baseURL` in `frontend/src/api/axios.js` to your deployed Render Backend URL.
7. Click **Create Static Site**.
8. For React Router to work correctly on Render Static Site, set a Rewrite rule in Render: 
   - Source: `/*` 
   - Destination: `/index.html` 
   - Action: Rewrite

## 📚 Final Notes for PDF Submission
Include this codebase, screenshot of Postman requests, MongoDB collections showing stored data, and the final Render URLs in your PDF report. The components are thoroughly commented, use `async/await`, follow MVC in the backend, and feature protected routes.
