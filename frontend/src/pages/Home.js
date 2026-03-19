import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider'; 
import Counter from '../components/Counter';     
import '../App.css';

function Home() {
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('sciask_user'));
    setUser(storedUser);
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

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
    window.location.reload(); 
  };

  return (
    <div className="home-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <HeroSlider lang={lang} />
      {}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-md-3 col-6">
              <div className="p-3 bg-white shadow-sm rounded h-100">
                <i className="fas fa-user-graduate fa-3x text-primary mb-3"></i>
                <h2 className="fw-bold display-5 text-dark">+<Counter target={50000} /></h2>
                <p className="text-muted">
                  <span className="lang-ar">طالب وطالبة</span>
                  <span className="lang-en">Students</span>
                </p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 bg-white shadow-sm rounded h-100">
                <i className="fas fa-chalkboard-teacher fa-3x text-success mb-3"></i>
                <h2 className="fw-bold display-5 text-dark">+<Counter target={120} /></h2>
                <p className="text-muted">
                  <span className="lang-ar">محاضر وخبير</span>
                  <span className="lang-en">Lecturers & Experts</span>
                </p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="p-3 bg-white shadow-sm rounded h-100">
                <i className="fas fa-video fa-3x text-danger mb-3"></i>
                <h2 className="fw-bold display-5 text-dark">+<Counter target={100} /></h2>
                <p className="text-muted">
                  <span className="lang-ar">محاضرة مسجلة</span>
                  <span className="lang-en">Recorded Lectures</span>
                </p>
              </div>
            </div>
             <div className="col-md-3 col-6">
              <div className="p-3 bg-white shadow-sm rounded h-100">
                <i className="fas fa-certificate fa-3x text-warning mb-3"></i>
                <h2 className="fw-bold display-5 text-dark">+<Counter target={1500} /></h2>
                <p className="text-muted">
                  <span className="lang-ar">شهادة معتمدة</span>
                  <span className="lang-en">Certified Certificates</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
      <section id="about" className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <span className="text-primary fw-bold text-uppercase ls-2">
                <span className="lang-ar">منذ ٢٠٢٠</span>
                <span className="lang-en">Since 2020</span>
              </span>
              
              <p className="lead text-muted lh-lg">
                <span className="lang-ar">بدأت SciAsk عام ٢٠٢٠ ك مبادرة طلابية داخل كلية العلوم بجامعة طنطا. ثم تحولت عام ٢٠٢٥ إلى شركة تعليمية تهدف إلى ربط المعرفة الأكاديمية بالتطبيق العملي. توفّر الشركة محتوى علمي موثوق، وفرص تدريب وتوجية ودعم للطلاب والباحثين في مختلف المجالات العلمية، مع التركيز على تنمية مهارات البحث العلمي، ريادة الأعمال، التفكير النقدي، الاستعداد لسوق العمل، وكذلك المنح الدولية.</span>
                <span className="lang-en">SciAsk began in 2020 as a student initiative within the Faculty of Science at Tanta University. In 2025, it transformed into an educational company aiming to bridge the gap between academic knowledge and practical application. The company provides reliable scientific content, training opportunities, mentorship, and support for students and researchers across various scientific disciplines, with a focus on developing scientific research skills, entrepreneurship, critical thinking, job market readiness, and access to international scholarships.</span>
              </p>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="card border-0 shadow-lg p-4 bg-white rounded-4">
                <div className="text-center">
                  <div className="mb-3 text-success">
                    <i className="fas fa-chalkboard-teacher fa-4x"></i>
                  </div>
                  <h3 className="fw-bold mb-2">
                    <span className="lang-ar">منصة SciAsk التعليمية</span>
                    <span className="lang-en">SciAsk LMS Platform</span>
                  </h3>
                  <p className="text-muted small">
                    <span className="lang-ar">شاهد المحاضرات، حل الاختبارات، واحصل على شهادتك أونلاين.</span>
                    <span className="lang-en">Watch lectures, take quizzes, and get your certificate online.</span>
                  </p>
                  <hr />
                  <Link to="/classroom" className="btn btn-primary w-100 rounded-pill py-2 fw-bold">
                    <span className="lang-ar">الدخول للمنصة الآن</span>
                    <span className="lang-en">Enter Platform</span> 
                    <i className="fas fa-arrow-left ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {}
      <section id="tracks" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary display-6">
              <span className="lang-ar">برامجنا التدريبية</span>
              <span className="lang-en">Training Programs</span>
            </h2>
            <p className="text-muted fs-5">
              <span className="lang-ar">اختر المسار المناسب لطموحك</span>
              <span className="lang-en">Choose your career path</span>
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {}
            <div className="col-lg-4 col-md-6">
              <div className="track-card text-center p-4 h-100 border bg-white">
                <img src="/img/uri.jpeg" className="track-logo" alt="URI Logo" />
                <h4 className="fw-bold mb-3">
                  <span className="lang-ar">البحث العلمي (URI)</span>
                  <span className="lang-en">Scientific Research (URI)</span>
                </h4>
                <span className="badge bg-success mb-3">
                  <span className="lang-ar">+35,000 طالب</span>
                  <span className="lang-en">+35,000 Students</span>
                </span>
                <p className="text-muted small">
                  <span className="lang-ar">البرنامج الأضخم لتعليم البحث العلمي والنشر الدولي. معتمد من 15 جامعة.</span>
                  <span className="lang-en">The largest program for scientific research & international publication. Accredited by 15 universities.</span>
                </p>
                <Link to="/uri" className="btn btn-outline-success rounded-pill w-100">
                  <span className="lang-ar">تفاصيل المسار</span>
                  <span className="lang-en">View Details</span>
                </Link>
              </div>
            </div>
            {}
            <div className="col-lg-4 col-md-6">
              <div className="track-card text-center p-4 h-100 border bg-white">
                <img src="/img/ure.jpeg" className="track-logo" alt="URE Logo" />
                <h4 className="fw-bold mb-3">
                  <span className="lang-ar">ريادة الأعمال (URE)</span>
                  <span className="lang-en">Entrepreneurship (URE)</span>
                </h4>
                <span className="badge bg-success mb-3">
                  <span className="lang-ar">+10,000 طالب</span>
                  <span className="lang-en">+10,000 Students</span>
                </span>
                <p className="text-muted small">
                  <span className="lang-ar">حول بحثك لمشروع ناشئ (Startup). يشمل تحدي الجامعات والحاضنة.</span>
                  <span className="lang-en">Turn your research into a Startup. Includes University Challenge & Incubation.</span>
                </p>
                <Link to="/ure" className="btn btn-outline-success rounded-pill w-100">
                  <span className="lang-ar">تفاصيل المسار</span>
                  <span className="lang-en">View Details</span>
                </Link>
              </div>
            </div>
            {}
            <div className="col-lg-4 col-md-6">
              <div className="track-card text-center p-4 h-100 border bg-white">
                <img src="/img/urs.jpeg" className="track-logo" alt="URS Logo" />
                <h4 className="fw-bold mb-3">
                  <span className="lang-ar">المنح الدراسية (URS)</span>
                  <span className="lang-en">Scholarships (URS)</span>
                </h4>
                <span className="badge bg-primary mb-3">
                  <span className="lang-ar">+2,000 طالب</span>
                  <span className="lang-en">+2,000 Students</span>
                </span>
                <p className="text-muted small">
                  <span className="lang-ar">الدليل الشامل للمنح الدراسية والسفر للخارج.</span>
                  <span className="lang-en">Comprehensive guide to scholarships and studying abroad.</span>
                </p>
                <Link to="/urs" className="btn btn-outline-primary rounded-pill w-100">
                  <span className="lang-ar">تفاصيل المسار</span>
                  <span className="lang-en">View Details</span>
                </Link>
              </div>
            </div>
            {}
            <div className="col-lg-4 col-md-6">
              <div className="track-card text-center p-4 h-100 border bg-white">
                <img src="/img/or.jpeg" className="track-logo" alt="ORCT Logo" />
                <h4 className="fw-bold mb-3">
                  <span className="lang-ar">التطوير المهني (ORCT)</span>
                  <span className="lang-en">Career Development (ORCT)</span>
                </h4>
                <p className="text-muted small">
                  <span className="lang-ar">تطوير المهارات المهنية. تؤهلك لسوق العمل من خلال تعلم المهارات الحياتية وكذلك التقنية.</span>
                  <span className="lang-en">Developing professional skills. It prepares you for the job market by teaching you both life skills and technical skills.</span>
                </p>
                <Link to="/orct" className="btn btn-outline-primary rounded-pill w-100">
                  <span className="lang-ar">تفاصيل المسار</span>
                  <span className="lang-en">View Details</span>
                </Link>
              </div>
            </div>
            {}
            <div className="col-lg-4 col-md-6">
              <div className="track-card text-center p-4 h-100 border bg-white">
                <a href="#!" className="fb-float-btn"><i className="fab fa-facebook"></i></a>
                <img src="/img/b1.jpeg" className="track-logo" alt="BMS Logo" />
                <h4 className="fw-bold mb-3">
                  <span className="lang-ar">إدارة الأعمال (BMS)</span>
                  <span className="lang-en">Business Management (BMS)</span>
                </h4>
                <p className="text-muted small">
                  <span className="lang-ar">مدارس الإدارة (HR, PR, Marketing) المتخصصة للباحثين.</span>
                  <span className="lang-en">Management schools (HR, PR, Marketing) tailored for researchers.</span>
                </p>
                <Link to="/bms" className="btn btn-outline-dark rounded-pill w-100">
                  <span className="lang-ar">تفاصيل المسار</span>
                  <span className="lang-en">View Details</span>
                </Link>
              </div>
            </div>
            {}
            <div className="col-lg-4 col-md-6">
              <div className="track-card text-center p-4 h-100 border bg-light">
                <img src="/img/c1.jpeg" className="track-logo" alt="Challenge Logo" />
                <h4 className="fw-bold mb-3">
                  <span className="lang-ar">التحدي البحثي</span>
                  <span className="lang-en">Research Challenge</span>
                </h4>
                <span className="badge bg-danger mb-3">
                  <span className="lang-ar">برنامج مدفوع</span>
                  <span className="lang-en">Paid program</span>
                </span>
                <p className="text-muted small">
                  <span className="lang-ar">تحدي بحثي قوي مع جوائز مالية وتمويل للمشاريع الفائزة.</span>
                  <span className="lang-en">Research challenge with financial prizes and funding for winning projects.</span>
                </p>
                <Link to="/challenge" className="btn btn-primary rounded-pill w-100">
                  <span className="lang-ar">اشترك الآن</span>
                  <span className="lang-en">Join Now</span>
                </Link>
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
export default Home;