import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUserById, getLectures, addNewLecture, deleteLectureById, updateUserPoints, getVolunteers, deleteVolunteerById, getNews, addNews, deleteNews, getExams, updateUserRole } from '../services/api';
import { universities } from '../data/universities';
import './Admin.css'; 
function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [news, setNews] = useState([]);
    const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("");
  const [lang, setLang] = useState('ar');
  const [theme, setTheme] = useState('light');
  const [currentView, setCurrentView] = useState(0);
  const [newLecture, setNewLecture] = useState({ title: '', link: '', track: 'URI' });
  const [newNews, setNewNews] = useState({ title: '', content: '', image: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', track: '', university: '', points: 0 });
  const [universityFilter, setUniversityFilter] = useState('');
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('sciask_user'));
    if (!storedUser || storedUser.role !== 'admin') {
       setAdminName(storedUser ? storedUser.name : "زائر");
    } else {
      setAdminName(storedUser.name);
    }
    loadDashboardData();
    const handleFocus = () => {
      loadDashboardData();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);
  
  // Get unique universities from users for filter
  const uniqueUniversities = [...new Set(users.map(u => u.university).filter(Boolean))].sort();
  
  // Filter users based on university selection
  const filteredUsers = universityFilter 
    ? users.filter(user => user.university === universityFilter)
    : users;

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const timestamp = Date.now();
      const usersData = await getAllUsers();
      const lecturesData = await getLectures();
      const volunteersData = await getVolunteers();
            const examsData = await getExams();
      const newsData = await getNews();
      setUsers(Array.isArray(usersData) ? usersData : []);
      setLectures(Array.isArray(lecturesData) ? lecturesData : []);
      setVolunteers(Array.isArray(volunteersData) ? volunteersData : []);
            setExams(Array.isArray(examsData) ? examsData : []);
      setNews(Array.isArray(newsData) ? newsData : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteUser = async (id) => {
    if (window.confirm("تحذير: هل أنت متأكد من حذف هذا المستخدم؟")) {
      const result = await deleteUserById(id);
      if (result.success) {
          setUsers(users.filter(user => user.id !== id));
      } else {
          alert("فشل الحذف: " + (result.message || "خطأ غير معروف"));
      }
    }
  };

  // ✅ دالة جديدة: تحويل الطالب إلى مسؤول
  const handleMakeAdmin = async (userId) => {
    if (window.confirm("⚠️ هل أنت متأكد من تحويل هذا الطالب إلى مسؤول؟")) {
      const result = await updateUserRole(userId, 'admin');
      if (result.success) {
        const updatedUsers = users.map(user =>
          user.id === userId ? { ...user, role: 'admin' } : user
        );
        setUsers(updatedUsers);
        alert("✅ تم تحويل الطالب إلى مسؤول بنجاح!");
      } else {
        alert("❌ فشل تحويل الطالب إلى مسؤول: " + (result.message || "خطأ غير معروف"));
      }
    }
  };

  const handleDeleteLecture = async (id) => {
    if (window.confirm("تنبيه: سيتم حذف المحاضرة نهائياً. هل أنت متأكد؟")) {
      const result = await deleteLectureById(id);
      if (result.success) {
          setLectures(lectures.filter(lec => lec.id !== id));
          alert("تم حذف المحاضرة بنجاح ✅");
      } else {
          alert("حدث خطأ أثناء الحذف ❌");
      }
    }
  };
  const handleDeleteVolunteer = async (id) => {
    if (window.confirm("تحذير: هل أنت متأكد من حذف هذا المتطوع؟")) {
      const result = await deleteVolunteerById(id);
      if (result.success) {
          setVolunteers(volunteers.filter(vol => vol.id !== id));
          alert("تم حذف المتطوع بنجاح ✅");
      } else {
          alert("فشل الحذف: " + (result.message || "خطأ غير معروف"));
      }
    }
  };
  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!newLecture.title || !newLecture.link) return alert("البيانات ناقصة!");
    const result = await addNewLecture(newLecture);
    if (result && result.id) {
        setLectures([result, ...lectures]); 
        setNewLecture({ title: '', link: '', track: 'URI' }); 
        alert("تمت الإضافة بنجاح! 🎉");
        setCurrentView(1); 
    }
  };
  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!newNews.title || !newNews.content) return alert("البيانات ناقصة!");
    const result = await addNews(newNews);
    if (result && result.id) {
        setNews([result, ...news]); 
        setNewNews({ title: '', content: '', image: '' }); 
        alert("تمت إضافة الخبر بنجاح! 🎉");
        setCurrentView(3); 
    }
  };
  const handleDeleteNews = async (id) => {
    if (window.confirm("تنبيه: سيتم حذف الخبر نهائياً. هل أنت متأكد؟")) {
      const result = await deleteNews(id);
      if (result.success) {
          setNews(news.filter(n => n.id !== id));
          alert("تم حذف الخبر بنجاح ✅");
      } else {
          alert("حدث خطأ أثناء الحذف ❌");
      }
    }
  };
  const handleEditPoints = async (userId, newPoints) => {
    const result = await updateUserPoints(users.find(u => u.id === userId).email, parseInt(newPoints));
    if (result.success) {
      setUsers(users.map(user =>
        user.id === userId ? { ...user, points: parseInt(newPoints) } : user
      ));
      alert("تم تحديث النقاط بنجاح ✅");
    } else {
      alert("فشل في تحديث النقاط ❌");
    }
  };
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
    navigate('/login');
  };
  if (loading) return <div className="text-center mt-5"><h3>⏳ جاري تحميل البيانات...</h3></div>;
  return (
    <div className="container py-4" dir="rtl">
      {}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-dark text-white rounded shadow">
        <h2 className="mb-0">🛠️ لوحة التحكم</h2>
        <div>
            <span className="me-3">مرحباً، {adminName}</span>
            <button onClick={() => navigate('/')} className="btn btn-sm btn-primary me-2">الصفحة الرئيسية</button>
            <button onClick={handleLogout} className="btn btn-sm btn-danger">خروج</button>
        </div>
      </div>
      {}
      <div className="row mb-4 text-center">
        {}
        <div className="col-md-3 mb-2">
            <div
                onClick={() => setCurrentView(0)}
                className={`card p-3 shadow-sm ${currentView === 0 ? 'border-primary bg-primary text-white' : 'bg-light'}`}
                style={{cursor: 'pointer', transition: '0.3s'}}
            >
                <h3>{users.length}</h3>
                <p className="mb-0 fw-bold">👨‍🎓 عرض الطلاب</p>
            </div>
        </div>
        {}
        <div className="col-md-3 mb-2">
            <div
                onClick={() => setCurrentView(1)}
                className={`card p-3 shadow-sm ${currentView === 1 ? 'border-success bg-success text-white' : 'bg-light'}`}
                style={{cursor: 'pointer', transition: '0.3s'}}
            >
                <h3>{lectures.length}</h3>
                <p className="mb-0 fw-bold">📹 عرض المحاضرات</p>
            </div>
        </div>
        <div className="col-md-3 mb-2">
            <div
                onClick={() => navigate('/admin/exams')}
                className={`card p-3 shadow-sm bg-light`}
                style={{cursor: 'pointer', transition: '0.3s'}}
            >
                <h3>{exams.length}</h3>
                <p className="mb-0 fw-bold">📝 إدارة الامتحانات</p>
            </div>
        </div>
        {}
        <div className="col-md-3 mb-2">
            <div
                onClick={() => setCurrentView(2)}
                className={`card p-3 shadow-sm ${currentView === 2 ? 'border-danger bg-danger text-white' : 'bg-light'}`}
                style={{cursor: 'pointer', transition: '0.3s'}}
            >
                <h3>{volunteers.length}</h3>
                <p className="mb-0 fw-bold">🤝 عرض المتطوعين</p>
            </div>
        </div>
        {}
        <div className="col-md-3 mb-2">
            <div
                onClick={() => setCurrentView(3)}
                className={`card p-3 shadow-sm ${currentView === 3 ? 'border-info bg-info text-white' : 'bg-light'}`}
                style={{cursor: 'pointer', transition: '0.3s'}}
            >
                <h3>📰</h3>
                <p className="mb-0 fw-bold">إدارة الأخبار</p>
            </div>
        </div>
      </div>
      <div className="row">
        {}
        <div className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm sticky-top" style={{top: '20px'}}>
                <h5 className="mb-3 text-primary">
                    {currentView === 0 ? "👨‍🎓 تعديل الطلاب" :
                     currentView === 1 ? "➕ نشر محاضرة جديدة" :
                     currentView === 2 ? "🤝 إدارة المتطوعين" :
                     "📰 نشر خبر جديد"}
                </h5>
                {currentView === 1 ? (
                    <form onSubmit={handleAddLecture}>
                        <div className="mb-2">
                            <label className="small text-muted">عنوان المحاضرة</label>
                            <input className="form-control" value={newLecture.title} onChange={e => setNewLecture({...newLecture, title: e.target.value})} />
                        </div>
                        <div className="mb-2">
                            <label className="small text-muted">رابط الفيديو (Link)</label>
                            <input className="form-control" value={newLecture.link} onChange={e => setNewLecture({...newLecture, link: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label className="small text-muted">المسار (Track)</label>
                            <select className="form-select" value={newLecture.track} onChange={e => setNewLecture({...newLecture, track: e.target.value})}>
                                <option value="URI">URI - بحث علمي</option>
                                <option value="URE">URE - ريادة أعمال</option>
                                <option value="BMS">BMS - بيزنس</option>
                                <option value="URS">URS - منح</option>
                            </select>
                        </div>
                        <button className="btn btn-primary w-100 fw-bold">نشر الآن</button>
                    </form>
                ) : currentView === 3 ? (
                    <form onSubmit={handleAddNews}>
                        <div className="mb-2">
                            <label className="small text-muted">عنوان الخبر</label>
                            <input className="form-control" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} />
                        </div>
                        <div className="mb-2">
                            <label className="small text-muted">محتوى الخبر</label>
                            <textarea className="form-control" rows="4" value={newNews.content} onChange={e => setNewNews({...newNews, content: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label className="small text-muted">رابط الصورة (اختياري)</label>
                            <input className="form-control" value={newNews.image} onChange={e => setNewNews({...newNews, image: e.target.value})} />
                        </div>
                        <button className="btn btn-info w-100 fw-bold">نشر الخبر</button>
                    </form>
                ) : (
                    <p className="text-muted">اختر عرض لإدارته</p>
                )}
            </div>
        </div>
        {}
        <div className="col-md-8">
            <div className="card p-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">
                        {currentView === 0 ? "👨‍🎓 قائمة الطلاب المسجلين" :
                         currentView === 1 ? "📹 قائمة المحاضرات المنشورة" :
                         currentView === 2 ? "🤝 قائمة المتطوعين المسجلين" :
                         "📰 قائمة الأخبار المنشورة"}
                    </h5>
                    <div className="d-flex align-items-center gap-2">
                        {currentView === 0 && (
                            <select 
                                className="form-select form-select-sm" 
                                style={{width: '200px'}}
                                value={universityFilter}
                                onChange={(e) => setUniversityFilter(e.target.value)}
                            >
                                <option value="">كل الجامعات</option>
                                {uniqueUniversities.map(uni => (
                                    <option key={uni} value={uni}>{uni}</option>
                                ))}
                            </select>
                        )}
                        <span className="badge bg-secondary">
                            العدد: {currentView === 0 ? filteredUsers.length : currentView === 1 ? lectures.length : currentView === 2 ? volunteers.length : news.length}
                        </span>
                    </div>
                </div>
                <div className="table-responsive" style={{maxHeight: '500px', overflowY: 'auto'}}>
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            {currentView === 0 ? (
                                <tr>
                                    <th>الاسم</th>
                                    <th>الإيميل</th>
                                    <th>المسار</th>
                                    <th>الجامعة</th>
                                    <th>النقاط</th>
                                    <th>تعديل</th>
                                    <th>جعل مسؤول</th>
                                    <th>حذف</th>
                                </tr>
                            ) : currentView === 1 ? (
                                <tr>
                                    <th>العنوان</th>
                                    <th>المسار</th>
                                    <th>الرابط</th>
                                    <th>حذف</th>
                                </tr>
                            ) : currentView === 2 ? (
                                <tr>
                                    <th>الاسم</th>
                                    <th>الإيميل</th>
                                    <th>الهاتف</th>
                                    <th>الجامعة</th>
                                    <th>المبادرة</th>
                                    <th>تاريخ التسجيل</th>
                                    <th>حذف</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th>العنوان</th>
                                    <th>المحتوى</th>
                                    <th>تاريخ النشر</th>
                                    <th>حذف</th>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {currentView === 0 ? (
                                filteredUsers.length > 0 ? filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td className="small">{user.email}</td>
                                        <td>{user.track || '-'}</td>
                                        <td>{user.university || '-'}</td>
                                        <td>
                                            {editingUser === user.id ? (
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    value={editForm.points}
                                                    onChange={(e) => setEditForm({...editForm, points: e.target.value})}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleEditPoints(user.id, editForm.points);
                                                            setEditingUser(null);
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <span className="badge bg-warning text-dark">{user.points || 0}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingUser === user.id ? (
                                                <div className="btn-group btn-group-sm">
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => {
                                                            handleEditPoints(user.id, editForm.points);
                                                            setEditingUser(null);
                                                        }}
                                                    >
                                                        حفظ
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => setEditingUser(null)}
                                                    >
                                                        إلغاء
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => {
                                                        setEditingUser(user.id);
                                                        setEditForm({ ...user });
                                                    }}
                                                >
                                                    تعديل
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            {user.role === 'admin' ? (
                                                <span className="badge bg-success">مسؤول ✓</span>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-outline-warning"
                                                    onClick={() => handleMakeAdmin(user.id)}
                                                    title="جعل هذا الطالب مسؤول"
                                                >
                                                    👑 جعل مسؤول
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                حذف
                                            </button>
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan="8" className="text-center py-3 text-muted">لا يوجد طلاب مسجلين.</td></tr>
                            ) : currentView === 1 ? (
                                lectures.length > 0 ? lectures.map(lec => (
                                    <tr key={lec.id}>
                                        <td className="fw-bold">{lec.title}</td>
                                        <td><span className="badge bg-info text-dark">{lec.track}</span></td>
                                        <td>
                                            <a href={lec.link} target="_blank" rel="noreferrer" className="text-primary text-decoration-none">
                                                فتح الرابط 🔗
                                            </a>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDeleteLecture(lec.id)}
                                                title="حذف المحاضرة"
                                            >
                                                🗑️ مسح
                                            </button>
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan="4" className="text-center py-3 text-muted">لا توجد محاضرات، ابدأي بإضافة واحدة!</td></tr>
                            ) : currentView === 2 ? (
                                volunteers.length > 0 ? volunteers.map(vol => (
                                    <tr key={vol.id}>
                                        <td className="fw-bold">{vol.name}</td>
                                        <td className="small">{vol.email}</td>
                                        <td>{vol.phone}</td>
                                        <td>{vol.university} - {vol.faculty}</td>
                                        <td><span className="badge bg-success">{vol.initiative}</span></td>
                                        <td className="small">{new Date(vol.submitted_at).toLocaleDateString('ar-EG')}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDeleteVolunteer(vol.id)}
                                                title="حذف المتطوع"
                                            >
                                                🗑️ مسح
                                            </button>
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan="7" className="text-center py-3 text-muted">لا يوجد متطوعين مسجلين.</td></tr>
                            ) : (
                                news.length > 0 ? news.map(item => (
                                    <tr key={item.id}>
                                        <td className="fw-bold">{item.title}</td>
                                        <td className="small">{item.content.substring(0, 50)}...</td>
                                        <td className="small">{new Date(item.created_at).toLocaleDateString('ar-EG')}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDeleteNews(item.id)}
                                                title="حذف الخبر"
                                            >
                                                🗑️ مسح
                                            </button>
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan="4" className="text-center py-3 text-muted">لا توجد أخبار، ابدأ بإضافة واحدة!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;