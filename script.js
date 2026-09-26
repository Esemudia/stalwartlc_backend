const fs = require('fs');
const path = require('path');

const modules = [
  'roles', 'clients', 'matters', 'documents', 'tasks', 'events',
  'notifications', 'approvals', 'audit', 'verification', 'communications'
];

const srcDir = path.join(__dirname, 'src');

modules.forEach(m => {
  const dir = path.join(srcDir, m);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

