function onSubmit(f) {
	if(f.userid.value == '') {
		$(f.userid).next().text('아이디를 입력하세요.');
		f.userid.focus();
		return false;
	}
	return true;
}