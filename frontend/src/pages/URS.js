import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './URS.css';
function URS() {
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
    <div className="urs-page-container">
      <header className="page-header-urs">
        <div className="container">
          <img src="img/urs.jpeg" alt="URS Logo" className="program-logo" />
          <h1 className="display-4 fw-bold mb-3">Scholarships (URS)</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            <span className="lang-ar">بوابتك للدراسة في الخارج. دليلك الشامل للحصول على منح دراسية ممولة بالكامل في أفضل جامعات العالم.</span>
            <span className="lang-en">Your gateway to studying abroad. A comprehensive guide to getting fully funded scholarships at top global universities.</span>
          </p>
          <div className="mt-4">
            <Link to="/apply" className="btn btn-primary btn-lg rounded-pill px-5 shadow">
               <span className="lang-ar">ابدأ رحلة المنح</span><span className="lang-en">Start Journey</span>
            </Link>
          </div>
        </div>
      </header>
      <section className="py-5 flex-grow-1">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <h3 className="fw-bold text-primary mb-4">
                <span className="lang-ar">عن برنامج المنح (URS)</span><span className="lang-en">About URS Program</span>
              </h3>
              <p className="text-muted lh-lg mb-4">
                <span className="lang-ar">برنامج URS مصمم خصيصاً للطلاب والباحثين الراغبين في استكمال دراستهم (ماجستير أو دكتوراه) في الخارج. نوفر لك التدريب والتوجيه اللازم لتجهيز ملفك الشخصي والمنافسة بقوة على المنح الدولية.</span>
                <span className="lang-en">The URS program is designed for students and researchers wishing to pursue their studies (Master's or PhD) abroad. We provide the training and mentorship needed to build your profile and compete for international scholarships.</span>
              </p>
              <h4 className="fw-bold mb-3">
                <span className="lang-ar">ماذا ستتعلم؟</span><span className="lang-en">What will you learn?</span>
              </h4>
              <div className="accordion shadow-sm" id="ursAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#c1">
                       <span className="lang-ar">1. التجهيز وبناء الملف (Preparation)</span><span className="lang-en">1. Preparation & Profile Building</span>
                    </button>
                  </h2>
                  <div id="c1" className="accordion-collapse collapse show" data-bs-parent="#ursAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">كيفية كتابة سيرة ذاتية (CV) أكاديمية احترافية، وكيفية التحضير لاختبارات اللغة (IELTS/TOEFL) واختبارات القبول (GRE).</span>
                       <span className="lang-en">How to write a professional academic CV, and prepare for language tests (IELTS/TOEFL) and admission tests (GRE).</span>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c2">
                       <span className="lang-ar">2. التقديم والمراسلة (Application)</span><span className="lang-en">2. Application & Emailing</span>
                    </button>
                  </h2>
                  <div id="c2" className="accordion-collapse collapse" data-bs-parent="#ursAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">فنون كتابة خطاب الدافع (Motivation Letter) وخطابات التوصية، وكيفية مراسلة المشرفين في الجامعات الأجنبية بطريقة رسمية.</span>
                       <span className="lang-en">The art of writing Motivation Letters and Recommendation Letters, and how to email supervisors at foreign universities professionally.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm bg-light">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    <span className="lang-ar">مميزات المسار</span><span className="lang-en">Key Features</span>
                  </h5>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon-urs ms-3"><i className="fas fa-globe-americas"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0"><span className="lang-ar"> تدريب متكامل عن المنح</span><span className="lang-en">Study Abroad</span></h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon-urs ms-3"><i className="fas fa-wallet"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0"><span className="lang-ar">  جلسات توجية</span><span className="lang-en">Fully Funded</span></h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon-urs ms-3"><i className="fas fa-user-graduate"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0"><span className="lang-ar">قصص نجاح</span><span className="lang-en">Success Stories</span></h6>
                      <small className="text-muted"><span className="lang-ar">انضم لـ 2000+ طالب</span><span className="lang-en">Join 2000+ students</span></small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <img src="img/s.jpeg" className="img-fluid rounded-3 shadow-sm" alt="URS Structure" />
          </div>
        </div>
      </section>
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <div className="mb-3">
            <a
              href="https://www.facebook.com/share/1AGePVdPik/"
              className="text-white mx-2"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/urs-undergraduates-research-scholarships/"
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
            <a href="https://github.com/NermeenNasser" className="text-white mx-2">
              <i className="fab fa-github fa-lg"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default URS;