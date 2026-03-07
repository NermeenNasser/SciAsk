import React, { useState, useEffect } from 'react';
import { getNews, deleteNews } from '../services/api';
import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('sciask_user'));
    setUser(storedUser);
    loadNews();
    const storedLang = localStorage.getItem('sciask_lang') || 'ar';
    const storedTheme = localStorage.getItem('sciask_theme') || 'light';
    setLang(storedLang);
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-lang', storedLang);
    document.documentElement.setAttribute('dir', storedLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const newsData = await getNews();
      setNews(Array.isArray(newsData) ? newsData : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm(lang === 'ar' ? "هل أنت متأكد من حذف هذا الخبر؟" : "Are you sure you want to delete this news?")) {
      try {
        const result = await deleteNews(id);
        if (result.success) {
          setNews(news.filter(n => n.id !== id));
          alert(lang === 'ar' ? "تم حذف الخبر بنجاح ✅" : "News deleted successfully ✅");
        } else {
          alert(lang === 'ar' ? "فشل الحذف" : "Deletion failed");
        }
      } catch (err) {
        console.error(err);
        alert(lang === 'ar' ? "حدث خطأ" : "An error occurred");
      }
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

  if (loading) return <div className="text-center mt-5"><h3>⏳ {lang === 'ar' ? 'جاري تحميل الأخبار...' : 'Loading news...'}</h3></div>;

  return (
    <div className="container py-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">{lang === 'ar' ? 'آخر الأخبار' : 'Latest News'}</h1>
        <div className="d-flex gap-2 align-items-center">
          <button onClick={toggleLanguage} className="btn btn-outline-primary">
            {lang === 'ar' ? 'EN' : 'عر'}
          </button>
          <button onClick={toggleTheme} className="btn btn-outline-secondary">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      <div className="row">
        {news.length > 0 ? news.map(item => (
          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              {item.image && (
                <img src={item.image} className="card-img-top" alt={item.title} style={{height: '200px', objectFit: 'cover'}} />
              )}
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted small">
                  {new Date(item.created_at).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                </p>
                <p className="card-text">{item.content.substring(0, 150)}...</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <button className="btn btn-primary btn-sm">
                  {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                </button>
                {user && user.role === 'admin' && (
                  <button onClick={() => handleDeleteNews(item.id)} className="btn btn-outline-danger btn-sm">
                    {lang === 'ar' ? 'حذف' : 'Delete'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="col-12 text-center py-5">
            <h4 className="text-muted">{lang === 'ar' ? 'لا توجد أخبار متاحة حالياً' : 'No news available at the moment'}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
