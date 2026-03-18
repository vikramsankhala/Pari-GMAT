const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'client', 'dist');
const dest = path.join(root, 'server', 'public');

if (!fs.existsSync(src)) {
  console.error('client/dist not found. Build client first.');
  process.exit(1);
}

fs.mkdirSync(dest, { recursive: true });
for (const f of fs.readdirSync(src)) {
  const s = path.join(src, f);
  const d = path.join(dest, f);
  if (fs.statSync(s).isDirectory()) {
    fs.cpSync(s, d, { recursive: true });
  } else {
    fs.copyFileSync(s, d);
  }
}
console.log('Copied client/dist to server/public');
