function onSubmit(f) {
	var validUserid = $("input[name='validUserid']").val();
	var validUserpw = $("input[name='validUserpw']").val();
	var validUsername = $("input[name='validUsername']").val();
	var validEmail = $("input[name='validEmail']").val();
	if(validUserid == "") {
		$(f.userid).next().removeClass('active').text('아이디를 확인하세요.');
		f.userid.focus();
		return false;
	}
	return true;
}

function onBlur() {
	var $userid = $(this);
	var userid = $userid.val().trim();
	var $validUserid = $("input[name='validUserid']");
	function onRes(v) {
		if(v.code == 200) {
			if(v.isUsed){
				$userid.next().removeClass('active').text('사용할 수 없는 아이디 입니다.');
				$validUserid.val("");
			}
			else{
				$userid.next().addClass('active').text('멋진 아이디 입니다. 사용하세요!');
				$validUserid.val("valid");
			}
		}
		else {
			console.log(v);
			$validUserid.val("");
		}
	}
	if(userid.length < 8 || userid.length > 24){
		$userid.next().removeClass('active').text('아이디는 8자 이상 24자 이하로 생성하셔야 합니다.');
		$validUserid.val("");
	}
	else 
		$.get('/user/idchk/'+userid, onRes);
} 

$("input[name='userid']").on('blur', onBlur);