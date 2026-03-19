import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BMS.css';
function BMS() {
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');
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
    <div className="bms-page-container">
      {}
      <header className="page-header">
        <div className="container">
          <img src="img/b1.jpeg" alt="BMS Logo" className="program-logo" />
          <h1 className="display-4 fw-bold mb-3">Business Management (BMS)</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            <span className="lang-ar">مدارس الإدارة المتخصصة. تعلم إدارة الموارد البشرية، العلاقات العامة، والتسويق بشكل عملي.</span>
            <span className="lang-en">Specialized Management Schools. Learn Human Resources, Public Relations, and Marketing practically.</span>
          </p>
          <div className="mt-4">
            <Link to="/apply" className="btn btn-warning text-dark fw-bold btn-lg rounded-pill px-5">
               <span className="lang-ar">التحق بالبرنامج</span><span className="lang-en">Enroll Now</span>
            </Link>
          </div>
        </div>
      </header>
      {}
      <section className="py-5 flex-grow-1">
        <div className="container">
          <div className="row g-5">
            {}
            <div className="col-lg-8">
              <h3 className="fw-bold text-warning mb-4">
                <span className="lang-ar">اقسام البرنامج </span><span className="lang-en"> Program sections </span>
              </h3>
              <div className="accordion shadow-sm" id="bmsAccordion">
                {}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#d1">
                       <span className="lang-ar">مدرسة الموارد البشرية (HR School)</span><span className="lang-en">HR School</span>
                    </button>
                  </h2>
                  <div id="d1" className="accordion-collapse collapse show" data-bs-parent="#bmsAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">التوظيف (Recruitment)، تقييم الأداء، التدريب والتطوير، وشؤون الموظفين.</span>
                       <span className="lang-en">Recruitment, Performance Appraisal, Training & Development, and Personnel.</span>
                    </div>
                  </div>
                </div>
                {}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#d2">
                       <span className="lang-ar">مدرسة العلاقات العامة (PR School)</span><span className="lang-en">PR School</span>
                    </button>
                  </h2>
                  <div id="d2" className="accordion-collapse collapse" data-bs-parent="#bmsAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">التحدث أمام الجمهور (Public Speaking)، تنظيم الفعاليات، وكتابة المحتوى الإعلامي.</span>
                       <span className="lang-en">Public Speaking, Event Organization, and Media Content Writing.</span>
                    </div>
                  </div>
                </div>
                {}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#d3">
                       <span className="lang-ar">مدرسة التسويق (Marketing School)</span><span className="lang-en">Marketing School</span>
                    </button>
                  </h2>
                  <div id="d3" className="accordion-collapse collapse" data-bs-parent="#bmsAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">التسويق الرقمي (Digital Marketing)، إدارة وسائل التواصل الاجتماعي، وصناعة المحتوى.</span>
                       <span className="lang-en">Digital Marketing, Social Media Management, and Content Creation.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm bg-light">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    <span className="lang-ar">التطبيق العملي</span><span className="lang-en">Practical Work</span>
                  </h5>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon ms-3"><i className="fas fa-briefcase"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0">مشاريع حقيقية</h6>
                      <small className="text-muted">Real Projects</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon ms-3"><i className="fas fa-users-cog"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0">إدارة فرق</h6>
                      <small className="text-muted">Team Management</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <img src="img/sc.jpeg" className="img-fluid rounded-3 shadow-sm" alt="BMS Structure" />
              </div>
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
export default BMS;