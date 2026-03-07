# SciAsk Project - Backend with Node.js

## Steps to Run the Project

### 1. Start Backend Server

```bash
cd backend
npm install
node server.js
```

The backend will run on **http://localhost:4000**

### 2. Start Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will run on **http://localhost:3000**

### 3. Environment Configuration

#### Backend (.env)

Copy `backend/.env.example` to `backend/.env` and configure:

- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Environment (development/production)

#### Frontend

Copy `frontend/.env.example` to `frontend/.env` if needed for production.

### 4. How Points Work

- **Completing a lecture**: +10 points
- **Passing an exam**: +1 point per correct answer
- Points are automatically added to user accounts

### API Endpoints (available at /sciask_api/)

- POST `/login.php` - User login
- POST `/register.php` - User registration
- GET `/get_users.php` - Get all users
- POST `/delete_user.php` - Delete user
- POST `/update_role.php` - Update user role
- POST `/update_points.php` - Add points to user
- GET `/get_lectures.php` - Get all lectures
- POST `/add_lecture.php` - Add new lecture
- POST `/delete_lecture.php` - Delete lecture
- POST `/get_progress.php` - Get user progress
- POST `/mark_complete.php` - Mark lecture complete (+10 points)
- GET `/get_volunteers.php` - Get volunteers
- POST `/submit_volunteer.php` - Submit volunteer application
- POST `/delete_volunteer.php` - Delete volunteer
- GET `/get_exams.php` - Get all exams
- POST `/add_exam.php` - Add new exam
- POST `/delete_exam.php` - Delete exam
- POST `/get_questions.php` - Get exam questions
- POST `/add_question.php` - Add question
- POST `/delete_question.php` - Delete question
- POST `/submit_exam.php` - Submit exam (+points)
- GET `/get_news.php` - Get news
- POST `/add_news.php` - Add news
- POST `/delete_news.php` - Delete news
