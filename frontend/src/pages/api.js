
// Initialize localStorage with dummy data if empty
const initDummyData = () => {
  if (!localStorage.getItem('sciask_users_db')) {
    const dummy_users = [
      { id: 1, name: "Nermeen Nasser", email: "nermeen@example.com", track: "URE", points: 150, role: "Student" },
      { id: 2, name: "Ahmed Ali", email: "ahmed@test.com", track: "URI", points: 50, role: "Student" },
      { id: 3, name: "Admin User", email: "admin@sciask.com", track: "-", points: 0, role: "Admin" },
    ];
    localStorage.setItem('sciask_users_db', JSON.stringify(dummy_users));
  }
};

// ✅ Removed setTimeout delays for faster performance
export const getAllUsers = async () => {
  initDummyData();
  const users = JSON.parse(localStorage.getItem('sciask_users_db')) || [];
  return Promise.resolve(users);
};

export const getUserById = async (id) => {
  initDummyData();
  const users = JSON.parse(localStorage.getItem('sciask_users_db')) || [];
  return Promise.resolve(users.find(u => u.id === id));
};

export const deleteUserById = async (id) => {
  const users = JSON.parse(localStorage.getItem('sciask_users_db')) || [];
  const filteredUsers = users.filter(user => user.id !== id);
  localStorage.setItem('sciask_users_db', JSON.stringify(filteredUsers));
  return Promise.resolve({ success: true, message: "User deleted" });
};

export const updateUserPoints = async (id, points) => {
  const users = JSON.parse(localStorage.getItem('sciask_users_db')) || [];
  const updatedUsers = users.map(u => u.id === id ? { ...u, points } : u);
  localStorage.setItem('sciask_users_db', JSON.stringify(updatedUsers));
  return Promise.resolve({ success: true, message: "Points updated" });
};

export const getLectures = async () => {
  const lectures = JSON.parse(localStorage.getItem('sciask_lectures_db')) || [];
  return Promise.resolve(lectures);
};

export const addNewLecture = async (lectureData) => {
  const lectures = JSON.parse(localStorage.getItem('sciask_lectures_db')) || [];
  const newLec = { id: Date.now(), ...lectureData, date: new Date().toLocaleDateString('ar-EG') };
  const updatedLectures = [...lectures, newLec];
  localStorage.setItem('sciask_lectures_db', JSON.stringify(updatedLectures));
  return Promise.resolve(newLec);
};

export const deleteLectureById = async (id) => {
  const lectures = JSON.parse(localStorage.getItem('sciask_lectures_db')) || [];
  const filtered = lectures.filter(l => l.id !== id);
  localStorage.setItem('sciask_lectures_db', JSON.stringify(filtered));
  return Promise.resolve({ success: true });
};

export const getExams = async () => {
  const exams = JSON.parse(localStorage.getItem('sciask_exams_db')) || [];
  return Promise.resolve(exams);
};

export const addExam = async (examData) => {
  const exams = JSON.parse(localStorage.getItem('sciask_exams_db')) || [];
  const newExam = { id: Date.now(), ...examData, created_at: new Date().toLocaleDateString('ar-EG') };
  exams.push(newExam);
  localStorage.setItem('sciask_exams_db', JSON.stringify(exams));
  return Promise.resolve(newExam);
};

export const deleteExam = async (id) => {
  const exams = JSON.parse(localStorage.getItem('sciask_exams_db')) || [];
  const filtered = exams.filter(e => e.id !== id);
  localStorage.setItem('sciask_exams_db', JSON.stringify(filtered));
  return Promise.resolve({ success: true });
};

export const getQuestions = async (examId) => {
  const questions = JSON.parse(localStorage.getItem('sciask_questions_db')) || [];
  return Promise.resolve(questions.filter(q => q.exam_id === examId));
};

export const addQuestion = async (questionData) => {
  const questions = JSON.parse(localStorage.getItem('sciask_questions_db')) || [];
  const newQuestion = { id: Date.now(), ...questionData };
  questions.push(newQuestion);
  localStorage.setItem('sciask_questions_db', JSON.stringify(questions));
  return Promise.resolve(newQuestion);
};

export const deleteQuestion = async (id) => {
  const questions = JSON.parse(localStorage.getItem('sciask_questions_db')) || [];
  const filtered = questions.filter(q => q.id !== id);
  localStorage.setItem('sciask_questions_db', JSON.stringify(filtered));
  return Promise.resolve({ success: true });
};

export const submitExam = async (examId, answers) => {
  const attempts = JSON.parse(localStorage.getItem('sciask_exam_attempts_db')) || [];
  const newAttempt = { id: Date.now(), exam_id: examId, answers, score: 0, submitted_at: new Date().toLocaleDateString('ar-EG') };
  attempts.push(newAttempt);
  localStorage.setItem('sciask_exam_attempts_db', JSON.stringify(attempts));
  return Promise.resolve({ success: true, message: "Exam submitted successfully" });
};

export const getNews = async () => {
  const news = JSON.parse(localStorage.getItem('sciask_news_db')) || [];
  return Promise.resolve(news);
};

export const addNews = async (newsData) => {
  const news = JSON.parse(localStorage.getItem('sciask_news_db')) || [];
  const newNews = { id: Date.now(), ...newsData, created_at: new Date().toLocaleDateString('ar-EG') };
  news.push(newNews);
  localStorage.setItem('sciask_news_db', JSON.stringify(news));
  return Promise.resolve(newNews);
};

export const deleteNews = async (id) => {
  const news = JSON.parse(localStorage.getItem('sciask_news_db')) || [];
  const filtered = news.filter(n => n.id !== id);
  localStorage.setItem('sciask_news_db', JSON.stringify(filtered));
  return Promise.resolve({ success: true });
};

export const getVolunteers = async () => {
  const volunteers = JSON.parse(localStorage.getItem('sciask_volunteers_db')) || [];
  return Promise.resolve(volunteers);
};

export const submitVolunteerApplication = async (volunteerData) => {
  const volunteers = JSON.parse(localStorage.getItem('sciask_volunteers_db')) || [];
  const newVolunteer = { id: Date.now(), ...volunteerData, submitted_at: new Date().toLocaleDateString('ar-EG') };
  volunteers.push(newVolunteer);
  localStorage.setItem('sciask_volunteers_db', JSON.stringify(volunteers));
  return Promise.resolve({ success: true, message: "Application submitted" });
};

export const deleteVolunteerById = async (id) => {
  const volunteers = JSON.parse(localStorage.getItem('sciask_volunteers_db')) || [];
  const filtered = volunteers.filter(v => v.id !== id);
  localStorage.setItem('sciask_volunteers_db', JSON.stringify(filtered));
  return Promise.resolve({ success: true });
};

export const getUserProgress = async (email) => {
  const progress = JSON.parse(localStorage.getItem('sciask_progress_db')) || [];
  return Promise.resolve(progress.filter(p => p.user_email === email));
};

export const markLectureComplete = async (userEmail, lectureId) => {
  const progress = JSON.parse(localStorage.getItem('sciask_progress_db')) || [];
  const exists = progress.find(p => p.user_email === userEmail && p.lecture_id === lectureId);
  
  if (!exists) {
    progress.push({ id: Date.now(), user_email: userEmail, lecture_id: lectureId, completed: true, completed_at: new Date().toLocaleDateString('ar-EG') });
    localStorage.setItem('sciask_progress_db', JSON.stringify(progress));
  }
  
  return Promise.resolve({ success: true, message: "Lecture marked as complete" });
};
