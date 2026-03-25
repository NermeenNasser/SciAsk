const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err.stack);
});

// Test connection
async function getPool() {
  const client = await pool.connect();
  client.release();
  return pool;
}

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auto-create tables
async function createTables() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        university TEXT,
        faculty TEXT,
        tracks TEXT,
        password TEXT NOT NULL,
        points INTEGER DEFAULT 0,
        role TEXT DEFAULT 'student',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS lectures (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        link TEXT NOT NULL,
        track TEXT DEFAULT 'URI',
        date TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS progress (
        id SERIAL PRIMARY KEY,
        user_email TEXT NOT NULL,
        lecture_id INTEGER NOT NULL,
        completed INTEGER DEFAULT 1,
        completed_at TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS volunteers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        university TEXT,
        faculty TEXT,
        initiative TEXT,
        submitted_at TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS exams (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        track TEXT DEFAULT 'URI',
        duration INTEGER DEFAULT 60,
        created_at TEXT,
        created_at_full TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        exam_id INTEGER NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
        question_text TEXT NOT NULL,
        option_a TEXT,
        option_b TEXT,
        option_c TEXT,
        option_d TEXT,
        correct_answer TEXT,
        points INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS exam_attempts (
        id SERIAL PRIMARY KEY,
        exam_id INTEGER NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
        user_email TEXT NOT NULL,
        answers JSONB,
        score INTEGER DEFAULT 0,
        submitted_at TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        image TEXT,
        user_id INTEGER REFERENCES users(id),
        created_at TEXT,
        created_at_full TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Migration: Add columns if missing
    const questionsCols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'questions' AND column_name = 'points'");
    if (questionsCols.rows.length === 0) {
      await client.query("ALTER TABLE questions ADD COLUMN points INTEGER DEFAULT 1");
      console.log('Added points column to questions');
    }

    const usersCols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role'");
    if (usersCols.rows.length === 0) {
      await client.query("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'student'");
      console.log('Added role column to users');
    }

    console.log('Database tables ready');
  } catch (err) {
    console.log('Migration note:', err.message);
  } finally {
    client.release();
  }
}

await createTables();

app.post('/sciask_api/login.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' });
    }
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      return res.json({ success: false, message: 'المستخدم غير موجود' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
    res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        university: user.university, 
        faculty: user.faculty, 
        track: user.tracks, 
        points: user.points, 
        role: user.role 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.json({ success: false, message: 'خطأ في الخادم' });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/register.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, email, phone, university, faculty, tracks, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'يرجى ملء جميع الحقول المطلوبة' });
    }
    const result = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.json({ success: false, message: 'البريد الإلكتروني مسجل بالفعل' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const tracksStr = Array.isArray(tracks) ? tracks.join(', ') : (tracks || '');
    const resultInsert = await client.query(
      'INSERT INTO users (name, email, phone, university, faculty, tracks, password, points, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      [name, email, phone || '', university || '', faculty || '', tracksStr, hashedPassword, 0, 'student']
    );
    const newUserId = resultInsert.rows[0].id;
    res.json({ 
      success: true, 
      message: 'تم التسجيل بنجاح', 
      user: { id: newUserId, name, email, university, faculty, track: tracksStr, points: 0, role: 'student' } 
    });
  } catch (error) {
    console.error('Register error:', error);
    res.json({ success: false, message: 'خطأ في الخادم: ' + error.message });
  } finally {
    client.release();
  }
});

app.get('/sciask_api/get_users.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT id, name, email, phone, university, faculty, tracks, points, role FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Get users error:', error);
    res.json([]);
  } finally {
    client.release();
  }
});

app.post('/sciask_api/delete_user.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.body;
    await client.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ success: true, message: 'تم حذف المستخدم بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/update_role.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { user_id, role } = req.body;
    await client.query('UPDATE users SET role = $1 WHERE id = $2', [role, user_id]);
    res.json({ success: true, message: 'تم تحديث الدور بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في التحديث' });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/update_points.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { email, points } = req.body;
    const result = await client.query('SELECT points FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user) {
      const newPoints = (user.points || 0) + parseInt(points);
      await client.query('UPDATE users SET points = $1 WHERE email = $2', [newPoints, email]);
      res.json({ success: true, message: 'تم تحديث النقاط بنجاح', newPoints });
    } else {
      res.json({ success: false, message: 'المستخدم غير موجود' });
    }
  } catch (error) {
    res.json({ success: false, message: 'خطأ في التحديث' });
  } finally {
    client.release();
  }
});

app.get('/sciask_api/get_lectures.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM lectures ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.json([]);
  } finally {
    client.release();
  }
});

app.post('/sciask_api/add_lecture.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { title, link, track } = req.body;
    const date = new Date().toLocaleDateString('ar-EG');
    const result = await client.query(
      'INSERT INTO lectures (title, link, track, date) VALUES ($1, $2, $3, $4) RETURNING id',
      [title, link, track || 'URI', date]
    );
    res.json({ success: true, id: result.rows[0].id, title, link, track: track || 'URI', date });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الإضافة' });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/delete_lecture.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.body;
    await client.query('DELETE FROM lectures WHERE id = $1', [id]);
    res.json({ success: true, message: 'تم حذف المحاضرة بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/get_progress.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { email } = req.body;
    const result = await client.query('SELECT * FROM progress WHERE user_email = $1', [email]);
    res.json(result.rows);
  } catch (error) {
    res.json([]);
  } finally {
    client.release();
  }
});

app.post('/sciask_api/mark_complete.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { email, lecture_id } = req.body;
    const completed_at = new Date().toLocaleDateString('ar-EG');
    const existsResult = await client.query('SELECT id FROM progress WHERE user_email = $1 AND lecture_id = $2', [email, lecture_id]);
    if (existsResult.rows.length === 0) {
      await client.query(
        'INSERT INTO progress (user_email, lecture_id, completed, completed_at) VALUES ($1, $2, $1, $3)',
        [email, lecture_id, completed_at]
      );
      const userResult = await client.query('SELECT points FROM users WHERE email = $1', [email]);
      const user = userResult.rows[0];
      if (user) {
        const newPoints = (user.points || 0) + 10;
        await client.query('UPDATE users SET points = $1 WHERE email = $2', [newPoints, email]);
        res.json({ success: true, message: 'تم تحديد المحاضرة كمكتملة وحصلت على 10 نقاط!', pointsAdded: 10, newPoints });
      } else {
        res.json({ success: true, message: 'تم تحديد المحاضرة كمكتملة' });
      }
    } else {
      res.json({ success: false, message: 'لقد أنهيت هذه المحاضرة من قبل' });
    }
  } catch (error) {
    res.json({ success: false, message: 'خطأ' });
  } finally {
    client.release();
  }
});

app.get('/sciask_api/get_volunteers.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM volunteers ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.json([]);
  } finally {
    client.release();
  }
});

app.post('/sciask_api/submit_volunteer.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, email, phone, university, faculty, initiative } = req.body;
    const submitted_at = new Date().toLocaleDateString('ar-EG');
    const result = await client.query(
      'INSERT INTO volunteers (name, email, phone, university, faculty, initiative, submitted_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [name, email, phone, university, faculty, initiative, submitted_at]
    );
    res.json({ success: true, message: 'تم تقديم طلب التطوع بنجاح', id: result.rows[0].id });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الإرسال' });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/delete_volunteer.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.body;
    await client.query('DELETE FROM volunteers WHERE id = $1', [id]);
    res.json({ success: true, message: 'تم حذف المتطوع بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  } finally {
    client.release();
  }
});

app.get('/sciask_api/get_exams.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM exams ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.json([]);
  } finally {
    client.release();
  }
});

app.post('/sciask_api/add_exam.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { title, description, track, duration, created_by } = req.body;
    if (!title) {
      return res.json({ success: false, message: 'يرجى إدخال عنوان الامتحان' });
    }
    const created_at = new Date().toLocaleDateString('ar-EG');
    const result = await client.query(
      'INSERT INTO exams (title, description, track, duration, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [title, description || '', track || 'URI', duration || 60, created_at]
    );
    res.json({ 
      success: true, 
      id: result.rows[0].id, 
      title, 
      description, 
      track: track || 'URI', 
      duration: duration || 60, 
      created_at 
    });
  } catch (error) {
    console.error('Add exam error:', error);
    res.json({ success: false, message: 'خطأ في الإضافة: ' + error.message });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/delete_exam.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.body;
    await client.query('DELETE FROM exams WHERE id = $1', [id]);
    res.json({ success: true, message: 'تم حذف الامتحان بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/get_questions.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { exam_id } = req.body;
    const result = await client.query('SELECT * FROM questions WHERE exam_id = $1', [exam_id]);
    res.json(result.rows);
  } catch (error) {
    res.json([]);
  } finally {
    client.release();
  }
});

app.post('/sciask_api/add_question.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { exam_id, question_text, option_a, option_b, option_c, option_d, correct_answer, points } = req.body;
    if (!exam_id || !question_text) {
      return res.json({ success: false, message: 'يرجى إدخال معرّف الامتحان ونص السؤال' });
    }
    const result = await client.query(
      'INSERT INTO questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_answer, points) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [exam_id, question_text, option_a || '', option_b || '', option_c || '', option_d || '', correct_answer || 'a', points || 1]
    );
    res.json({ 
      success: true, 
      id: result.rows[0].id, 
      exam_id, 
      question_text, 
      option_a, 
      option_b, 
      option_c, 
      option_d, 
      correct_answer: correct_answer || 'a', 
      points: points || 1 
    });
  } catch (error) {
    console.error('Add question error:', error);
    res.json({ success: false, message: 'خطأ في الإضافة: ' + error.message });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/delete_question.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.body;
    await client.query('DELETE FROM questions WHERE id = $1', [id]);
    res.json({ success: true, message: 'تم حذف السؤال بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/submit_exam.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { exam_id, user_email, answers } = req.body;
    const submitted_at = new Date().toLocaleDateString('ar-EG');
    const existsResult = await client.query('SELECT id FROM exam_attempts WHERE exam_id = $1 AND user_email = $2', [exam_id, user_email]);
    if (existsResult.rows.length > 0) {
      return res.json({ success: false, message: 'لقد أديت هذا الامتحان من قبل' });
    }
    const questionsResult = await client.query('SELECT * FROM questions WHERE exam_id = $1', [exam_id]);
    const questions = questionsResult.rows;
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
    await client.query(
      'INSERT INTO exam_attempts (exam_id, user_email, answers, score, submitted_at) VALUES ($1, $2, $3, $4, $5)',
      [exam_id, user_email, JSON.stringify(answers), correctCount, submitted_at]
    );
    const userResult = await client.query('SELECT points FROM users WHERE email = $1', [user_email]);
    const user = userResult.rows[0];
    if (user) {
      const newPoints = (user.points || 0) + correctCount;
      await client.query('UPDATE users SET points = $1 WHERE email = $2', [newPoints, user_email]);
    }
    res.json({ success: true, message: 'تم تقديم الامتحان بنجاح', score: correctCount, total_questions: totalPoints, percentage: scorePercentage, pointsAdded: correctCount });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في التقديم' });
  } finally {
    client.release();
  }
});

app.get('/sciask_api/get_news.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM news ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.json([]);
  } finally {
    client.release();
  }
});

app.post('/sciask_api/add_news.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { title, content, image, user_id } = req.body;
    const created_at = new Date().toLocaleDateString('ar-EG');
    const result = await client.query(
      'INSERT INTO news (title, content, image, user_id, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [title, content, image || '', user_id || null, created_at]
    );
    res.json({ success: true, id: result.rows[0].id, title, content, image, created_at });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الإضافة' });
  } finally {
    client.release();
  }
});

app.post('/sciask_api/delete_news.php', async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.body;
    await client.query('DELETE FROM news WHERE id = $1', [id]);
    res.json({ success: true, message: 'تم حذف الخبر بنجاح' });
  } catch (error) {
    res.json({ success: false, message: 'خطأ في الحذف' });
  } finally {
    client.release();
  }
});

const server = app.listen(PORT, async () => {
  console.log(`SciAsk Backend running on port ${PORT}`);
  console.log('PostgreSQL: Connected via POSTGRES_URL');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server');
  server.close(() => {
    pool.end();
  });
});
