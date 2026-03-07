import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Apply.css';
import { universities } from '../data/universities';
import { register } from '../services/api';

function Apply() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    faculty: '', 
    tracks: [],
    password: ''
  });

  const [otherUniversity, setOtherUniversity] = useState('');

  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('data-lang', newLang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('dir', 'rtl');
  }, [lang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'university' && value === 'other') {
      setFormData({ ...formData, [name]: 'أخرى' });
    } else if (name === 'otherUniversity') {
      setFormData({ ...formData, university: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTrackChange = (e) => {
    const track = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setFormData({ ...formData, tracks: [...formData.tracks, track] });
    } else {
      setFormData({ ...formData, tracks: formData.tracks.filter(t => t !== track) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!formData.name || !formData.email || !formData.password) {
      alert('❌ يرجى ملء جميع الحقول المطلوبة');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      alert('❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      
      if (result.success) {
        alert('✅ تم التسجيل بنجاح! جاري التوجيه لتسجيل الدخول...');
        setLoading(false);
        navigate('/login');
        return;
      } else {
        alert('❌ ' + (result.message || 'حدث خطأ في التسجيل'));
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('❌ تعذر الاتصال بالخادم. تأكد من:\n1. تشغيل XAMPP\n2. تشغيل Apache و MySQL');
      setLoading(false);
    }
  };

  return (
    <div className="apply-page-container">
      <div className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0 rounded-4">
              <div className="card-header-custom text-center">
                <h3 className="fw-bold mb-0">إنشاء حساب جديد</h3>
                <p className="mb-0 opacity-75">سجل بياناتك للانضمام لمجتمع SciAsk</p>
              </div>
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <h5 className="text-primary fw-bold mb-3">
                    <i className="fas fa-user me-2"></i>
                    البيانات الشخصية
                  </h5>
                  
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">الاسم رباعي</label>
                      <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">البريد الإلكتروني</label>
                      <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">رقم الهاتف</label>
                      <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">الجامعة</label>
                      <select 
                        name="university" 
                        className="form-select" 
                        value={formData.university} 
                        onChange={handleChange} 
                        required
                      >
                        <option value="">-- اختر الجامعة --</option>
                        <optgroup label="الجامعات الحكومية">
                          {universities.government.map(uni => (
                            <option key={uni.id} value={uni.name}>{uni.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="الجامعات الأهلية">
                          {universities.national.map(uni => (
                            <option key={uni.id} value={uni.name}>{uni.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="الجامعات الخاصة">
                          {universities.private.map(uni => (
                            <option key={uni.id} value={uni.name}>{uni.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="فروع جامعات دولية">
                          {universities.international.map(uni => (
                            <option key={uni.id} value={uni.name}>{uni.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="جامعات ذات طبيعة خاصة">
                          {universities.special.map(uni => (
                            <option key={uni.id} value={uni.name}>{uni.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="مؤسسات تعليمية باتفاقيات دولية">
                          {universities.agreements.map(uni => (
                            <option key={uni.id} value={uni.name}>{uni.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="جامعات عربية">
                          {universities.arab.map(uni => (
                            <option key={uni.id} value={uni.name}>{uni.name}</option>
                          ))}
                        </optgroup>
                        <option value="other">أخرى</option>
                      </select>
                      {formData.university === 'أخرى' && (
                        <input 
                          type="text" 
                          name="otherUniversity" 
                          className="form-control mt-2" 
                          placeholder="اكتب اسم الجامعة"
                          value={otherUniversity} 
                          onChange={handleChange}
                          required
                        />
                      )}
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">الكلية</label>
                      <input type="text" name="faculty" className="form-control" value={formData.faculty} onChange={handleChange} required />
                    </div>
                  </div>

                  <h5 className="text-primary fw-bold mb-3">
                    <i className="fas fa-list-check me-2"></i>
                    تفضيلات الحساب
                  </h5>
                  
                  <div className="mb-4">
                    <label className="form-label fw-bold">المسارات المفضلة (اختياري):</label>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="track-uri" 
                            value="URI Scientific Research"
                            checked={formData.tracks.includes("URI Scientific Research")}
                            onChange={handleTrackChange}
                          />
                          <label className="form-check-label" htmlFor="track-uri">URI - البحث العلمي</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="track-ure" 
                            value="URE Entrepreneurship"
                            checked={formData.tracks.includes("URE Entrepreneurship")}
                            onChange={handleTrackChange}
                          />
                          <label className="form-check-label" htmlFor="track-ure">URE - ريادة الأعمال</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="track-urs" 
                            value="URS Scholarships"
                            checked={formData.tracks.includes("URS Scholarships")}
                            onChange={handleTrackChange}
                          />
                          <label className="form-check-label" htmlFor="track-urs">URS - المنح الدراسية</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="track-bms" 
                            value="BMS Business"
                            checked={formData.tracks.includes("BMS Business")}
                            onChange={handleTrackChange}
                          />
                          <label className="form-check-label" htmlFor="track-bms">BMS - كلية الأعمال</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="track-orct" 
                            value="ORCT Career"
                            checked={formData.tracks.includes("ORCT Career")}
                            onChange={handleTrackChange}
                          />
                          <label className="form-check-label" htmlFor="track-orct">ORCT - تطوير المسار المهني</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">كلمة المرور</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-success btn-lg fw-bold rounded-pill" disabled={loading}>
                      {loading ? (
                        <>
                           <i className="fas fa-spinner fa-spin me-2"></i>
                           جاري التسجيل...
                        </>
                      ) : (
                        <>
                           إنشاء الحساب
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <p className="mb-0">&copy; 2025 SciAsk. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}

export default Apply;
