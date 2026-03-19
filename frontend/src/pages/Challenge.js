import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Challenge.css';
function Challenge() {
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');
  const [phase1Open, setPhase1Open] = useState(false);
  const [phase2Open, setPhase2Open] = useState(false);
  const [phase1CoursesOpen, setPhase1CoursesOpen] = useState(false);
  
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
  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('dir', 'rtl');
  }, []);
  return (
    <div className="challenge-page-container">
      <header className="page-header-challenge">
        <div className="container">
          <img src="img/c1.jpeg" alt="Challenge Logo" className="program-logo" />
          <h1 className="display-4 fw-bold mb-3">
            <span className="lang-ar">تحدي البحث</span>
            <span className="lang-en">Research Challenge</span>
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            <span className="lang-ar">تحدي بحثي مدته شهرين. الشهر الأول يشمل ثلاث كورسات علمية مكثفة مع جلسات توجية وثلاث امتحانات بثلاث شهادات معتمدة. الشهر الثاني يشمل بروجكت تطبيقي على كورسات الشهر الاول مع جلسات توجية</span>
            <span className="lang-en">A two-month research challenge. The first month includes three intensive scientific courses with mentoring sessions and three exams leading to three accredited certificates. The second month includes an applied project based on the first month's courses with mentoring sessions.</span>
          </p>
          <div className="mt-4">
            <Link to="/apply" className="btn btn-primary btn-lg rounded-pill px-5 shadow">
               <span className="lang-ar">اشترك في التحدي</span><span className="lang-en">Join Challenge</span>
            </Link>
          </div>
        </div>
      </header>
      {}
      <section className="py-5 flex-grow-1">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <h3 className="fw-bold text-danger mb-4">
                <span className="lang-ar">تفاصيل التحدي</span><span className="lang-en">Challenge Details</span>
              </h3>
              
              {/* Phase 1 */}
              <div className="mb-3">
                <button 
                  className="btn btn-outline-primary w-100 d-flex justify-content-between align-items-center"
                  onClick={() => setPhase1Open(!phase1Open)}
                >
                  <span className="fw-bold">
                    <span className="lang-ar">المرحلة الأولى</span><span className="lang-en">Phase 1</span>
                  </span>
                  <i className={`fas ${phase1Open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </button>
                {phase1Open && (
                  <div className="mt-2 p-3 bg-light rounded">
                    <button 
                      className="btn btn-sm btn-link text-decoration-none"
                      onClick={() => setPhase1CoursesOpen(!phase1CoursesOpen)}
                    >
                      <span className="lang-ar">٣ كورسات (اضغط للتفاصيل)</span><span className="lang-en">3 courses (click for details)</span>
                      <i className={`fas ${phase1CoursesOpen ? 'fa-minus' : 'fa-plus'} ms-2`}></i>
                    </button>
                    {phase1CoursesOpen && (
                      <ul className="list-group shadow-sm mt-2">
                        <li className="list-group-item">
                          <i className="fas fa-book ms-2 text-primary"></i>
                          <span className="lang-ar">Nanotechnology</span><span className="lang-en">Nanotechnology</span>
                        </li>
                        <li className="list-group-item">
                          <i className="fas fa-book ms-2 text-primary"></i>
                          <span className="lang-ar">Scientific Research</span><span className="lang-en">Scientific Research</span>
                        </li>
                        <li className="list-group-item">
                          <i className="fas fa-book ms-2 text-primary"></i>
                          <span className="lang-ar">Mini-review Writing</span><span className="lang-en">Mini-review Writing</span>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Phase 2 */}
              <div className="mb-3">
                <button 
                  className="btn btn-outline-success w-100 d-flex justify-content-between align-items-center"
                  onClick={() => setPhase2Open(!phase2Open)}
                >
                  <span className="fw-bold">
                    <span className="lang-ar">المرحلة الثانية</span><span className="lang-en">Phase 2</span>
                  </span>
                  <i className={`fas ${phase2Open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </button>
                {phase2Open && (
                  <div className="mt-2 p-3 bg-light rounded">
                    <ul className="list-group shadow-sm">
                      <li className="list-group-item">
                        <i className="fas fa-project-diagram ms-2 text-success"></i>
                        <span className="lang-ar">Mini-review Project</span><span className="lang-en">Mini-review Project</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <img src="img/rc.jpeg" className="img-fluid rounded-3 shadow-sm" alt="Challenge Structure" />
            </div>
          </div>
        </div>
      </section>
      {}
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
export default Challenge;