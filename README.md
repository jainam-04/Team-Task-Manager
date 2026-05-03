# 🚀 Team Task Manager

A full-stack web application to manage projects and tasks with role-based access control. Users can create projects, assign tasks, and track progress through a clean dashboard interface.

---

## 🌐 Live Demo

* 🔗 **Frontend:** https://team-task-manager-navy-psi.vercel.app/
* 🔗 **Backend:** https://team-task-manager-production-89fa.up.railway.app/

---

## ✨ Features

### 🔐 Authentication

* User Signup & Login (JWT-based)
* Secure API access with token authentication

### 👥 Role-Based Access Control

* **Admin**

  * Create projects
  * Assign members
  * Create & manage tasks
* **Member**

  * View assigned projects
  * Update task status

### 📁 Project Management

* Create projects
* Add team members
* View all projects

### ✅ Task Management

* Create tasks with deadline
* Assign tasks to users
* Update task status (Todo / In Progress / Done)

### 📊 Dashboard

* Overview of tasks
* Status-wise breakdown
* Overdue task tracking

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Deployment

* Frontend: Vercel
* Backend: Railway

---

## 📂 Project Structure

```
Team Task Manager/
│
├── client/        # Frontend (React + Vite)
│   ├── src/
│   └── ...
│
├── server/        # Backend (Node + Express)
│   ├── routes/
│   ├── models/
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
MONGO_DB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## 🔌 API Endpoints

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`
* `GET /api/auth/users`

### Projects

* `POST /api/projects`
* `GET /api/projects`

### Tasks

* `POST /api/tasks`
* `GET /api/tasks/project/:projectId`
* `PUT /api/tasks/:id`

---

## 🧪 Usage Flow

1. Sign up / Login
2. Create a project (Admin)
3. Add members
4. Create tasks and assign users
5. Update task status
6. Track progress on dashboard

---

## 🎥 Demo

A short demo video showcasing all features is included in the submission.

---

## 📌 Future Improvements

* User search instead of dropdown
* Task comments & attachments
* Notifications system
* Drag & drop task board (Kanban)

---

## 👨‍💻 Author

* Developed by Jainam

---

## ⭐ Acknowledgements

This project was built as part of a full-stack assignment to demonstrate real-world application development skills.

---
