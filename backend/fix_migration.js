// Script to fix the missing role column in users table
const Database = require('better-sqlite3');
const path = require('path');

// Connect to the database - same path as server.js
const dbPath = path.join(__dirname, 'sciask.db');
console.log('Database path:', dbPath);

const db = new Database(dbPath);

try {
  // Check if role column exists
  const tableInfo = db.prepare("PRAGMA table_info(users)").all();
  const hasRoleColumn = tableInfo.some(col => col.name === 'role');
  
  if (!hasRoleColumn) {
    console.log('Adding role column to users table...');
    db.exec(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'student'`);
    console.log('Role column added successfully!');
    
    // Also add tracks column if missing (needed for registration)
    const hasTracksColumn = tableInfo.some(col => col.name === 'tracks');
    if (!hasTracksColumn) {
      console.log('Adding tracks column to users table...');
      db.exec(`ALTER TABLE users ADD COLUMN tracks TEXT`);
      console.log('Tracks column added successfully!');
    }
  } else {
    console.log('Role column already exists!');
  }
  
  // Verify the column was added
  const newTableInfo = db.prepare("PRAGMA table_info(users)").all();
  console.log('\n=== Users table columns ===');
  newTableInfo.forEach(col => {
    console.log(`- ${col.name}: ${col.type} (default: ${col.dflt_value})`);
  });
  
