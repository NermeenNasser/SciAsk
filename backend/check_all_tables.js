const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'sciask.db'));

console.log('=== All Tables Schema ===\n');

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();

tables.forEach(t => {
  console.log('Table: ' + t.name);
  const columns = db.prepare('PRAGMA table_info(' + t.name + ')').all();
  columns.forEach(c => {
    console.log('  - ' + c.name + ' (' + c.type + ')');
  });
  console.log('');
});

db.close();

