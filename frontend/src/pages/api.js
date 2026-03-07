const API_URL = import.meta.env.VITE_API_URL || 'https://nermeennasser-backend-api.hf.space';

// ---  المستخدمين (Users) ---
export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('فشل تسجيل الدخول');
  return await res.json();
};

export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/api/users`);
  return await res.json();
};

export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/api/users/${id}`);
  return await res.json();
};

export const deleteUserById = async (id) => {
  const res = await fetch(`${API_URL}/api/users/${id}`, { method: 'DELETE' });
  return await res.json();
};

export const updateUserPoints = async (id, points) => {
  const res = await fetch(`${API_URL}/api/users/${id}/points`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ points }),
  });
  return await res.json();
};

// ---  المحاضرات (Lectures) ---
export const getLectures = async () => {
  const res = await fetch(`${API_URL}/api/lectures`);
  return await res.json();
};

export const addNewLecture = async (lectureData) => {
  const res = await fetch(`${API_URL}/api/lectures`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lectureData),
  });
  return await res.json();
};

export const deleteLectureById = async (id) => {
  const res = await fetch(`${API_URL}/api/lectures/${id}`, { method: 'DELETE' });
  return await res.json();
};

// ---  الامتحانات (Exams & Questions) ---
export const getExams = async () => {
  const res = await fetch(`${API_URL}/api/exams`);
  return await res.json();
};

export const addExam = async (examData) => {
  const res = await fetch(`${API_URL}/api/exams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(examData),
  });
  return await res.json();
};

export const deleteExam = async (id) => {
  const res = await fetch(`${API_URL}/api/exams/${id}`, { method: 'DELETE' });
  return await res.json();
};

export const getQuestions = async (examId) => {
  const res = await fetch(`${API_URL}/api/exams/${examId}/questions`);
  return await res.json();
};

export const addQuestion = async (questionData) => {
  const res = await fetch(`${API_URL}/api/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionData),
  });
  return await res.json();
};

export const submitExam = async (examId, answers) => {
  const res = await fetch(`${API_URL}/api/exams/${examId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
  return await res.json();
};

// ---  الأخبار (News) ---
export const getNews = async () => {
  const res = await fetch(`${API_URL}/api/news`);
  return await res.json();
};

export const addNews = async (newsData) => {
  const res = await fetch(`${API_URL}/api/news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newsData),
  });
  return await res.json();
};

export const deleteNews = async (id) => {
  const res = await fetch(`${API_URL}/api/news/${id}`, { method: 'DELETE' });
  return await res.json();
};

// ---  التطوع (Volunteers) ---
export const getVolunteers = async () => {
  const res = await fetch(`${API_URL}/api/volunteers`);
  return await res.json();
};

export const submitVolunteerApplication = async (volunteerData) => {
  const res = await fetch(`${API_URL}/api/volunteers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(volunteerData),
  });
  return await res.json();
};

export const deleteVolunteerById = async (id) => {
  const res = await fetch(`${API_URL}/api/volunteers/${id}`, { method: 'DELETE' });
  return await res.json();
};

// ---  التقدم (Progress) ---
export const getUserProgress = async (email) => {
  const res = await fetch(`${API_URL}/api/progress/${email}`);
  return await res.json();
};

export const markLectureComplete = async (userEmail, lectureId) => {
  const res = await fetch(`${API_URL}/api/progress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_email: userEmail, lecture_id: lectureId }),
  });
  return await res.json();
};

