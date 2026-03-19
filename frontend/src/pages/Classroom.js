import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getLectures, getUserProgress, markLectureComplete } from '../services/api';
import './Classroom.css'; 
function Classroom() {
  const [lectures, setLectures] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');
  const user = JSON.parse(localStorage.getItem('sciask_user'));
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      setLoading(true);
      const allLectures = await getLectures();
      setLectures(allLectures);
      if (allLectures.length > 0) {
        setCurrentLecture(allLectures[0]);
      }
      if (user && user.email) {
        const progress = await getUserProgress(user.email);
        setCompletedIds(progress);
      }
    } catch (error) {
      console.error("Error loading classroom:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleLectureClick = (lecture) => {
    setCurrentLecture(lecture);
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
  const handleMarkComplete = async () => {
    if (!user || !currentLecture) return alert(lang === 'ar' ? "يرجى تسجيل الدخول أولاً" : "Please log in first");
    if (completedIds.includes(currentLecture.id)) {
      alert(lang === 'ar' ? "⚠️ هذا الدرس تم إتمامه بالفعل!" : "⚠️ This lesson has already been completed!");
      return;
    }
    try {
      const newProgress = await markLectureComplete(user.email, currentLecture.id);
      setCompletedIds(newProgress);
      alert(lang === 'ar' ? `✅ مبروك! تم تسجيل إتمام الدرس وحصلت على 10 نقاط.` : `✅ Congratulations! Lesson completion has been recorded and you got 10 points.`);
    } catch (error) {
      alert(lang === 'ar' ? "خطأ في تسجيل الإتمام" : "Error recording completion");
    }
  };
  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };
  if (loading) return <div className="text-center p-5"><h3>جارٍ تحميل الفصل الدراسي...</h3></div>;
  return (
    <div className="classroom-container d-flex" dir="rtl">
      {}
      <div className="sidebar bg-light border-start p-3" style={{ width: '300px', minHeight: '100vh' }}>
        {}
        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-outline-secondary btn-sm rounded-circle" onClick={toggleLanguage} title="Switch Language">
            <i className="fas fa-language"></i>
          </button>
          <button className="btn btn-outline-dark btn-sm rounded-circle" onClick={toggleTheme} title="Dark Mode">
            <i id="themeIcon" className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
        <h5 className="mb-4 fw-bold">🎓 محتوى الكورس</h5>
        <div className="list-group">
          {lectures.map((lec) => (
            <button
              key={lec.id}
              className={`list-group-item list-group-item-action ${currentLecture?.id === lec.id ? 'active' : ''}`}
              onClick={() => handleLectureClick(lec)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span>{lec.title}</span>
                {completedIds.includes(lec.id) && (
                  <span className="badge bg-success rounded-pill">✔</span>
                )}
              </div>
              <small className={`d-block ${currentLecture?.id === lec.id ? 'text-white-50' : 'text-muted'}`}>
                {lec.track}
              </small>
            </button>
          ))}
        </div>
      </div>
      {}
      <div className="main-content flex-grow-1 p-4 bg-white">
        {currentLecture ? (
          <div>
            {}
            <div className="ratio ratio-16x9 mb-4 shadow rounded overflow-hidden">
              <iframe
                src={getEmbedUrl(currentLecture.link)} 
                title={currentLecture.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold">{currentLecture.title}</h2>
                <span className="badge bg-primary fs-6">{currentLecture.track}</span>
              </div>
              <button 
                className={`btn btn-lg ${completedIds.includes(currentLecture.id) ? 'btn-success' : 'btn-outline-primary'}`}
                onClick={handleMarkComplete}
              >
                {completedIds.includes(currentLecture.id) ? '✔ تم إنهاء الدرس' : 'أنهيت الدرس'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-5 text-muted">لا توجد محاضرات متاحة حالياً.</div>
        )}
      </div>
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <div className="mb-3">
            <a
              href="https://www.facebook.com/share/17pnQLsmHo/"
              className="text-white mx-2"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/sciask/"
              className="text-white mx-2"
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
          <p className="mb-0">
            &copy; 2025 SciAsk.
            <span className="lang-ar">جميع الحقوق محفوظة.</span>
            <span className="lang-en">All Rights Reserved.</span>
          </p>
          <small className="text-white-50">
            <Link to="/portfolio.html" className="text-white-50 text-decoration-none">
              <span className="lang-ar">تم التطوير بواسطة نرمين ناصر</span>
              <span className="lang-en">Developed by Nermeen Nasser</span>
            </Link>
          </small>
          <div>
            <a
              href="https://www.facebook.com/share/1HHxacxAE9/"
              className="text-white mx-2"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
        <a href="www.linkedin.com/in/nermeen-n-42722828a" className="text-white mx-2">
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
            <a
              href="https://www.instagram.com/nermeennasser274/"
              className="text-white mx-2"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Classroom;
