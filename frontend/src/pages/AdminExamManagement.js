import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExam, getExams, deleteExam, addQuestion, getQuestions, deleteQuestion } from '../services/api';
import './Admin.css';

function AdminExamManagement() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("");
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');
  const [currentView, setCurrentView] = useState(0); // 0: exams list, 1: add exam, 2: questions
  const [newExam, setNewExam] = useState({ title: '', description: '', num_questions: 1 });
  const [examQuestions, setExamQuestions] = useState([
    {
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: 'a',
      points: 1
    }
  ]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'a',
    points: 1
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('sciask_user'));
    if (!storedUser || storedUser.role !== 'admin') {
      navigate('/login');
      return;
    }
    setAdminName(storedUser.name);
    loadExams();
  }, [navigate]);

  const loadExams = async () => {
    setLoading(true);
    try {
      const examsData = await getExams();
      console.log('Exams loaded:', examsData);
      setExams(Array.isArray(examsData) ? examsData : []);
    } catch (err) {
      console.error('Error loading exams:', err);
      alert('خطأ في تحميل الامتحانات: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNumQuestionsChange = (num) => {
    const count = parseInt(num) || 1;
    const questions = [];
    for (let i = 0; i < count; i++) {
      questions.push({
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'a',
        points: 1
      });
    }
    setExamQuestions(questions);
    setNewExam({...newExam, num_questions: count});
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = examQuestions.map((q, i) => 
      i === index ? { ...q, [field]: value } : q
    );
    setExamQuestions(updatedQuestions);
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    if (!newExam.title) return alert("يرجى إدخال عنوان الامتحان!");
    if (examQuestions.length === 0) return alert("يرجى إدخال عدد الأسئلة!");

    // Validate all questions
    for (let i = 0; i < examQuestions.length; i++) {
      const q = examQuestions[i];
      if (!q.question_text || !q.option_a || !q.option_b || !q.option_c || !q.option_d) {
        return alert(`يرجى إكمال جميع بيانات السؤال رقم ${i + 1}!`);
      }
    }

    try {
      // Get admin user info
      const storedUser = JSON.parse(localStorage.getItem('sciask_user'));
      if (!storedUser) {
        alert("يرجى تسجيل الدخول أولاً!");
        return;
      }

      // First add the exam
      const examResult = await addExam({
        title: newExam.title,
        description: newExam.description,
        created_by: storedUser.email
      });
      if (!examResult.success) {
        alert("فشل في إضافة الامتحان: " + (examResult.message || "خطأ غير معروف"));
        return;
      }

      // Handle different response formats
      let examId = null;
      
      if (examResult.exam && examResult.exam.id) {
        examId = examResult.exam.id;
      } else if (examResult.id) {
        examId = examResult.id;
      } else if (examResult.raw) {
        // If we got a raw response, the exam was still created - refresh list
        console.log('Raw exam response:', examResult.raw);
        await loadExams();
        alert("تم إنشاء الامتحان بنجاح! تم تحديث القائمة.");
        setCurrentView(0);
        return;
      } else {
        console.error('Unexpected addExam response:', examResult);
        alert('الامتحان تم إنشاؤه على السيرفر، لكن الاستجابة غير متوقعة. راجع سجل السيرفر.');
        return;
      }

      // Then add all questions
      for (const question of examQuestions) {
        const questionResult = await addQuestion({ ...question, exam_id: examId });
        if (!questionResult.success) {
          alert("فشل في إضافة بعض الأسئلة، لكن الامتحان تم إنشاؤه!");
          break;
        }
      }

      setExams([{ id: examId, title: newExam.title, description: newExam.description }, ...exams]);
      setNewExam({ title: '', description: '', num_questions: 1 });
      setExamQuestions([{
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'a',
        points: 1
      }]);
      
      // Refresh the exams list from server
      await loadExams();
      
      alert("تمت إضافة الامتحان والأسئلة بنجاح! 🎉");
      setCurrentView(0);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إضافة الامتحان والأسئلة!");
    }
  };

  const handleDeleteExam = async (id) => {
    if (window.confirm("تحذير: هل أنت متأكد من حذف هذا الامتحان؟ سيتم حذف جميع الأسئلة المرتبطة به.")) {
      const result = await deleteExam(id);
      if (result.success) {
        setExams(exams.filter(exam => exam.id !== id));
        alert("تم حذف الامتحان بنجاح ✅");
      } else {
        alert("فشل الحذف: " + (result.message || "خطأ غير معروف"));
      }
    }
  };

  const loadQuestions = async (examId) => {
    try {
      const questionsData = await getQuestions(examId);
      setQuestions(Array.isArray(questionsData) ? questionsData : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.question_text || !selectedExam) return alert("البيانات ناقصة!");
    const result = await addQuestion({ ...newQuestion, exam_id: selectedExam.id });
    if (result.success) {
      setQuestions([...questions, result.question]);
      setNewQuestion({
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'a',
        points: 1
      });
      alert("تمت إضافة السؤال بنجاح! 🎉");
    } else {
      alert("فشل في إضافة السؤال: " + (result.message || "خطأ غير معروف"));
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm("تحذير: هل أنت متأكد من حذف هذا السؤال؟")) {
      const result = await deleteQuestion(id);
      if (result.success) {
        setQuestions(questions.filter(q => q.id !== id));
        alert("تم حذف السؤال بنجاح ✅");
      } else {
        alert("فشل الحذف: " + (result.message || "خطأ غير معروف"));
      }
    }
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

  return (
    <div className="container py-4" dir="rtl">
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-dark text-white rounded shadow">
        <h2 className="mb-0">📝 إدارة الامتحانات</h2>
        <div>
          <span className="me-3">مرحباً، {adminName}</span>
          <button onClick={() => navigate('/admin')} className="btn btn-sm btn-primary me-2">العودة للوحة التحكم</button>
          <button onClick={handleLogout} className="btn btn-sm btn-danger">خروج</button>
        </div>
      </div>

      <div className="row mb-4 text-center">
        <div className="col-md-4 mb-2">
          <div
            onClick={() => setCurrentView(0)}
            className={`card p-3 shadow-sm ${currentView === 0 ? 'border-primary bg-primary text-white' : 'bg-light'}`}
            style={{cursor: 'pointer', transition: '0.3s'}}
          >
            <h3>{exams.length}</h3>
            <p className="mb-0 fw-bold">📚 عرض الامتحانات</p>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div
            onClick={() => setCurrentView(1)}
            className={`card p-3 shadow-sm ${currentView === 1 ? 'border-success bg-success text-white' : 'bg-light'}`}
            style={{cursor: 'pointer', transition: '0.3s'}}
          >
            <h3>+</h3>
            <p className="mb-0 fw-bold">➕ إضافة امتحان</p>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div
            onClick={() => setCurrentView(2)}
            className={`card p-3 shadow-sm ${currentView === 2 ? 'border-info bg-info text-white' : 'bg-light'}`}
            style={{cursor: 'pointer', transition: '0.3s'}}
          >
            <h3>{questions.length}</h3>
            <p className="mb-0 fw-bold">❓ إدارة الأسئلة</p>
          </div>
        </div>
      </div>

      <div className="row">
        {currentView === 1 && (
          <div className="col-12">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-4 text-primary">➕ إضافة امتحان جديد</h5>
              <form onSubmit={handleAddExam}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="small text-muted">عنوان الامتحان</label>
                    <input
                      className="form-control"
                      value={newExam.title}
                      onChange={e => setNewExam({...newExam, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="small text-muted">عدد الأسئلة</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newExam.num_questions}
                      onChange={e => handleNumQuestionsChange(e.target.value)}
                      min="1"
                      max="50"
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="small text-muted">وصف الامتحان (اختياري)</label>
                    <textarea
                      className="form-control"
                      value={newExam.description}
                      onChange={e => setNewExam({...newExam, description: e.target.value})}
                      rows="1"
                    />
                  </div>
                </div>

                <h6 className="mb-3 text-secondary">الأسئلة ({examQuestions.length})</h6>
                <div className="row">
                  {examQuestions.map((question, index) => (
                    <div key={index} className="col-md-6 mb-4">
                      <div className="card border-light">
                        <div className="card-header bg-light">
                          <h6 className="mb-0">السؤال {index + 1}</h6>
                        </div>
                        <div className="card-body">
                          <div className="mb-2">
                            <label className="small text-muted">نص السؤال</label>
                            <textarea
                              className="form-control form-control-sm"
                              value={question.question_text}
                              onChange={e => handleQuestionChange(index, 'question_text', e.target.value)}
                              rows="2"
                              required
                            />
                          </div>
                          <div className="row">
                            <div className="col-6 mb-1">
                              <label className="small text-muted">الخيار أ</label>
                              <input
                                className="form-control form-control-sm"
                                value={question.option_a}
                                onChange={e => handleQuestionChange(index, 'option_a', e.target.value)}
                                required
                              />
                            </div>
                            <div className="col-6 mb-1">
                              <label className="small text-muted">الخيار ب</label>
                              <input
                                className="form-control form-control-sm"
                                value={question.option_b}
                                onChange={e => handleQuestionChange(index, 'option_b', e.target.value)}
                                required
                              />
                            </div>
                            <div className="col-6 mb-1">
                              <label className="small text-muted">الخيار ج</label>
                              <input
                                className="form-control form-control-sm"
                                value={question.option_c}
                                onChange={e => handleQuestionChange(index, 'option_c', e.target.value)}
                                required
                              />
                            </div>
                            <div className="col-6 mb-1">
                              <label className="small text-muted">الخيار د</label>
                              <input
                                className="form-control form-control-sm"
                                value={question.option_d}
                                onChange={e => handleQuestionChange(index, 'option_d', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-6">
                              <label className="small text-muted">الإجابة الصحيحة</label>
                              <select
                                className="form-select form-select-sm"
                                value={question.correct_answer}
                                onChange={e => handleQuestionChange(index, 'correct_answer', e.target.value)}
                              >
                                <option value="a">أ</option>
                                <option value="b">ب</option>
                                <option value="c">ج</option>
                                <option value="d">د</option>
                              </select>
                            </div>
                            <div className="col-6">
                              <label className="small text-muted">النقاط</label>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                value={question.points}
                                onChange={e => handleQuestionChange(index, 'points', parseInt(e.target.value))}
                                min="1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <button className="btn btn-success btn-lg px-5" type="submit">
                    📤 إضافة الامتحان والأسئلة
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {currentView === 2 && selectedExam && (
          <div className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm sticky-top" style={{top: '20px'}}>
              <h5 className="mb-3 text-primary">➕ إضافة سؤال للامتحان: {selectedExam.title}</h5>
              <form onSubmit={handleAddQuestion}>
                <div className="mb-2">
                  <label className="small text-muted">نص السؤال</label>
                  <textarea
                    className="form-control"
                    value={newQuestion.question_text}
                    onChange={e => setNewQuestion({...newQuestion, question_text: e.target.value})}
                    required
                    rows="3"
                  />
                </div>
                <div className="mb-2">
                  <label className="small text-muted">الخيار أ</label>
                  <input
                    className="form-control"
                    value={newQuestion.option_a}
                    onChange={e => setNewQuestion({...newQuestion, option_a: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="small text-muted">الخيار ب</label>
                  <input
                    className="form-control"
                    value={newQuestion.option_b}
                    onChange={e => setNewQuestion({...newQuestion, option_b: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="small text-muted">الخيار ج</label>
                  <input
                    className="form-control"
                    value={newQuestion.option_c}
                    onChange={e => setNewQuestion({...newQuestion, option_c: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="small text-muted">الخيار د</label>
                  <input
                    className="form-control"
                    value={newQuestion.option_d}
                    onChange={e => setNewQuestion({...newQuestion, option_d: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="small text-muted">الإجابة الصحيحة</label>
                  <select
                    className="form-select"
                    value={newQuestion.correct_answer}
                    onChange={e => setNewQuestion({...newQuestion, correct_answer: e.target.value})}
                  >
                    <option value="a">أ</option>
                    <option value="b">ب</option>
                    <option value="c">ج</option>
                    <option value="d">د</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="small text-muted">النقاط</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newQuestion.points}
                    onChange={e => setNewQuestion({...newQuestion, points: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
                <button className="btn btn-primary w-100 fw-bold">إضافة السؤال</button>
              </form>
            </div>
          </div>
        )}

        <div className={currentView === 0 ? "col-12" : currentView === 1 ? "col-12" : "col-md-8"}>
          <div className="card p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">
                {currentView === 0 ? "📚 قائمة الامتحانات" :
                 currentView === 1 ? "📝 إضافة امتحان جديد" :
                 `❓ أسئلة امتحان: ${selectedExam?.title || ''}`}
              </h5>
              <span className="badge bg-secondary">
                العدد: {currentView === 0 ? exams.length : questions.length}
              </span>
            </div>

            {currentView === 0 && (
              <div className="table-responsive" style={{maxHeight: '500px', overflowY: 'auto'}}>
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>العنوان</th>
                      <th>الوصف</th>
                      <th>تاريخ الإنشاء</th>
                      <th>إدارة</th>
                      <th>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.length > 0 ? exams.map(exam => (
                      <tr key={exam.id}>
                        <td className="fw-bold">{exam.title}</td>
                        <td>{exam.description || '-'}</td>
                        <td className="small">{new Date(exam.created_at).toLocaleDateString('ar-EG')}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-info"
                            onClick={() => {
                              setSelectedExam(exam);
                              loadQuestions(exam.id);
                              setCurrentView(2);
                            }}
                          >
                            إدارة الأسئلة
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteExam(exam.id)}
                          >
                            🗑️ مسح
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="5" className="text-center py-3 text-muted">لا توجد امتحانات، ابدأ بإضافة واحدة!</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {currentView === 2 && selectedExam && (
              <div className="table-responsive" style={{maxHeight: '500px', overflowY: 'auto'}}>
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>السؤال</th>
                      <th>الخيارات</th>
                      <th>الإجابة الصحيحة</th>
                      <th>النقاط</th>
                      <th>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.length > 0 ? questions.map(question => (
                      <tr key={question.id}>
                        <td className="fw-bold">{question.question_text}</td>
                        <td className="small">
                          أ: {question.option_a}<br/>
                          ب: {question.option_b}<br/>
                          ج: {question.option_c}<br/>
                          د: {question.option_d}
                        </td>
                        <td><span className="badge bg-success">{question.correct_answer.toUpperCase()}</span></td>
                        <td>{question.points}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            🗑️ مسح
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="5" className="text-center py-3 text-muted">لا توجد أسئلة، ابدأ بإضافة واحدة!</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminExamManagement;
