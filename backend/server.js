const path = require('path'); //د
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express(); 
const PORT = process.env.PORT || 4000; 

app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new Database(path.join(__dirname, 'sciask.db'));  

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    university TEXT,
    faculty TEXT,
    tracks TEXT,
    password TEXT NOT NULL,
    points INTEGER DEFAULT 0,
    role TEXT DEFAULT 'student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS lectures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    link TEXT NOT NULL,
    track TEXT DEFAULT 'URI',
    date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    lecture_id INTEGER NOT NULL,
    completed INTEGER DEFAULT 1,
    completed_at TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS volunteers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    university TEXT,
    faculty TEXT,
    initiative TEXT,
    submitted_at TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    track TEXT DEFAULT 'URI',
    duration INTEGER DEFAULT 60,
    created_at TEXT,
    created_at_full DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    option_a TEXT,
    option_b TEXT,
    option_c TEXT,
    option_d TEXT,
    correct_answer TEXT,
    points INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS exam_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id INTEGER NOT NULL,
    user_email TEXT NOT NULL,
    answers TEXT,
    score INTEGER DEFAULT 0,
    submitted_at TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    user_id INTEGER,
    created_at TEXT,
    created_at_full DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Check and add missing columns to existing tables
try {
  // Check if points column exists in questions table
  const tableInfo = db.prepare("PRAGMA table_info(questions)").all();
  const hasPointsColumn = tableInfo.some(col => col.name === 'points');
  
  if (!hasPointsColumn) {
    console.log('Adding points column to questions table...');
    db.exec(`ALTER TABLE questions ADD COLUMN points INTEGER DEFAULT 1`);
    console.log('Points column added successfully!');
  }
  
  // Check if role column exists in users table
  const usersTableInfo = db.prepare("PRAGMA table_info(users)").all();
  const hasRoleColumn = usersTableInfo.some(col => col.name === 'role');
  
  if (!hasRoleColumn) {
    console.log('Adding role column to users table...');
    db.exec(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'student'`);
    console.log('Role column added successfully!');
  }
} catch (e) {
  console.log('Table migration note:', e.message);
}

// Login
app.post('/sciask_api/login.php', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' });
    }
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.json({ success: false, message: 'المستخدم غير موجود' });
    }
    if (user.password !== password) {
      return res.json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
    res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      user: { id: user.id, name: user.name, email: user.email, university: user.university, faculty: user.faculty, track: user.tracks, points: user.points, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.json({ success: false, message: 'خطأ في الخادم' });
  }
});

// Register
app.post('/sciask_api/register.php', (req, res) => {
  try {
    const { name, email, phone, university, faculty, tracks, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'يرجى ملء جميع الحقول المطلوبة' });
    }
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.json({ success: false, message: 'البريد الإلكتروني مسجل بالفعل' });
    }
    const tracksStr = Array.isArray(tracks) ? tracks.join(', ') : (tracks || '');
    const stmt = db.prepare('INSERT INTO users (name, email, phone, university, faculty, tracks, password, points, role) VALUES (?, ?, ?, ?, ?, ?, ?, 0, "student")');
    const result = stmt.run(name, email, phone || '', university || '', faculty || '', tracksStr, password);
    res.json({ success: true, message: 'تم التسجيل بنجاح', user: { id: result.lastInsertRowid, name, email, university, faculty, track: tracksStr, points: 0, role: 'student' } });
  } catch (error) {
    console.error('Register error:', error);
    res.json({ success: false, message: 'خطأ في الخادم: ' + error.message });
  }
});

// Get all users
app.get('/sciask_api/get_users.php', (req, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, phone, university, faculty, tracks, points, role FROM users').all();
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.json([]);
  }
});

// Delete user
app.post('/sciask_api/delete_user.php', (req, res) => {
  try {
    const { id } = req.body;
    db.prepare('DELETE FROM users WHERE id = ?').run(id);
    res.json({ success: true, message: 'تم حذف المستخدم بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  }
});

// Update user role
app.post('/sciask_api/update_role.php', (req, res) => {
  try {
    const { user_id, role } = req.body;
    db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, user_id);
    res.json({ success: true, message: 'تم تحديث الدور بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في التحديث' });
  }
});

// Update user points - ADD to existing
app.post('/sciask_api/update_points.php', (req, res) => {
  try {
    const { email, points } = req.body;
    const user = db.prepare('SELECT points FROM users WHERE email = ?').get(email);
    if (user) {
      const newPoints = (user.points || 0) + parseInt(points);
      db.prepare('UPDATE users SET points = ? WHERE email = ?').run(newPoints, email);
      res.json({ success: true, message: 'تم تحديث النقاط بنجاح', newPoints: newPoints });
    } else {
      res.json({ success: false, message: 'المستخدم غير موجود' });
    }
  } catch (error) {
    res.json({ success: false, message: 'خطأ في التحديث' });
  }
});

// Get lectures
app.get('/sciask_api/get_lectures.php', (req, res) => {
  try {
    const lectures = db.prepare('SELECT * FROM lectures ORDER BY id DESC').all();
    res.json(lectures);
  } catch (error) {
    res.json([]);
  }
});

// Add lecture
app.post('/sciask_api/add_lecture.php', (req, res) => {
  try {
    const { title, link, track } = req.body;
    const date = new Date().toLocaleDateString('ar-EG');
    const stmt = db.prepare('INSERT INTO lectures (title, link, track, date) VALUES (?, ?, ?, ?)');
    const result = stmt.run(title, link, track || 'URI', date);
    res.json({ success: true, id: result.lastInsertRowid, title, link, track: track || 'URI', date });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الإضافة' });
  }
});

// Delete lecture
app.post('/sciask_api/delete_lecture.php', (req, res) => {
  try {
    const { id } = req.body;
    db.prepare('DELETE FROM lectures WHERE id = ?').run(id);
    res.json({ success: true, message: 'تم حذف المحاضرة بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  }
});

// Get progress
app.post('/sciask_api/get_progress.php', (req, res) => {
  try {
    const { email } = req.body;
    const progress = db.prepare('SELECT * FROM progress WHERE user_email = ?').all(email);
    res.json(progress);
  } catch (error) {
    res.json([]);
  }
});

// Mark lecture complete - ADD 10 POINTS
app.post('/sciask_api/mark_complete.php', (req, res) => {
  try {
    const { email, lecture_id } = req.body;
    const completed_at = new Date().toLocaleDateString('ar-EG');
    const exists = db.prepare('SELECT id FROM progress WHERE user_email = ? AND lecture_id = ?').get(email, lecture_id);
    if (!exists) {
      db.prepare('INSERT INTO progress (user_email, lecture_id, completed, completed_at) VALUES (?, ?, 1, ?)').run(email, lecture_id, completed_at);
      const user = db.prepare('SELECT points FROM users WHERE email = ?').get(email);
      if (user) {
        const newPoints = (user.points || 0) + 10;
        db.prepare('UPDATE users SET points = ? WHERE email = ?').run(newPoints, email);
        res.json({ success: true, message: 'تم تحديد المحاضرة كمكتملة وحصلت على 10 نقاط!', pointsAdded: 10, newPoints: newPoints });
      } else {
        res.json({ success: true, message: 'تم تحديد المحاضرة كمكتملة' });
      }
    } else {
      res.json({ success: false, message: 'لقد أنهيت هذه المحاضرة من قبل' });
    }
  } catch (error) {
    res.json({ success: false, message: 'خطأ' });
  }
});

// Get volunteers
app.get('/sciask_api/get_volunteers.php', (req, res) => {
  try {
    const volunteers = db.prepare('SELECT * FROM volunteers ORDER BY id DESC').all();
    res.json(volunteers);
  } catch (error) {
    res.json([]);
  }
});

// Submit volunteer
app.post('/sciask_api/submit_volunteer.php', (req, res) => {
  try {
    const { name, email, phone, university, faculty, initiative } = req.body;
    const submitted_at = new Date().toLocaleDateString('ar-EG');
    const stmt = db.prepare('INSERT INTO volunteers (name, email, phone, university, faculty, initiative, submitted_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const result = stmt.run(name, email, phone, university, faculty, initiative, submitted_at);
    res.json({ success: true, message: 'تم تقديم طلب التطوع بنجاح', id: result.lastInsertRowid });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الإرسال' });
  }
});

// Delete volunteer
app.post('/sciask_api/delete_volunteer.php', (req, res) => {
  try {
    const { id } = req.body;
    db.prepare('DELETE FROM volunteers WHERE id = ?').run(id);
    res.json({ success: true, message: 'تم حذف المتطوع بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  }
});

// Get exams
app.get('/sciask_api/get_exams.php', (req, res) => {
  try {
    const exams = db.prepare('SELECT * FROM exams ORDER BY id DESC').all();
    res.json(exams);
  } catch (error) {
    res.json([]);
  }
});

// Add exam
app.post('/sciask_api/add_exam.php', (req, res) => {
  try {
    const { title, description, track, duration, created_by } = req.body;
    
    if (!title) {
      return res.json({ success: false, message: 'يرجى إدخال عنوان الامتحان' });
    }
    
    const created_at = new Date().toLocaleDateString('ar-EG');
    const stmt = db.prepare('INSERT INTO exams (title, description, track, duration, created_at) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(title, description || '', track || 'URI', duration || 60, created_at);
    
    res.json({ 
      success: true, 
      id: result.lastInsertRowid, 
      title, 
      description, 
      track: track || 'URI', 
      duration: duration || 60, 
      created_at 
    });
  } catch (error) {
    console.error('Add exam error:', error);
    res.json({ success: false, message: 'خطأ في الإضافة: ' + error.message });
  }
});

// Delete exam
app.post('/sciask_api/delete_exam.php', (req, res) => {
  try {
    const { id } = req.body;
    db.prepare('DELETE FROM questions WHERE exam_id = ?').run(id);
    db.prepare('DELETE FROM exam_attempts WHERE exam_id = ?').run(id);
    db.prepare('DELETE FROM exams WHERE id = ?').run(id);
    res.json({ success: true, message: 'تم حذف الامتحان بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  }
});

// Get questions
app.post('/sciask_api/get_questions.php', (req, res) => {
  try {
    const { exam_id } = req.body;
    const questions = db.prepare('SELECT * FROM questions WHERE exam_id = ?').all(exam_id);
    res.json(questions);
  } catch (error) {
    res.json([]);
  }
});

// Add question
app.post('/sciask_api/add_question.php', (req, res) => {
  try {
    const { exam_id, question_text, option_a, option_b, option_c, option_d, correct_answer, points } = req.body;
    
    if (!exam_id || !question_text) {
      return res.json({ success: false, message: 'يرجى إدخال معرّف الامتحان ونص السؤال' });
    }
    
    const stmt = db.prepare('INSERT INTO questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_answer, points) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    const result = stmt.run(exam_id, question_text, option_a || '', option_b || '', option_c || '', option_d || '', correct_answer || 'a', points || 1);
    res.json({ success: true, id: result.lastInsertRowid, exam_id, question_text, option_a, option_b, option_c, option_d, correct_answer: correct_answer || 'a', points: points || 1 });
  } catch (error) {
    console.error('Add question error:', error);
    res.json({ success: false, message: 'خطأ في الإضافة: ' + error.message });
  }
});

// Delete question
app.post('/sciask_api/delete_question.php', (req, res) => {
  try {
    const { id } = req.body;
    db.prepare('DELETE FROM questions WHERE id = ?').run(id);
    res.json({ success: true, message: 'تم حذف السؤال بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  }
});

// Submit exam - ADD POINTS
app.post('/sciask_api/submit_exam.php', (req, res) => {
  try {
    const { exam_id, user_email, answers } = req.body;
    const submitted_at = new Date().toLocaleDateString('ar-EG');
    const existingAttempt = db.prepare('SELECT id FROM exam_attempts WHERE exam_id = ? AND user_email = ?').get(exam_id, user_email);
    if (existingAttempt) {
      return res.json({ success: false, message: 'لقد أديت هذا الامتحان من قبل' });
    }
    const questions = db.prepare('SELECT * FROM questions WHERE exam_id = ?').all(exam_id);
    let correctCount = 0;
    let totalPoints = 0;
    if (questions.length > 0 && answers) {
      questions.forEach(q => {
        const questionPoints = q.points || 1;
        totalPoints += questionPoints;
        if (answers[q.id] === q.correct_answer) {
          correctCount += questionPoints;
        }
      });
    }
    const scorePercentage = totalPoints > 0 ? Math.round((correctCount / totalPoints) * 100) : 0;
    const stmt = db.prepare('INSERT INTO exam_attempts (exam_id, user_email, answers, score, submitted_at) VALUES (?, ?, ?, ?, ?)');
    stmt.run(exam_id, user_email, JSON.stringify(answers), correctCount, submitted_at);
    const user = db.prepare('SELECT points FROM users WHERE email = ?').get(user_email);
    if (user) {
      const newPoints = (user.points || 0) + correctCount;
      db.prepare('UPDATE users SET points = ? WHERE email = ?').run(newPoints, user_email);
    }
    res.json({ success: true, message: 'تم تقديم الامتحان بنجاح', score: correctCount, total_questions: totalPoints, percentage: scorePercentage, pointsAdded: correctCount });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في التقديم' });
  }
});

// Get news
app.get('/sciask_api/get_news.php', (req, res) => {
  try {
    const news = db.prepare('SELECT * FROM news ORDER BY id DESC').all();
    res.json(news);
  } catch (error) {
    res.json([]);
  }
});

// Add news
app.post('/sciask_api/add_news.php', (req, res) => {
  try {
    const { title, content, image, user_id } = req.body;
    const created_at = new Date().toLocaleDateString('ar-EG');
    const stmt = db.prepare('INSERT INTO news (title, content, image, user_id, created_at) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(title, content, image || '', user_id || null, created_at);
    res.json({ success: true, id: result.lastInsertRowid, title, content, image, created_at });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الإضافة' });
  }
});

// Delete news
app.post('/sciask_api/delete_news.php', (req, res) => {
  try {
    const { id } = req.body;
    db.prepare('DELETE FROM news WHERE id = ?').run(id);
    res.json({ success: true, message: 'تم حذف الخبر بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  }
});

app.listen(PORT, () => {
  console.log('SciAsk Backend running on http://localhost:' + PORT);
  console.log('Database: ' + path.join(__dirname, 'sciask.db'));
});
