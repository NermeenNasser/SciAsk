const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

const db = new Database(path.join(__dirname, 'backend', 'sciask.db'));

console.log('Testing login with test user...');

// First create a test user if not exists
const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get('testuser@test.com');
if (!existingUser) {
  console.log('Creating test user...');
  db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run('Test User', 'testuser@test.com', 'test123', 'student');
}

const user = db.prepare('SELECT * FROM users WHERE email = ?').get('testuser@test.com');
console.log('User from DB:', user);

db.close();

