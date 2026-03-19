import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { submitVolunteerApplication } from '../services/api';
import './Volunteer.css';
function Volunteer() {
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      university: e.target.university.value,
      faculty: e.target.university.value, 
      initiative: e.target.initiative.value
    };
    try {
      const result = await submitVolunteerApplication(formData);
      if (result.success) {
        alert("شكراً لك! تم استلام طلب التطوع بنجاح وسيتم التواصل معك قريباً.");
        e.target.reset(); 
      } else {
        alert("حدث خطأ: " + (result.message || "فشل في الإرسال"));
      }
    } catch (error) {
      console.error("Error submitting volunteer application:", error);
      alert("حدث خطأ في الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="volunteer-page-container">
      {}
      <div className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow p-4 volunteer-card">
              <h2 className="text-center text-primary mb-4 fw-bold">
                <span className="lang-ar">استمارة التطوع</span>
                <span className="lang-en">Volunteer Application Form</span>
              </h2>
              <p className="text-center text-muted mb-4">
                <span className="lang-ar">انضم لعائلة SciAsk وشاركنا في نشر العلم والمعرفة.</span>
                <span className="lang-en">Join the SciAsk family and help us spread science and knowledge.</span>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    <span className="lang-ar">الاسم الكامل</span>
                    <span className="lang-en">Full Name</span>
                  </label>
                  <input type="text" name="name" className="form-control" required placeholder="ادخل اسمك هنا" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    <span className="lang-ar">البريد الإلكتروني</span>
                    <span className="lang-en">Email Address</span>
                  </label>
                  <input type="email" name="email" className="form-control" required placeholder="example@gmail.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    <span className="lang-ar">رقم الهاتف</span>
                    <span className="lang-en">Phone Number</span>
                  </label>
                  <input type="tel" name="phone" className="form-control" required placeholder="01xxxxxxxxx" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    <span className="lang-ar">الكلية / الجامعة</span>
                    <span className="lang-en">Faculty / University</span>
                  </label>
                  <input type="text" name="university" className="form-control" required placeholder="مثال: كلية العلوم - جامعة القاهرة" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    <span className="lang-ar">المستوي / الفرقة</span>
                    <span className="lang-en"> Level / Band </span>
                  </label>
                                    <input type="text" name="university" className="form-control" required placeholder="مثال: الفرقة الثالثة" />

                  </div>
                  <div className="mb-3">
                  <label className="form-label fw-bold">
                    <span className="lang-ar"> التخصص </span>
                    <span className="lang-en"> Specialization </span>
                  </label>
                                    <input type="text" name="university" className="form-control" required placeholder="مثال الكمياء" />

                  </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    <span className="lang-ar">اللجنة التي ترغب بالتطوع فيها</span>
                    <span className="lang-en">Committee you want to volunteer for</span>
                  </label>
                  <select name="initiative" className="form-select" required>
                    <option value="Organization">
                      <span className="lang-ar">لجنة التنظيم</span>
                      <span className="lang-en">Organization Committee</span>
                    </option>
                    <option value="Relations">
                      <span className="lang-ar">لجنة العلاقات</span>
                      <span className="lang-en">Relations Committee</span>
                    </option>
                    <option value="Media">
                      <span className="lang-ar">لجنة الميديا</span>
                      <span className="lang-en">Media Committee</span>
                    </option>
                    <option value="Design">
                      <span className="lang-ar">لجنة التصميم</span>
                      <span className="lang-en">Design Committee</span>
                    </option>
                  </select>
                </div>
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg fw-bold shadow-sm">
                    <span className="lang-ar">إرسال الطلب</span>
                    <span className="lang-en">Send Request</span>
                    <i className="fas fa-paper-plane ms-2"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
export default Volunteer;