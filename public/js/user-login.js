function onSubmit(f) {
	if(f.userid.value.trim() == '') {
		alert('아이디를 입력하세요.');
		f.userid.focus();
		return false;
	}
	if(f.userpw.value.trim() == '') {
		alert('패스워드를 입력하세요.');
		f.userpw.focus();
		return false;
	}
	return true;
}