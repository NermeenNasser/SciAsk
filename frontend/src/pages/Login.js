import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login as apiLogin } from '../services/api';
import './Apply.css'; 

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await apiLogin(formData);
      
      if (result.success) {
        localStorage.setItem('sciask_user', JSON.stringify(result.user));
        alert('✅ تم تسجيل الدخول بنجاح!');
        
        // Reload to update Navbar
        window.location.reload();
      } else {
        setError(result.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('❌ تعذر الاتصال بالخادم. تأكد من:\n1. تشغيل XAMPP\n2. تشغيل Apache و MySQL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-page-container">
      <div className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow border-0 rounded-4">
              <div className="card-header-custom text-center">
                <h3 className="fw-bold mb-0">تسجيل الدخول</h3>
                <p className="mb-0 opacity-75">أهلاً بك مجدداً في SciAsk</p>
              </div>
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      name="email" 
                      className="form-control" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">كلمة المرور</label>
                    <input 
                      type="password" 
                      name="password" 
                      className="form-control" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  {error && (
                    <div className="alert alert-danger text-center" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary btn-lg fw-bold rounded-pill" disabled={loading}>
                      {loading ? 'جاري التحقق...' : 'دخول'}
                    </button>
                  </div>
                  <div className="text-center">
                    <small>ليس لديك حساب؟ <Link to="/apply">أنشئ حساب جديد</Link></small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
