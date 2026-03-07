import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../services/api';
import '../App.css';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(localStorage.getItem('sciask_lang') || 'ar');

  const translations = {
    ar: {
      points: "النقاط",
      courses: "الكورسات",
      achievements: "الإنجازات",
      activity: "النشاطات",
      logout: "تسجيل خروج",
      adminPanel: "الذهاب للوحة التحكم",
      unspecified: "غير محدد",
      general: "عام",
      student: "طالب",
      university: "الجامعة",
      major: "التخصص",
      track: "المسار",
      member: "عضو منذ",
      email: "البريد الإلكتروني",
      profile: "الملف الشخصي",
      editProfile: "تعديل الملف",
      settings: "الإعدادات",
      notifications: "الإشعارات",
      darkMode: "الوضع الليلي",
      lightMode: "الوضع النهاري",
      welcome: "مرحباً",
      totalPoints: "مجموع النقاط",
      completedCourses: "الكورسات المكتملة",
      certificates: "الشهادات",
      examsPassed: "الامتحانات المجتازة",
      rank: "الترتيب",
      level: "المستوى",
      bronze: "برونزي",
      silver: "فضي",
      gold: "ذهبي",
      diamond: "ماسي",
      refresh: "تحديث"
    },
    en: {
      points: "Points",
      courses: "Courses",
      achievements: "Achievements",
      activity: "Activity",
      logout: "Logout",
      adminPanel: "Go to Admin Panel",
      unspecified: "Not Specified",
      general: "General",
      student: "Student",
      university: "University",
      major: "Major",
      track: "Track",
      member: "Member since",
      email: "Email",
      profile: "Profile",
      editProfile: "Edit Profile",
      settings: "Settings",
      notifications: "Notifications",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      welcome: "Welcome",
      totalPoints: "Total Points",
      completedCourses: "Completed Courses",
      certificates: "Certificates",
      examsPassed: "Exams Passed",
      rank: "Rank",
      level: "Level",
      bronze: "Bronze",
      silver: "Silver",
      gold: "Gold",
      diamond: "Diamond",
      refresh: "Refresh"
    }
  };

  const t = translations[lang === 'ar' ? 'ar' : 'en'];

  useEffect(() => {
    const updateLayout = () => {
      const currentLang = localStorage.getItem('sciask_lang') || 'ar';
      setLang(currentLang);
      document.documentElement.setAttribute('data-lang', currentLang);
      document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    };

    updateLayout();
    loadUserData();

    window.addEventListener('storage', updateLayout);
    const interval = setInterval(updateLayout, 500);

    return () => {
      window.removeEventListener('storage', updateLayout);
      clearInterval(interval);
    };
  }, []);

  const loadUserData = async () => {
    const storedUser = JSON.parse(localStorage.getItem('sciask_user'));
    if (!storedUser) {
      navigate('/login');
      return;
    }
    try {
      const users = await getAllUsers();
      const currentUser = users.find(u => u.email === storedUser.email);
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('sciask_user', JSON.stringify(currentUser));
      } else {
        setUser(storedUser);
      }
    } catch (error) {
      setUser(storedUser);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sciask_user');
    navigate('/login');
  };

  const getLevelColor = (points) => {
    if (points >= 1000) return { color: '#3498db', level: t.diamond, icon: '💎' };
    if (points >= 500) return { color: '#f39c12', level: t.gold, icon: '🥇' };
    if (points >= 200) return { color: '#95a5a6', level: t.silver, icon: '🥈' };
    return { color: '#cd7f32', level: t.bronze, icon: '🥉' };
  };

  const getAvatarColor = (name) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (!user) return null;

  const userLevel = getLevelColor(user.points || 0);

  return (
    <div className="profile-page-container">
      {/* Background Shapes */}
      <div className="bg-shape bg-shape-1"></div>
      <div className="bg-shape bg-shape-2"></div>
      <div className="bg-shape bg-shape-3"></div>

      <div className="container py-5">
        {/* Header Profile Card */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <div className="profile-header-card">
              <div className="profile-cover"></div>
              <div className="profile-header-content">
                <div className="avatar-container">
                  <div 
                    className="avatar" 
                    style={{ background: getAvatarColor(user.name) }}
                  >
                    {getInitials(user.name)}
                  </div>
                  <div 
                    className="level-badge" 
                    style={{ background: userLevel.color }}
                    title={userLevel.level}
                  >
                    {userLevel.icon}
                  </div>
                </div>
                
                <div className="profile-info">
                  <h1 className="profile-name">{user.name}</h1>
                  <p className="profile-email">
                    <i className="fas fa-envelope"></i>
                    {user.email}
                  </p>
                  
                  <div className="profile-badges">
                    <span className="badge-item badge-role">
                      <i className="fas fa-user-shield"></i>
                      {user.role === 'admin' ? 'Admin' : t.student}
                    </span>
                    <span className="badge-item badge-track">
                      <i className="fas fa-route"></i>
                      {user.track || t.general}
                    </span>
                    <span className="badge-item badge-university">
                      <i className="fas fa-university"></i>
                      {user.university || t.unspecified}
                    </span>
                  </div>
                </div>

                <div className="profile-actions">
                  {user.role === 'admin' && (
                    <button 
                      onClick={() => navigate('/admin')} 
                      className="btn btn-admin"
                    >
                      <i className="fas fa-cog"></i>
                      {t.adminPanel}
                    </button>
                  )}
                  <button 
                    onClick={loadUserData} 
                    className="btn btn-refresh"
                    title={t.refresh}
                  >
                    <i className="fas fa-sync-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <div className="stats-grid">
              <div className="stat-card glass-card">
                <div className="stat-icon stat-icon-points">
                  <i className="fas fa-star"></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{user.points || 0}</h3>
                  <p className="stat-label">{t.totalPoints}</p>
                </div>
                <div className="stat-progress">
                  <div 
                    className="stat-progress-bar" 
                    style={{ width: `${Math.min((user.points || 0) / 10, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="stat-card glass-card">
                <div className="stat-icon stat-icon-courses">
                  <i className="fas fa-book-open"></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">0</h3>
                  <p className="stat-label">{t.completedCourses}</p>
                </div>
              </div>

              <div className="stat-card glass-card">
                <div className="stat-icon stat-icon-certificates">
                  <i className="fas fa-certificate"></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">0</h3>
                  <p className="stat-label">{t.certificates}</p>
                </div>
              </div>

              <div className="stat-card glass-card">
                <div className="stat-icon stat-icon-exams">
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">0</h3>
                  <p className="stat-label">{t.examsPassed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards Row */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row g-4">
              {/* University Info */}
              <div className="col-md-6">
                <div className="info-card glass-card">
                  <div className="info-card-header">
                    <i className="fas fa-graduation-cap"></i>
                    <h4>{t.university}</h4>
                  </div>
                  <div className="info-card-body">
                    <p className="info-value">
                      <i className="fas fa-university"></i>
                      {user.university || t.unspecified}
                    </p>
                    {user.major && (
                      <p className="info-value">
                        <i className="fas fa-bookmark"></i>
                        {user.major}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="col-md-6">
                <div className="info-card glass-card">
                  <div className="info-card-header">
                    <i className="fas fa-user-circle"></i>
                    <h4>{t.profile}</h4>
                  </div>
                  <div className="info-card-body">
                    <p className="info-value">
                      <i className="fas fa-envelope"></i>
                      {user.email}
                    </p>
                    <p className="info-value">
                      <i className="fas fa-calendar-alt"></i>
                      {t.member}: {new Date().getFullYear()}
                    </p>
                    <p className="info-value">
                      <i className="fas fa-level-up-alt"></i>
                      {t.level}: <span style={{ color: userLevel.color }}>{userLevel.level}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="row justify-content-center mt-4">
          <div className="col-lg-10 text-center">
            <button 
              onClick={handleLogout} 
              className="btn btn-logout rounded-pill"
            >
              <i className="fas fa-sign-out-alt"></i>
              {t.logout}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

