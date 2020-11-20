const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const moment = require('moment');

const accessLogStream = rfs.createStream(`${moment().format('YYYY-MM-DD')}.log`, {
	interval: '1d',
	path: path.join(__dirname, '../logs')
});

module.exports = () => {
	return morgan('combined', { stream: accessLogStream });
}