const alert = (msg, loc) => `<script>alert('${msg}');location.href = '${loc}';</script>`;

const makePath = (filename, mode='abs') => mode === 'abs' ? path.join(__dirname, '../storage', filename.substr(0, 6), filename) : `/upload/${filename.substr(0, 6)}/${filename}`;

module.exports = { alert, makePath };