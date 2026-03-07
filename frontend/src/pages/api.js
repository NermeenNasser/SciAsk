const API_URL = import.meta.env.VITE_API_URL || 'https://nermeennasser-backend-api.hf.space';

// ---  المستخدمين (Users) ---
export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/sciask_api/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('فشل تسجيل الدخول');
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

// ---  المحاضرات (Lectures) ---
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

// ---  التطوع (Volunteers) ---
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

// ---  الأخبار (News) ---
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

// ---  الامتحانات والتقدم (Exams & Progress) ---
export const getExams = async () => {
  const res = await fetch(`${API_URL}/sciask_api/get_exams.php`);
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
