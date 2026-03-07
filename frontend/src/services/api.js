


const API_BASE = 'http://localhost:4000/sciask_api';


export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE}/login.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const text = await response.text();
    
    if (!text || text.trim() === '') {
      console.error('Empty response from server');
      return { success: false, message: 'السيرفر رد بجواب فارغ. تأكد من تشغيل XAMPP' };
    }
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Invalid JSON:', text);
      return { success: false, message: 'خطأ في بيانات السيرفر: ' + text.substring(0, 100) };
    }
    
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: 'فشل في الاتصال: ' + error.message };
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE}/register.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    const text = await response.text();
    
    if (!text || text.trim() === '') {
      return { success: false, message: 'السيرفر رد بجواب فارغ' };
    }
    
    try {
      return JSON.parse(text);
    } catch (e) {
      return { success: false, message: 'خطأ في بيانات السيرفر' };
    }
  } catch (error) {
    console.error("Register error:", error);
    return { success: false, message: 'فشل في الاتصال: ' + error.message };
  }
};

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${API_BASE}/get_users.php`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const deleteUserById = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/delete_user.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false };
    }
};

export const updateUserRole = async (userId, role) => {
    try {
        const response = await fetch(`${API_BASE}/update_role.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, role: role })
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating user role:", error);
        return { success: false };
    }
};

export const getLectures = async () => {
    try {
        const response = await fetch(`${API_BASE}/get_lectures.php`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching lectures:", error);
        return [];
    }
};

export const addNewLecture = async (lectureData) => {
    try {
        const response = await fetch(`${API_BASE}/add_lecture.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lectureData)
        });
        return await response.json();
    } catch (error) {
        console.error("Error adding lecture:", error);
        return null;
    }
};

export const getUserProgress = async (email) => {
    try {
        const response = await fetch(`${API_BASE}/get_progress.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });
        const data = await response.json();
        return Array.isArray(data) ? data : []; 
    } catch (error) {
        console.error("Error fetching progress:", error);
        return [];
    }
};

export const markLectureComplete = async (email, lectureId) => {
    try {
        const response = await fetch(`${API_BASE}/mark_complete.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, lecture_id: lectureId })
        });
        const result = await response.json();
        if (result.success) {
            return await getUserProgress(email);
        } else {
            throw new Error(result.message || 'Failed to mark complete');
        }
    } catch (error) {
        console.error("Error marking lecture complete:", error);
        throw error;
    }
};

export const deleteLectureById = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/delete_lecture.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting lecture:", error);
        return { success: false };
    }
};

export const getVolunteers = async () => {
    try {
        const response = await fetch(`${API_BASE}/get_volunteers.php`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        return [];
    }
};

export const submitVolunteerApplication = async (volunteerData) => {
    try {
        const response = await fetch(`${API_BASE}/submit_volunteer.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(volunteerData)
        });
        
        if (!response.ok) {
            return { success: false, message: 'خطأ في السيرفر: ' + response.status };
        }
        
        const text = await response.text();
        if (!text || text.trim() === '') {
            return { success: false, message: 'السيرفر رد بجواب فارغ' };
        }
        
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error('JSON parse error:', text);
            return { success: false, message: 'خطأ في قراءة البيانات' };
        }
    } catch (error) {
        console.error("Error submitting volunteer application:", error);
        return { success: false, message: 'فشل في الإرسال: ' + error.message };
    }
};

export const updateUserPoints = async (email, points) => {
    try {
        const response = await fetch(`${API_BASE}/update_points.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, points: points })
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating points:", error);
        return { success: false };
    }
};

export const deleteVolunteerById = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/delete_volunteer.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting volunteer:", error);
        return { success: false };
    }
};

export const getExams = async () => {
    try {
        const response = await fetch(`${API_BASE}/get_exams.php`);
        const text = await response.text();
        try {
            const data = JSON.parse(text);
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.error('getExams JSON parse error:', e, 'Response:', text);
            return [];
        }
    } catch (error) {
        console.error("Error fetching exams:", error);
        return [];
    }
};

export const addExam = async (examData) => {
    try {
        const response = await fetch(`${API_BASE}/add_exam.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(examData)
        });
        
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            return response.ok ? { success: true, raw: text } : { success: false, message: `HTTP ${response.status}: ${text}` };
        }
    } catch (error) {
        console.error("Error adding exam:", error);
        return { success: false, message: error.message };
    }
};

export const deleteExam = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/delete_exam.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting exam:", error);
        return { success: false };
    }
};

export const getQuestions = async (examId) => {
    try {
        const response = await fetch(`${API_BASE}/get_questions.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ exam_id: examId })
        });
        const text = await response.text();
        try {
            const data = JSON.parse(text);
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.error('getQuestions non-JSON response:', text);
            return [];
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
    }
};

export const addQuestion = async (questionData) => {
    try {
        const response = await fetch(`${API_BASE}/add_question.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(questionData)
        });
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            return response.ok ? { success: true, raw: text } : { success: false, message: `HTTP ${response.status}: ${text}` };
        }
    } catch (error) {
        console.error("Error adding question:", error);
        return { success: false };
    }
};

export const deleteQuestion = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/delete_question.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting question:", error);
        return { success: false };
    }
};

export const submitExam = async (examData) => {
    try {
        const response = await fetch(`${API_BASE}/submit_exam.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(examData)
        });
        return await response.json();
    } catch (error) {
        console.error("Error submitting exam:", error);
        return { success: false };
    }
};

export const getNews = async () => {
    try {
        const response = await fetch(`${API_BASE}/get_news.php`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};

export const addNews = async (newsData) => {
    try {
        const user = JSON.parse(localStorage.getItem('sciask_user'));
        if (!user || user.role !== 'admin') {
            return { success: false, message: 'غير مصرح لك بهذا الإجراء' };
        }
        const response = await fetch(`${API_BASE}/add_news.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newsData, user_id: user.id })
        });
        return await response.json();
    } catch (error) {
        console.error("Error adding news:", error);
        return { success: false };
    }
};

export const deleteNews = async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem('sciask_user'));
        if (!user || user.role !== 'admin') {
            return { success: false, message: 'غير مصرح لك بهذا الإجراء' };
        }
        const response = await fetch(`${API_BASE}/delete_news.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, user_id: user.id })
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting news:", error);
        return { success: false };
    }
};

