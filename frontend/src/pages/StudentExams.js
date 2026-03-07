import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExams, getQuestions, submitExam } from '../services/api';
import './Admin.css';

function StudentExams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [takingExam, setTakingExam] = useState(false);
  const [examResult, setExamResult] = useState(null);
  const [userName, setUserName] = useState("");
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');
  const [takenExams, setTakenExams] = useState(new Set());

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('sciask_user'));
    setUserName(storedUser ? storedUser.name : 'ضيف');
    loadExams();
    const handleFocus = () => {
      loadExams();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [navigate]);

  const loadExams = async () => {
    setLoading(true);
    try {
      const examsData = await getExams();
      console.log('StudentExams - Exams loaded:', examsData);
      setExams(Array.isArray(examsData) ? examsData : []);
      // In a real app, you'd check which exams the student has taken
      // For now, we'll simulate this with local storage
      const taken = JSON.parse(localStorage.getItem('taken_exams') || '[]');
      setTakenExams(new Set(taken));
    } catch (err) {
      console.error('Error loading exams:', err);
    } finally {
      setLoading(false);
    }
  };

  const startExam = async (exam) => {
    if (takenExams.has(exam.id)) {
      alert("لقد أديت هذا الامتحان من قبل!");
      return;
    }

    setCurrentExam(exam);
    setTakingExam(true);
    setAnswers({});

    try {
      const questionsData = await getQuestions(exam.id);
      setQuestions(Array.isArray(questionsData) ? questionsData : []);
    } catch (err) {
      console.error(err);
      alert("خطأ في تحميل أسئلة الامتحان");
      setTakingExam(false);
      setCurrentExam(null);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitExamAnswers = async () => {
    if (!currentExam) return;

    // Check if all questions are answered
    const unanswered = questions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      alert(`يرجى الإجابة على جميع الأسئلة. الأسئلة المتبقية: ${unanswered.length}`);
      return;
    }

    if (!window.confirm("هل أنت متأكد من تسليم الامتحان؟ لا يمكنك التعديل على إجاباتك بعد التسليم.")) {
      return;
    }

    try {
      const storedUser = JSON.parse(localStorage.getItem('sciask_user'));
      const result = await submitExam({
        exam_id: currentExam.id,
        user_email: storedUser.email,
        answers: answers
      });

      if (result.success) {
        setExamResult(result);
        // Mark exam as taken
        const newTakenExams = new Set([...takenExams, currentExam.id]);
        setTakenExams(newTakenExams);
        localStorage.setItem('taken_exams', JSON.stringify([...newTakenExams]));
        alert(`تم تسليم الامتحان بنجاح! نتيجتك: ${result.score}/${result.total_questions}`);
      } else {
        alert("فشل في تسليم الامتحان: " + (result.message || "خطأ غير معروف"));
      }
    } catch (err) {
      console.error(err);
      alert("خطأ في تسليم الامتحان");
    }
  };

  const resetExam = () => {
    setCurrentExam(null);
    setQuestions([]);
    setAnswers({});
    setTakingExam(false);
    setExamResult(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('data-lang', newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('sciask_user');
    navigate('/login');
  };

  if (loading) return <div className="text-center mt-5"><h3>⏳ جاري تحميل البيانات...</h3></div>;

  if (takingExam && currentExam) {
    return (
      <div className="container py-4" dir="rtl">
        {/* Exam Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-primary text-white rounded shadow">
          <div>
            <h2 className="mb-1">📝 {currentExam.title}</h2>
            <p className="mb-0">عدد الأسئلة: {questions.length}</p>
          </div>
          <div>
            <button onClick={toggleLanguage} className="btn btn-sm btn-outline-light me-2">
              {lang === 'ar' ? 'EN' : 'عر'}
            </button>
            <button onClick={toggleTheme} className="btn btn-sm btn-outline-light me-2">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <span className="me-3">مرحباً، {userName}</span>
            <button onClick={() => navigate('/')} className="btn btn-sm btn-light me-2">الصفحة الرئيسية</button>
            <button onClick={handleLogout} className="btn btn-sm btn-danger">خروج</button>
          </div>
        </div>

        {/* Questions */}
        <div className="row">
          <div className="col-12">
            {questions.map((question, index) => (
              <div key={question.id} className="card mb-4 shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0">السؤال {index + 1} (النقاط: {question.points})</h5>
                </div>
                <div className="card-body">
                  <p className="card-text fw-bold mb-3">{question.question_text}</p>
                  <div className="row">
                    {['a', 'b', 'c', 'd'].map(option => (
                      <div key={option} className="col-md-6 mb-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`question_${question.id}`}
                            id={`q${question.id}_${option}`}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={() => handleAnswerChange(question.id, option)}
                          />
                          <label className="form-check-label" htmlFor={`q${question.id}_${option}`}>
                            <span className="badge bg-secondary me-2">{option.toUpperCase()}</span>
                            {question[`option_${option}`]}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-success btn-lg px-5"
            onClick={submitExamAnswers}
          >
            📤 تسليم الامتحان
          </button>
        </div>
      </div>
    );
  }

  if (examResult) {
    return (
      <div className="container py-4" dir="rtl">
        {/* Result Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-success text-white rounded shadow">
          <h2 className="mb-0">🎉 نتيجة الامتحان</h2>
          <div>
            <button onClick={toggleLanguage} className="btn btn-sm btn-outline-light me-2">
              {lang === 'ar' ? 'EN' : 'عر'}
            </button>
            <button onClick={toggleTheme} className="btn btn-sm btn-outline-light me-2">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <span className="me-3">مرحباً، {userName}</span>
            <button onClick={resetExam} className="btn btn-sm btn-light me-2">العودة للامتحانات</button>
            <button onClick={handleLogout} className="btn btn-sm btn-danger">خروج</button>
          </div>
        </div>

        {/* Result Card */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-body text-center p-5">
                <h3 className="card-title mb-4">{currentExam?.title}</h3>
                <div className="row">
                  <div className="col-6">
                    <div className="p-3 bg-primary text-white rounded">
                      <h2 className="mb-1">{examResult.score}</h2>
                      <p className="mb-0">النقاط المحصلة</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 bg-info text-white rounded">
                      <h2 className="mb-1">{examResult.total_questions}</h2>
                      <p className="mb-0">إجمالي الأسئلة</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-success">
                    النسبة المئوية: {Math.round((examResult.score / examResult.total_questions) * 100)}%
                  </h4>
                  <p className="text-muted">تم إضافة النقاط إلى حسابك ✅</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4" dir="rtl">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-info text-white rounded shadow">
        <h2 className="mb-0">📚 الامتحانات المتاحة</h2>
        <div>
          <button onClick={toggleLanguage} className="btn btn-sm btn-outline-light me-2">
            {lang === 'ar' ? 'EN' : 'عر'}
          </button>
          <button onClick={toggleTheme} className="btn btn-sm btn-outline-light me-2">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <span className="me-3">مرحباً، {userName}</span>
          <button onClick={() => navigate('/')} className="btn btn-sm btn-light me-2">الصفحة الرئيسية</button>
          <button onClick={handleLogout} className="btn btn-sm btn-danger">خروج</button>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="row">
        {exams.length > 0 ? exams.map(exam => (
          <div key={exam.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{exam.title}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {exam.description || "لا يوجد وصف للامتحان"}
                </p>
                <div className="mt-auto">
                  <small className="text-muted d-block mb-2">
                    تاريخ الإنشاء: {new Date(exam.created_at).toLocaleDateString('ar-EG')}
                  </small>
                  {takenExams.has(exam.id) ? (
                    <button className="btn btn-secondary w-100" disabled>
                      ✅ تم أداء الامتحان
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => startExam(exam)}
                    >
                      🚀 ابدأ الامتحان
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-12 text-center py-5">
            <h4 className="text-muted">لا توجد امتحانات متاحة حالياً</h4>
            <p className="text-muted">تحقق مرة أخرى لاحقاً أو تواصل مع الإدارة</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentExams;
