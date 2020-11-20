const { alert } = require("./util");

const isUser = (req, res, next) => {
	if(req.session.user) next();
	else res.send(alert('로그인 후에 사용하세요.', '/user/login')); 
}

const isGuest = (req, res, next) => {
	if(req.session.user) res.send(alert('정상적인 접근이 아닙니다.', '/'));
	else next(); 
}

module.exports = { isUser, isGuest }