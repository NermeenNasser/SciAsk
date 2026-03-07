import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(localStorage.getItem('sciask_lang') || 'ar');
  const [theme, setTheme] = useState('light');

  const loadUser = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('sciask_user'));
      setUser(storedUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener('storage', loadUser);
    
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    const storedTheme = localStorage.getItem('sciask_theme');
    const appliedTheme = storedTheme || theme;
    setTheme(appliedTheme);
    document.documentElement.setAttribute('data-theme', appliedTheme);
    
    return () => {
      window.removeEventListener('storage', loadUser);
    };
  }, [lang]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('sciask_theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('data-lang', newLang);
    localStorage.setItem('sciask_lang', newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('sciask_user');
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top py-3 bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/img/logo.jpg" alt="SciAsk" height="50" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/">
                <span className="lang-ar">الرئيسية</span>
                <span className="lang-en">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/classroom">
                <span className="lang-ar">المنصة التعليمية</span>
                <span className="lang-en">LMS Platform</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold text-primary" to="/exams">
                <span className="lang-ar">الامتحانات</span>
                <span className="lang-en">Exams</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/volunteer">
                <span className="lang-ar">تطوع معنا</span>
                <span className="lang-en">Volunteer</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/news">
                <span className="lang-ar">آخر الأخبار</span>
                <span className="lang-en">Latest News</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/points">
                <span className="lang-ar">النقاط</span>
                <span className="lang-en">Points</span>
              </Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center">
              <button 
                onClick={toggleLanguage} 
                className="btn btn-sm btn-outline-secondary me-2 fw-bold" 
                title={lang === 'ar' ? 'Change Language to English' : 'تغيير اللغة للعربية'}
              >
                {lang === 'ar' ? 'EN' : 'AR'}
              </button>
              <button 
                onClick={toggleTheme} 
                className="btn btn-sm btn-outline-secondary me-3" 
                title={lang === 'ar' ? 'الوضع المضيء/المظلم' : 'Light/Dark Mode'}
              >
                {theme === 'light' ? '☀️' : '🌙'}
              </button>
            </div>
            
            {user ? (
              <div className="d-flex align-items-center">
                
                {/* الديزاين الجديد باستخدام Bootstrap جاهز ومضمون ظهوره */}
                <Link 
                  to="/profile" 
                  className="btn btn-outline-primary d-flex align-items-center px-4 py-2 rounded-pill mx-2 fw-bold shadow-sm"
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <span 
                    className="bg-success rounded-circle me-2" 
                    style={{ 
                      width: '10px', 
                      height: '10px', 
                      display: 'inline-block',
                      boxShadow: '0 0 8px rgba(25, 135, 84, 0.8)' 
                    }}
                  ></span>
                  {user.name.split(' ')[0]}
                </Link>
                
                {/* زرار تسجيل الخروج متناسق معاه */}
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                  style={{ width: '42px', height: '42px', transition: 'all 0.3s ease' }}
                  title={lang === 'ar' ? 'تسجيل خروج' : 'Logout'}
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
                
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary rounded-pill px-4 shadow-sm">
                <span className="lang-ar">دخول</span>
                <span className="lang-en">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;