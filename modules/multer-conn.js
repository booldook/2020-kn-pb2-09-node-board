const path = require('path');
const fs = require('fs-extra');
const moment = require('moment');
const { v4: uuid } = require('uuid'); 
const multer  = require('multer');

const imgExt = ['jpg', 'jpeg', 'gif', 'png', 'svg'];
const allowExt = [...imgExt, 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'hwp'];
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		var folder = path.join(__dirname, '../storage', moment().format('YYMMDD'));
		//if(!fs.existsSync(folder)) fs.mkdirSync(folder); // node fs
		fs.ensureDirSync(folder);
		cb(null, folder);
	},
	filename: (req, file, cb) => {
		var ext = path.extname(file.originalname); //.jpg
		var name = moment().format('YYMMDD') + '-' + uuid() + ext;
		cb(null, name);
	}
});
const fileFilter = (req, file, cb) => {
	let ext = path.extname(file.originalname).replace(".", "").toLowerCase();
	if(allowExt.includes(ext)) {
		req.allow = true;
		req.ext = ext;
		cb(null, true);
	}
	else {
		req.allow = false;
		req.ext = ext;
		cb(null, false);
	}
}
const upload = multer({ storage, fileFilter, limits: { fileSize: 20480000 } });

module.exports = { upload, imgExt, allowExt };