import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './URE.css';
function URE() {
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
    <div className="ure-page-container">
      <header className="page-header-ure">
        <div className="container">
          <img src="img/ure.jpeg" alt="URE Logo" className="program-logo" />
          <h1 className="display-4 fw-bold mb-3">Entrepreneurship (URE)</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            <span className="lang-ar">حول بحثك العلمي أو فكرتك الي شركة </span>
            <span className="lang-en">Turn your scientific research or idea into a company</span>
          </p>
          <div className="mt-4">
            <Link to="/apply" className="btn btn-primary btn-lg rounded-pill px-5 shadow">
               <span className="lang-ar">سجل الآن في URE</span><span className="lang-en">Register Now</span>
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
              <h3 className="fw-bold text-primary mb-4">
                <span className="lang-ar">منهج البرنامج</span><span className="lang-en">Program Curriculum</span>
              </h3>
              <div className="accordion shadow-sm" id="ureAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#u1">
                       <span className="lang-ar">URE UC</span><span className="lang-en">Design Thinking</span>
                    </button>
                  </h2>
                  <div id="u1" className="accordion-collapse collapse show" data-bs-parent="#ureAccordion">
                    <div className="accordion-body">
                      <div className="accordion" id="ureUcAccordion">
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#uc1">
                              1. <span className="lang-ar">التصميم الإبداعي</span><span className="lang-en">Creative Design</span>
                            </button>
                          </h2>
                          <div id="uc1" className="accordion-collapse collapse show" data-bs-parent="#ureUcAccordion">
                            <div className="accordion-body">
                              <span className="lang-ar">كيفية توليد الأفكار وحل المشكلات بطرق إبداعية وفهم احتياجات العميل.</span>
                              <span className="lang-en">How to generate ideas, solve problems creatively, and understand customer needs.</span>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#uc2">
                              2. <span className="lang-ar">نموذج العمل</span><span className="lang-en">Business Model</span>
                            </button>
                          </h2>
                          <div id="uc2" className="accordion-collapse collapse" data-bs-parent="#ureUcAccordion">
                            <div className="accordion-body">
                              <span className="lang-ar">شرح Business Model Canvas وكيفية دراسة السوق والمنافسين.</span>
                              <span className="lang-en">Explaining the Business Model Canvas and how to analyze the market and competitors.</span>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#uc3">
                              3. <span className="lang-ar">العرض التقديمي</span><span className="lang-en">Presentation</span>
                            </button>
                          </h2>
                          <div id="uc3" className="accordion-collapse collapse" data-bs-parent="#ureUcAccordion">
                            <div className="accordion-body">
                              <span className="lang-ar">كيف تعرض فكرتك على المستثمرين وتقنعهم بتمويل مشروعك في وقت قصير.</span>
                              <span className="lang-en">How to pitch your idea to investors and persuade them to fund your project.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#u2">
                       <span className="lang-ar">URE startups</span><span className="lang-en">Business Model & Pitching</span>
                    </button>
                  </h2>
                  <div id="u2" className="accordion-collapse collapse" data-bs-parent="#ureAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">شرح Business Model Canvas وكيفية دراسة السوق والمنافسين. كيف تعرض فكرتك على المستثمرين وتقنعهم بتمويل مشروعك في وقت قصير.</span>
                       <span className="lang-en">Explaining the Business Model Canvas and how to analyze the market and competitors. How to pitch your idea to investors and persuade them to fund your project.</span>
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
                    <span className="lang-ar">المميزات</span><span className="lang-en">Features</span>
                  </h5>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon-ure ms-3"><i className="fas fa-rocket"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0">تدريب مبسط متكامل عن اساسيات ريادة الأعمال </h6>
                      <small className="text-muted">Simplified and comprehensive training on the fundamentals of entrepreneurship</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon-ure ms-3"><i className="fas fa-hand-holding-usd"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0">جلسات توجية </h6>
                      <small className="text-muted"> Guidance sessions</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon-ure ms-3"><i className="fas fa-users"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0">شبكة علاقات</h6>
                      <small className="text-muted">Networking</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                 <img src="/img\u2.jpeg" className="img-fluid rounded-3 shadow-sm" alt="URE" />
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
              href="https://www.facebook.com/share/183AkUjHHc/"
              className="text-white mx-2"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="
https://www.linkedin.com/company/ure-entrepreneurship/"
              className="text-white mx-2"
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
          <p className="mb-0">&copy; 2025 SciAsk.
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
export default URE;