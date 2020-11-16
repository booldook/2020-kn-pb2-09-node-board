const path = require('path');

const alert = (msg, loc) => `<script>alert('${msg}');location.href = '${loc}';</script>`;

const getPath = (filename, mode='abs') => mode === 'abs' ? path.join(__dirname, '../storage', filename.substr(0, 6), filename) : `/upload/${filename.substr(0, 6)}/${filename}`;

const getExt = (filename, mode='lower') => mode == 'lower' ? path.extname(filename).replace('.', '').toLowerCase() : path.extname(filename).replace('.', '').toUpperCase();

const txtCut = v => v.length > 20 ? v.substr(0, 20) + '...' : v;

module.exports = { alert, getPath, getExt, txtCut };