import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ORCT.css';

function ORCT() {
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
    <div className="orct-page-container">
      
      {/* Header Section */}
      <header className="page-header-orct">
        <div className="container">
          <img src="img/or.jpeg" alt="ORCT Logo" className="program-logo" />
          <h1 className="display-4 fw-bold mb-3">Career Development (ORCT)</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            <span className="lang-ar">تطوير المهارات المهنية. تؤهلك لسوق العمل من خلال تعلم المهارات الحياتية وكذلك التقنية.</span>
            <span className="lang-en">Developing professional skills. It prepares you for the job market by teaching you both life skills and technical skills..</span>
          </p>
          <div className="mt-4">
            <Link to="/apply" className="btn btn-info text-white btn-lg rounded-pill px-5">
               <span className="lang-ar">سجل الآن</span><span className="lang-en">Register Now</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <section className="py-5 flex-grow-1">
        <div className="container">
          <div className="row g-5">
            
            {/* Accordion */}
            <div className="col-lg-8">
              <h3 className="fw-bold text-info mb-4">
                <span className="lang-ar">محتوى البرنامج</span><span className="lang-en">Program Content</span>
              </h3>
              
              <div className="accordion shadow-sm" id="orctAccordion">
                
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#c1">
                       <span className="lang-ar">1.ORCT employability skills</span><span className="lang-en">1. Soft Skills</span>
                    </button>
                  </h2>
                  <div id="c1" className="accordion-collapse collapse show" data-bs-parent="#orctAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">سلسلة ما لن تستطيع تداركه توفر لك كل ما تحتاجه لبدأ حياتك المهنية</span>
                       <span className="lang-en">The "What You Can't Fix" series provides everything you need to start your career..</span>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c2">
                       <span className="lang-ar">2.ORCT podcasts</span><span className="lang-en">2. Professional Branding</span>
                    </button>
                  </h2>
                  <div id="c2" className="accordion-collapse collapse" data-bs-parent="#orctAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">سلسلة بودكاست عن كل مجال من مجالات سوق العمل. توفر لك خلفية كاملة عن كل ما تحتاجه من مهارات فنية وتقنية.</span>
                       <span className="lang-en">A podcast series covering every field in the job market. It provides you with a comprehensive overview of all the technical and professional skills you need..</span>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c3">
                       <span className="lang-ar">مميزات البرنامج</span><span className="lang-en">3. Interview Skills</span>
                    </button>
                  </h2>
                  <div id="c3" className="accordion-collapse collapse" data-bs-parent="#orctAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">تأهل كامل لسوق العمل </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Image */}
            <div className="col-lg-4">
              <div className="mt-4">
                <img src="img/or2.jpeg" className="img-fluid rounded-3 shadow-sm" alt="ORCT Structure" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default ORCT;