import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 6; 

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === totalSlides - 1 ? 0 : current + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setActiveIndex((current) => (current === totalSlides - 1 ? 0 : current + 1));
  const prevSlide = () => setActiveIndex((current) => (current === 0 ? totalSlides - 1 : current - 1));

  return (
    <header className="carousel slide" style={{ position: 'relative', overflow: 'hidden', minHeight: '550px' }}>
      {}
      <div className="carousel-indicators">
        {[...Array(totalSlides)].map((_, index) => (
          <button 
            key={index}
            type="button" 
            className={`bg-dark ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
            style={{ width: '10px', height: '10px', borderRadius: '50%', margin: '0 5px' }}
          ></button>
        ))}
      </div>
      <div className="carousel-inner" style={{ position: 'relative', width: '100%', height: '550px' }}>
        {}
        <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`} 
             style={{ 
               display: activeIndex === 0 ? 'block' : 'none', 
               height: '100%', 
               transition: 'opacity 0.6s ease-in-out' 
             }}>
          <div className="d-flex align-items-center justify-content-center h-100 bg-white">
            <div className="container text-center py-5">
              <div className="row align-items-center">
                <div className="col-md-6 order-md-2">
                  {}
                  <img src={process.env.PUBLIC_URL + "/img/logo2.jpeg"} className="img-fluid mb-4" alt="شعار ساي آسك" style={{maxHeight: '250px'}} />
                </div>
                <div className="col-md-6 order-md-1 text-md-end text-center">
                  <h1 className="display-4 fw-bold mb-3 text-dark">SciAsk</h1>
                  <h2 className="h3 text-primary fw-bold mb-4">
                    <span className="lang-ar">بوابتك للتميز في البحث العلمي وريادة الأعمال</span>
                    <span className="lang-en">Your Gateway to Scientific Research & Entrepreneurship</span>
                  </h2>
                  <p className="lead text-muted mb-5" style={{ fontSize: '1.1rem' }}>
                    <span className="lang-ar">شركة رائدة تعمل في أكثر من 20 جامعة مصرية ولها فروع دولية. انضم لأكثر من 50,000 مستفيد وابدأ رحلتك الآن.</span>
                    <span className="lang-en">A leading company operating in 20+ Egyptian universities. Join 50,000+ beneficiaries now.</span>
                  </p>
                  {}
                  <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                    {}
                    <Link to="/classroom" className="btn btn-success btn-lg px-5 rounded-pill shadow-lg">
                      <i className="fas fa-play-circle me-2"></i> 
                      <span className="lang-ar">ابدأ التعلم</span>
                      <span className="lang-en">Start Learning</span>
                    </Link>
                    <a href="https://www.facebook.com/share/17pnQLsmHo/" className="btn btn-primary btn-lg px-5 rounded-pill shadow-lg">
                      <i className="fab fa-facebook me-2"></i>
                      <span className="lang-ar">صفحتنا</span>
                      <span className="lang-en">Our Page</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {}
        {[
          {
            src: process.env.PUBLIC_URL + "/img/c1.jpeg",
            name: "Research Challenge",
            subtitleAr: "تحدي البحث العلمي",
            subtitleEn: "Scientific Research Challenge",
            descriptionAr: "تحدي يجمع الطلاب في مسابقات بحثية لتطوير حلول علمية للمشكلات الحقيقية في المجتمع.",
            descriptionEn: "A challenge that brings students together in research competitions to develop scientific solutions to real-world community problems.",
            link: "/challenge",
            fbLink: "https://www.facebook.com/share/17pnQLsmHo/"
          },
          {
            src: process.env.PUBLIC_URL + "/img/uri.jpeg",
            name: "Scientific Research (URI)",
            subtitleAr: "البحث العلمي",
            subtitleEn: "Scientific Research",
            descriptionAr: "المسار الأقوى والأشمل لتعلم البحث العلمي من الألف للياء. انشر بحثك دولياً تحت إشراف نخبة من العلماء.",
            descriptionEn: "The strongest and most comprehensive path to learn scientific research from A to Z. Publish your research internationally under the supervision of elite scientists.",
            link: "/apply",
            fbLink: "https://www.facebook.com/share/16xgBLiRyh/"
          },
          {
            src: process.env.PUBLIC_URL + "/img/urs.jpeg",
            name: "Scholarships (URS)",
            subtitleAr: "المنح الدراسية",
            subtitleEn: "Scholarships",
            descriptionAr: "بوابتك للدراسة في الخارج. دليلك الشامل للحصول على منح دراسية ممولة بالكامل في أفضل جامعات العالم.",
            descriptionEn: "Your gateway to studying abroad. A comprehensive guide to obtaining fully funded scholarships at top global universities.",
            link: "/apply",
            fbLink: "https://www.facebook.com/share/1AGePVdPik/"
          },
          {
            src: process.env.PUBLIC_URL + "/img/ure.jpeg",
            name: "Entrepreneurship (URE)",
            subtitleAr: "ريادة الأعمال",
            subtitleEn: "Entrepreneurship",
            descriptionAr: "حول بحثك العلمي أو فكرتك إلى شركة. تدريب متكامل على أساسيات ريادة الأعمال والابتكار.",
            descriptionEn: "Turn your scientific research or idea into a company. Comprehensive training on the basics of entrepreneurship and innovation.",
            link: "/apply",
            fbLink: "https://www.facebook.com/share/183AkUjHHc/"
          },
          {
            src: process.env.PUBLIC_URL + "/img/or.jpeg",
            name: "Career Development (ORCT)",
            subtitleAr: "تطوير المهارات المهنية",
            subtitleEn: "Career Development",
            descriptionAr: "تطوير المهارات المهنية. تؤهلك لسوق العمل من خلال تعلم المهارات الحياتية وكذلك التقنية.",
            descriptionEn: "Developing professional skills. It prepares you for the job market by teaching you both life skills and technical skills.",
            link: "/apply",
            fbLink: "https://www.facebook.com/share/17pnQLsmHo/"
          }
        ].map((item, idx) => (
          <div key={idx} className={`carousel-item ${activeIndex === idx + 1 ? 'active' : ''}`}
               style={{
                 display: activeIndex === idx + 1 ? 'block' : 'none',
                 height: '100%',
                 backgroundColor: '#f8f9fa'
               }}>
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="container text-center py-5">
                <div className="row align-items-center">
                  <div className="col-md-6 order-md-2">
                    <img src={item.src} className="img-fluid mb-4" alt={item.name} style={{maxHeight: '250px'}} />
                  </div>
                  <div className="col-md-6 order-md-1 text-md-end text-center">
                    <h1 className="display-4 fw-bold mb-3 text-dark">{item.name}</h1>
                    <h2 className="h3 text-primary fw-bold mb-4">
                      {/* التعديل البسيط هنا لربط النصوص الصح */}
                      <span className="lang-ar">{item.subtitleAr}</span>
                      <span className="lang-en">{item.subtitleEn}</span>
                    </h2>
                    <p className="lead text-muted mb-5 fs-5">
                      {/* التعديل البسيط هنا لربط النصوص الصح */}
                      <span className="lang-ar">{item.descriptionAr}</span>
                      <span className="lang-en">{item.descriptionEn}</span>
                    </p>
                    <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                      <Link to={item.link} className="btn btn-success btn-lg px-5 rounded-pill shadow-lg">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="lang-ar">ابدأ الآن</span>
                        <span className="lang-en">Start Now</span>
                      </Link>
                      <a href={item.fbLink} className="btn btn-primary btn-lg px-5 rounded-pill shadow-lg">
                        <i className="fab fa-facebook me-2"></i>
                        <span className="lang-ar">صفحتنا</span>
                        <span className="lang-en">Our Page</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {}
      <button className="carousel-control-prev" type="button" onClick={prevSlide} style={{ filter: 'invert(1)', width: '5%' }}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" onClick={nextSlide} style={{ filter: 'invert(1)', width: '5%' }}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </header>
  );
}
export default HeroSlider;