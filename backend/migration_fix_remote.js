// Migration script to fix the missing 'role' column in users table
// This should be run ON THE REMOTE SERVER to fix the database

const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Connect to the database
const dbPath = path.join(__dirname, 'sciask.db');
console.log('Database path:', dbPath);

let db;
try {
  db = new Database(dbPath);
  console.log('Connected to database successfully');
} catch (error) {
  console.error('Failed to connect to database:', error.message);
  process.exit(1);
}

try {
  // Check current table structure
  console.log('\n=== Checking users table structure ===');
  const tableInfo = db.prepare("PRAGMA table_info(users)").all();
  
  console.log('Current columns:');
  tableInfo.forEach(col => {
    console.log(`  - ${col.name}: ${col.type} (default: ${col.dflt_value})`);
  });
  
  // Check if role column exists
  const hasRoleColumn = tableInfo.some(col => col.name === 'role');
  
  if (!hasRoleColumn) {
    console.log('\n!!! Adding missing role column to users table...');
    db.exec(`ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'student'`);
    console.log('✓ Role column added successfully!');
  } else {
    console.log('\n✓ Role column already exists');
  }
  
  // Check if tracks column exists (needed for registration)
  const hasTracksColumn = tableInfo.some(col => col.name === 'tracks');
  
  if (!hasTracksColumn) {
    console.log('\n!!! Adding missing tracks column to users table...');
    db.exec(`ALTER TABLE users ADD COLUMN tracks TEXT`);
    console.log('✓ Tracks column added successfully!');
  } else {
    console.log('✓ Tracks column already exists');
  }
  
  // Verify the columns after migration
  console.log('\n=== Updated users table structure ===');
  const newTableInfo = db.prepare("PRAGMA table_info(users)").all();
  newTableInfo.forEach(col => {
    console.log(`  - ${col.name}: ${col.type} (default: ${col.dflt_value})`);
  });
  
  // Update existing users without a role to have 'student' role
  console.log('\n=== Updating existing users ===');
  const updateResult = db.prepare("UPDATE users SET role = 'student' WHERE role IS NULL OR role = ''").run();
  console.log(`Updated ${updateResult.changes} users to have 'student' role`);
  
  console.log('\n✓ Migration completed successfully!');
  
} catch (error) {
  console.error('\n!!! Migration error:', error.message);
  console.error(error);
  process.exit(1);
} finally {
  db.close();
  console.log('\nDatabase connection closed.');
}

