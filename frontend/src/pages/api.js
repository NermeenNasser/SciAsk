const API_URL = 'http://localhost:4000';

// ==========================================
// 1. المستخدمين والمصادقة (Users & Auth)
// ==========================================
export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/sciask_api/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return await res.json();
};

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/sciask_api/register.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return await res.json();
};

export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/sciask_api/get_users.php`);
  return await res.json();
};

export const deleteUserById = async (id) => {
  const res = await fetch(`${API_URL}/sciask_api/delete_user.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};

export const updateUserPoints = async (email, points) => {
  const res = await fetch(`${API_URL}/sciask_api/update_points.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, points }),
  });
  return await res.json();
};

export const updateUserRole = async (user_id, role) => {
  const res = await fetch(`${API_URL}/sciask_api/update_role.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, role }),
  });
  return await res.json();
};

// ==========================================
// 2. المحاضرات والتقدم (Lectures & Progress)
// ==========================================
export const getLectures = async () => {
  const res = await fetch(`${API_URL}/sciask_api/get_lectures.php`);
  return await res.json();
};

export const addNewLecture = async (lectureData) => {
  const res = await fetch(`${API_URL}/sciask_api/add_lecture.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lectureData),
  });
  return await res.json();
};

export const deleteLectureById = async (id) => {
  const res = await fetch(`${API_URL}/sciask_api/delete_lecture.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};

export const getUserProgress = async (email) => {
  const res = await fetch(`${API_URL}/sciask_api/get_progress.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return await res.json();
};

export const markLectureComplete = async (email, lecture_id) => {
  const res = await fetch(`${API_URL}/sciask_api/mark_complete.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, lecture_id }),
  });
  return await res.json();
};

// ==========================================
// 3. التطوع (Volunteers)
// ==========================================
export const getVolunteers = async () => {
  const res = await fetch(`${API_URL}/sciask_api/get_volunteers.php`);
  return await res.json();
};

export const submitVolunteerApplication = async (volunteerData) => {
  const res = await fetch(`${API_URL}/sciask_api/submit_volunteer.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(volunteerData),
  });
  return await res.json();
};

export const deleteVolunteerById = async (id) => {
  const res = await fetch(`${API_URL}/sciask_api/delete_volunteer.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};

// ==========================================
// 4. الأخبار (News)
// ==========================================
export const getNews = async () => {
  const res = await fetch(`${API_URL}/sciask_api/get_news.php`);
  return await res.json();
};

export const addNews = async (newsData) => {
  const res = await fetch(`${API_URL}/sciask_api/add_news.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newsData),
  });
  return await res.json();
};

export const deleteNews = async (id) => {
  const res = await fetch(`${API_URL}/sciask_api/delete_news.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};

// ==========================================
// 5. الامتحانات والأسئلة (Exams & Questions)
// ==========================================
export const getExams = async () => {
  const res = await fetch(`${API_URL}/sciask_api/get_exams.php`);
  return await res.json();
};

export const addExam = async (examData) => {
  const res = await fetch(`${API_URL}/sciask_api/add_exam.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(examData),
  });
  return await res.json();
};

export const deleteExam = async (id) => {
  const res = await fetch(`${API_URL}/sciask_api/delete_exam.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};

export const getQuestions = async (exam_id) => {
  const res = await fetch(`${API_URL}/sciask_api/get_questions.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ exam_id }),
  });
  return await res.json();
};

export const addQuestion = async (questionData) => {
  const res = await fetch(`${API_URL}/sciask_api/add_question.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionData),
  });
  return await res.json();
};

export const deleteQuestion = async (id) => {
  const res = await fetch(`${API_URL}/sciask_api/delete_question.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};

export const submitExam = async (exam_id, user_email, answers) => {
  const res = await fetch(`${API_URL}/sciask_api/submit_exam.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ exam_id, user_email, answers }),
  });
  return await res.json();
};
