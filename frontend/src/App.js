import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Apply from './pages/Apply';
import Profile from './pages/Profile';
import Volunteer from './pages/Volunteer';
import ApplicantDashboard from './pages/ApplicantDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminExamManagement from './pages/AdminExamManagement';
import StudentExams from './pages/StudentExams';
import Classroom from './pages/Classroom';
import BMS from './pages/BMS';        
import URS from './pages/URS';        
import ORCT from './pages/ORCT';      
import Challenge from './pages/Challenge'; 
import URI from './pages/URI';        
import URE from './pages/URE';
import News from './pages/News';
import Points from './pages/Points';        

// ✅ دالة تهيئة البيانات المحلية
const initializeLocalStorage = () => {
  // تهيئة قاعدة بيانات المستخدمين
  if (!localStorage.getItem('sciask_users_db')) {
    const defaultUsers = [
      { 
        id: 1, 
        name: "Admin User", 
        email: "admin@sciask.com", 
        password: "admin123", 
        role: "admin", 
        university: "SciAsk", 
        track: "Admin", 
        points: 1000, 
        profile_image: '' 
      },
      { 
        id: 2, 
        name: "Test Student", 
        email: "nasser@example.com", 
        password: "test123", 
        role: "student", 
        university: "Cairo University", 
        track: "URE", 
        points: 150, 
        profile_image: '' 
      }
    ];
    localStorage.setItem('sciask_users_db', JSON.stringify(defaultUsers));
  }

  // تهيئة قواعد البيانات الأخرى (فارغة في البداية)
  if (!localStorage.getItem('sciask_lectures_db')) localStorage.setItem('sciask_lectures_db', JSON.stringify([]));
  if (!localStorage.getItem('sciask_exams_db')) localStorage.setItem('sciask_exams_db', JSON.stringify([]));
  if (!localStorage.getItem('sciask_questions_db')) localStorage.setItem('sciask_questions_db', JSON.stringify([]));
  if (!localStorage.getItem('sciask_exam_attempts_db')) localStorage.setItem('sciask_exam_attempts_db', JSON.stringify([]));
  if (!localStorage.getItem('sciask_news_db')) localStorage.setItem('sciask_news_db', JSON.stringify([]));
  if (!localStorage.getItem('sciask_volunteers_db')) localStorage.setItem('sciask_volunteers_db', JSON.stringify([]));
  if (!localStorage.getItem('sciask_progress_db')) localStorage.setItem('sciask_progress_db', JSON.stringify([]));
};

function App() {
  // تهيئة localStorage عند تحميل التطبيق
  React.useEffect(() => {
    initializeLocalStorage();
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {}
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          {}
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/profile" element={<Profile />} />
          {}
          {}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/exams" element={<AdminExamManagement />} />
          {}
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/classroom.html" element={<Classroom />} />
          {}
          {}
          <Route path="/bms" element={<BMS />} />
          <Route path="/bms.html" element={<BMS />} />
          {}
          <Route path="/urs" element={<URS />} />
          <Route path="/urs.html" element={<URS />} />
          <Route path="/scholarships.html" element={<URS />} />
          {}
          <Route path="/orct" element={<ORCT />} />
          <Route path="/orct.html" element={<ORCT />} />
          {}
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/challenge.html" element={<Challenge />} />
          {}
          <Route path="/uri" element={<URI />} />
          <Route path="/uri.html" element={<URI />} />
          {}
          <Route path="/ure" element={<URE />} />
          <Route path="/ure.html" element={<URE />} />
          <Route path="/entrepreneurship.html" element={<URE />} />
          {}
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/volunteer.html" element={<Volunteer />} />
          <Route path="/news" element={<News />} />
          <Route path="/points" element={<Points />} />
          <Route path="/applicant_dashboard" element={<ApplicantDashboard />} />
          <Route path="/applicant_dashboard.html" element={<ApplicantDashboard />} />
          <Route path="/exams" element={<StudentExams />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;