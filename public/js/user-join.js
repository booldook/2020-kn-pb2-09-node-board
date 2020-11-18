function onSubmit(f) {
	if(f.userid.value == '') {
		$(f.userid).next().text('아이디를 입력하세요.');
		f.userid.focus();
		return false;
	}
	return true;
}

function onBlur() {
	console.log($(this).val());
	$.get('/user/idchk/'+$(this).val(), function(v) {
		if(v.code == 200) {
			if(v.isUsed) {
				$("input[name='userid']").next().text('사용할 수 없는 아이디 입니다.');
			}
			else {
				$("input[name='userid']").next().text('멋진 아이디 입니다. 사용하세요!');
			}
		}
		else {
			console.log(v);
		}
	});
} 

$("input[name='userid']").on('blur', onBlur);