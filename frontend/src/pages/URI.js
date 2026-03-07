import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './URI.css';
function URI() {
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
    <div className="uri-page-container">
      <header className="page-header-uri">
        <div className="container">
          <img src="img/uri.jpeg" alt="URI Logo" className="program-logo" />
          <h1 className="display-4 fw-bold mb-3">Scientific Research (URI)</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            <span className="lang-ar">المسار الأقوى والأشمل لتعلم البحث العلمي من الألف للياء. انشر بحثك دولياً تحت إشراف نخبة من العلماء.</span>
            <span className="lang-en">The strongest and most comprehensive track to learn scientific research from A to Z. Publish your research internationally under the supervision of elite scientists.</span>
          </p>
          <div className="mt-4">
            <Link to="/apply" className="btn btn-success btn-lg rounded-pill px-5 shadow">
               <span className="lang-ar">ابدأ رحلة البحث</span><span className="lang-en">Start Research</span>
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
              <h3 className="fw-bold text-success mb-4">
                <span className="lang-ar">عن برنامج URI</span><span className="lang-en">About URI Program</span>
              </h3>
              <p className="text-muted lh-lg mb-4">
                <span className="lang-ar">برنامج URI هو حجر الأساس في SciAsk. يؤهلك البرنامج لتكون باحثاً علمياً محترفاً قادراً على كتابة ونشر الأوراق العلمية في مجلات دولية مصنفة (Q1/Q2). البرنامج معتمد من أكثر من 15 جامعة مصرية.</span>
                <span className="lang-en">The URI program is the cornerstone of SciAsk. It qualifies you to become a professional scientific researcher capable of writing and publishing papers in ranked international journals (Q1/Q2). The program is accredited by over 15 Egyptian universities.</span>
              </p>
              <h4 className="fw-bold mb-3">
                <span className="lang-ar">المنهج التدريبي:</span><span className="lang-en">Curriculum:</span>
              </h4>
              <div className="accordion shadow-sm" id="uriAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#c1">
                       <span className="lang-ar">التدريب على البحث العلمي (SRT)</span><span className="lang-en">SRT- Scientific Research Training</span>
                    </button>
                  </h2>
                  <div id="c1" className="accordion-collapse collapse show" data-bs-parent="#uriAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">مسار تدريبي تأسيسي يعرّف الطلاب بأساسيات البحث العلمي خطوة بخطوة، من اختيار الفكرة وصياغة المشكلة البحثية إلى تصميم التجربة وكتابة البحث بطريقة أكاديمية صحيحة. يهدف لبناء قاعدة قوية لأي طالب يريد دخول مجال البحث.</span>
                       <span className="lang-en">A foundational training track that introduces students to the fundamentals of scientific research, from choosing a research idea and formulating a problem to experimental design and academic writing. It builds a solid base for anyone starting their research journey.</span>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c2">
                       <span className="lang-ar">RL- Research Leaders</span><span className="lang-en">RL- Research Leaders</span>
                    </button>
                  </h2>
                  <div id="c2" className="accordion-collapse collapse" data-bs-parent="#uriAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">مسار متقدم يركّز على إعداد كوادر قادرة على قيادة فرق بحثية، وإدارة مشروعات علمية، والإشراف على طلاب أصغر سنًا داخل المبادرة. يهتم بتنمية مهارات القيادة، التنظيم، والتوجيه البحثي.</span>
                       <span className="lang-en">An advanced track focused on preparing students to lead research teams, manage scientific projects, and mentor junior participants. It develops leadership, organization, and research supervision skills.</span>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c3">
                       <span className="lang-ar">RS- Research Schools</span><span className="lang-en">RS- Research Schools</span>
                    </button>
                  </h2>
                  <div id="c3" className="accordion-collapse collapse" data-bs-parent="#uriAccordion">
                    <div className="accordion-body">
                       <span className="lang-ar">مسار تخصصي يعتمد على التعلم القائم على المشروعات داخل “مدارس بحثية” في مجالات علمية محددة، حيث يعمل الطلاب على مشكلات حقيقية تحت إشراف أكاديمي. يربط بين الدراسة النظرية والتطبيق البحثي العملي.</span>
                       <span className="lang-en">A specialized, project-based track where students work within “research schools” in specific scientific fields on real problems under academic supervision. It bridges theoretical study with practical research application.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                  <div className="card border-0 shadow-sm">
                    <img src="img\u.jpeg" className="card-img-top" alt="URI Roadmap" />
                    <div className="card-body text-center bg-white">
                        <small className="text-muted fw-bold">
                            <span className="lang-ar">خارطة الطريق لبرنامج URI</span><span className="lang-en">URI Program Roadmap</span>
                        </small>
                    </div>
                  </div>
              </div>
            </div>
            {}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm bg-light">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    <span className="lang-ar">مميزات المسار</span><span className="lang-en">Key Features</span>
                  </h5>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon-uri ms-3"><i className="fas fa-globe"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0"><span className="lang-ar">نشر دولي</span><span className="lang-en">Int. Publication</span></h6>
                      <small className="text-muted"><span className="lang-ar">مجلات Scopus & PubMed</span><span className="lang-en">Scopus & PubMed</span></small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon-uri ms-3"><i className="fas fa-user-tie"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0"><span className="lang-ar">إشراف أكاديمي</span><span className="lang-en">Academic Mentorship</span></h6>
                      <small className="text-muted"><span className="lang-ar">متابعة فردية لبحثك</span><span className="lang-en">1-on-1 supervision</span></small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="feature-icon-uri ms-3"><i className="fas fa-award"></i></div>
                    <div>
                      <h6 className="fw-bold mb-0"><span className="lang-ar">اعتماد جامعي</span><span className="lang-en">Accreditation</span></h6>
                      <small className="text-muted"><span className="lang-ar">شهادات موثقة</span><span className="lang-en">Verified Certificates</span></small>
                    </div>
                  </div>
                </div>
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
              href="https://www.facebook.com/share/16xgBLiRyh/"
              className="text-white mx-2"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/undergraduate-researchers-intiative-%D9%85%D8%A8%D8%A7%D8%AF%D8%B1%D8%A9-%D8%A8%D8%A7%D8%AD%D8%AB%D9%88%D9%86-%D9%85%D8%A7-%D9%82%D8%A8%D9%84-%D8%A7%D9%84%D8%AA%D8%AE%D8%B1%D8%AC/"
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
export default URI;