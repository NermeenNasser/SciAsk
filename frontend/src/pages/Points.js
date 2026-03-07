import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/api';
import './Points.css';

function Points() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadUsers();
    const storedLang = localStorage.getItem('sciask_lang') || 'ar';
    const storedTheme = localStorage.getItem('sciask_theme') || 'light';
    setLang(storedLang);
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-lang', storedLang);
    document.documentElement.setAttribute('dir', storedLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await getAllUsers();
      // ترتيب الطلاب حسب النقاط تنازلياً
      const sortedUsers = Array.isArray(usersData) ? usersData.sort((a, b) => (b.points || 0) - (a.points || 0)) : [];
      setUsers(sortedUsers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('sciask_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('sciask_lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('data-lang', newLang);
  };

  const getRankIcon = (index) => {
    if (index === 0) return '🥇'; // ذهبي
    if (index === 1) return '🥈'; // فضي
    if (index === 2) return '🥉'; // برونزي
    return '';
  };

  if (loading) return <div className="text-center mt-5"><h3>⏳ {lang === 'ar' ? 'جاري تحميل البيانات...' : 'Loading data...'}</h3></div>;

  return (
    <div className="container py-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">{lang === 'ar' ? 'لوحة النقاط' : 'Points Leaderboard'}</h1>
        <div className="d-flex gap-2">
          <button onClick={toggleLanguage} className="btn btn-outline-primary">
            {lang === 'ar' ? 'EN' : 'عر'}
          </button>
          <button onClick={toggleTheme} className="btn btn-outline-secondary">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      <div className="row">
        {users.length > 0 ? users.map((user, index) => (
          <div key={user.id} className="col-md-6 col-lg-4 mb-4">
            <div className={`card h-100 shadow-sm ${index < 3 ? 'border-warning bg-light' : ''}`}>
              <div className="card-body text-center">
                <div className="mb-3">
                  {index < 3 && <span className="display-4">{getRankIcon(index)}</span>}
                  <img
                    src={user.profile_image && user.profile_image !== "default.png" ? user.profile_image : "/img/default.png"}
                    alt={user.name}
                    className="rounded-circle mb-3"
                    style={{width: '80px', height: '80px', objectFit: 'cover'}}
                  />
                </div>
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text text-muted">{user.track || (lang === 'ar' ? 'غير محدد' : 'Not specified')}</p>
                <p className="card-text text-muted">{user.university || (lang === 'ar' ? 'غير محدد' : 'Not specified')}</p>
                <div className="mt-3">
                  <h4 className="text-primary fw-bold">{user.points || 0} {lang === 'ar' ? 'نقطة' : 'Points'}</h4>
                  <small className="text-muted">{lang === 'ar' ? `المركز: ${index + 1}` : `Rank: ${index + 1}`}</small>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-12 text-center py-5">
            <h4 className="text-muted">{lang === 'ar' ? 'لا توجد بيانات متاحة' : 'No data available'}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Points;