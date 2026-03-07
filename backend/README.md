# SciAsk Backend

## تشغيل السيرفر

```bash
cd backend
npm install
npm start
```

## معلومات السيرفر

- **المنفذ**: 3000
- **قاعدة البيانات**: SQLite (sciask.db)
- **رابط الـ API**: http://localhost:3000/sciask_api/

## نقاط النهاية المتاحة

### المصادقة

- `POST /sciask_api/login.php` - تسجيل الدخول
- `POST /sciask_api/register.php` - تسجيل مستخدم جديد

### المستخدمون

- `GET /sciask_api/get_users.php` - جلب جميع المستخدمين
- `POST /sciask_api/delete_user.php` - حذف مستخدم
- `POST /sciask_api/update_role.php` - تحديث دور المستخدم
- `POST /sciask_api/update_points.php` - تحديث نقاط المستخدم

### المحاضرات

- `GET /sciask_api/get_lectures.php` - جلب المحاضرات
- `POST /sciask_api/add_lecture.php` - إضافة محاضرة
- `POST /sciask_api/delete_lecture.php` - حذف محاضرة

### التقدم

- `POST /sciask_api/get_progress.php` - جلب تقدم المستخدم
- `POST /sciask_api/mark_complete.php` - تحديد المحاضرة كمكتملة

### المتطوعون

- `GET /sciask_api/get_volunteers.php` - جلب المتطوعين
- `POST /sciask_api/submit_volunteer.php` - تقديم طلب تطوع
- `POST /sciask_api/delete_volunteer.php` - حذف متطوع

### الامتحانات

- `GET /sciask_api/get_exams.php` - جلب الامتحانات
- `POST /sciask_api/add_exam.php` - إضافة امتحان
- `POST /sciask_api/delete_exam.php` - حذف امتحان
- `POST /sciask_api/get_questions.php` - جلب أسئلة الامتحان
- `POST /sciask_api/add_question.php` - إضافة سؤال
- `POST /sciask_api/delete_question.php` - حذف سؤال
- `POST /sciask_api/submit_exam.php` - تقديم الامتحان

### الأخبار

- `GET /sciask_api/get_news.php` - جلب الأخبار
- `POST /sciask_api/add_news.php` - إضافة خبر
- `POST /sciask_api/delete_news.php` - حذف خبر
