import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUserById, getLectures, addNewLecture, deleteLectureById } from '../services/api';
function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("");
  const [showLecturesTable, setShowLecturesTable] = useState(false);
  const [newLecture, setNewLecture] = useState({ title: '', link: '', track: 'URI' });
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('sciask_user'));
    if (!storedUser || storedUser.role !== 'admin') {
       setAdminName("Admin");
    } else {
      setAdminName(storedUser.name);
    }
    loadDashboardData();
  }, []);
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const usersData = await getAllUsers();
      const lecturesData = await getLectures();
      setUsers(Array.isArray(usersData) ? usersData : []);
      setLectures(Array.isArray(lecturesData) ? lecturesData : []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };
  const handleDeleteUser = async (id) => {
    if (window.confirm("حذف هذا الطالب؟")) {
      await deleteUserById(id);
      setUsers(users.filter(u => u.id !== id));
    }
  };
  const handleDeleteLecture = async (id) => {
    if (window.confirm("حذف هذه المحاضرة؟")) {
      await deleteLectureById(id);
      setLectures(lectures.filter(l => l.id !== id));
    }
  };
  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!newLecture.title || !newLecture.link) return alert("بيانات ناقصة");
    const res = await addNewLecture(newLecture);
    if (res && (res.id || res.success)) {
        setLectures([res, ...lectures]);
        setNewLecture({ title: '', link: '', track: 'URI' });
        alert("تم النشر!");
        setShowLecturesTable(true);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('sciask_user');
    navigate('/login');
  };
  if (loading) return <div className="text-center mt-5">جاري التحميل...</div>;
  return (
    <>
      <div className="container py-4" dir="rtl">
        {}
        <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-dark text-white rounded shadow">
          <div className="d-flex align-items-center">
            <h2 className="mb-0 ms-3">🛠️ لوحة التحكم</h2>
            {}
            <button onClick={() => navigate('/')} className="btn btn-outline-light btn-sm">
                🏠 الصفحة الرئيسية
            </button>
          </div>
          <div>
              <span className="me-3">{adminName}</span>
              <button onClick={handleLogout} className="btn btn-sm btn-danger">خروج</button>
          </div>
        </div>
        {}
        <div className="row mb-4 text-center">
          <div className="col-md-6" onClick={() => setShowLecturesTable(false)} style={{cursor: 'pointer'}}>
              <div className={`card p-3 shadow-sm ${!showLecturesTable ? 'border-primary bg-light' : ''}`}>
                  <h3 className="text-primary">{users.length}</h3>
                  <p>الطلاب</p>
              </div>
          </div>
          <div className="col-md-6" onClick={() => setShowLecturesTable(true)} style={{cursor: 'pointer'}}>
              <div className={`card p-3 shadow-sm ${showLecturesTable ? 'border-success bg-light' : ''}`}>
                  <h3 className="text-success">{lectures.length}</h3>
                  <p>المحاضرات</p>
              </div>
          </div>
        </div>
        <div className="row">
          {}
          <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm sticky-top" style={{top: '20px'}}>
                  <h5 className="mb-3">➕ إضافة محاضرة</h5>
                  <form onSubmit={handleAddLecture}>
                      <input className="form-control mb-2" placeholder="العنوان" value={newLecture.title} onChange={e => setNewLecture({...newLecture, title: e.target.value})} />
                      <input className="form-control mb-2" placeholder="الرابط" value={newLecture.link} onChange={e => setNewLecture({...newLecture, link: e.target.value})} />
                      <select className="form-select mb-2" value={newLecture.track} onChange={e => setNewLecture({...newLecture, track: e.target.value})}>
                          <option value="URI">URI</option>
                          <option value="URE">URE</option>
                          <option value="BMS">BMS</option>
                          <option value="URS">URS</option>
                          <option value="ORCT">ORCT</option>
                      </select>
                      <button className="btn btn-success w-100">نشر</button>
                  </form>
              </div>
          </div>
          {}
          <div className="col-md-8">
              <div className="card p-3 shadow-sm">
                  <h5 className="mb-3">{showLecturesTable ? "المحاضرات" : "الطلاب"}</h5>
                  <div className="table-responsive" style={{maxHeight: '500px', overflowY: 'auto'}}>
                      <table className="table table-hover">
                          <thead>
                              <tr>
                                  <th>{showLecturesTable ? 'العنوان' : 'الاسم'}</th>
                                  <th>{showLecturesTable ? 'المسار' : 'الايميل'}</th>
                                  <th>تحكم</th>
                              </tr>
                          </thead>
                          <tbody>
                              {showLecturesTable ? lectures.map(l => (
                                  <tr key={l.id}>
                                      <td>{l.title}</td>
                                      <td>{l.track}</td>
                                      <td><button className="btn btn-danger btn-sm" onClick={() => handleDeleteLecture(l.id)}>حذف</button></td>
                                  </tr>
                              )) : users.map(u => (
                                  <tr key={u.id}>
                                      <td>{u.name}</td>
                                      <td>{u.email}</td>
                                      <td><button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(u.id)}>حذف</button></td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;