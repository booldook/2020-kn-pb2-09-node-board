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
	if(validUserpw == "") {
		$(f.userpw).next().removeClass('active').text('패스워드를 확인하세요.');
		f.userpw.focus();
		return false;
	}
	if(validUsername == "") {
		$(f.username).next().removeClass('active').text('이름을 확인하세요.');
		f.username.focus();
		return false;
	}
	if(validEmail == "") {
		$(f.email).next().removeClass('active').text('이메일을 확인하세요.');
		f.email.focus();
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

function onBlurPass() {
	var $userpw = $(this);
	var userpw = $userpw.val().trim();
	var $validUserpw = $("input[name='validUserpw']");
	if(userpw.length < 8 || userpw.length > 24){
		$userpw.next().removeClass('active').text('패스워드는 8자 이상 24자 이하로 생성하셔야 합니다.');
		$validUserpw.val("");
	}
	else {
		$userpw.next().addClass('active').text('사용하실 수 있습니다.');
		$validUserpw.val("valid");
	}
}

function onBlurName() {
	var $username = $(this);
	var username = $username.val().trim();
	var $validUsername = $("input[name='validUsername']");
	if(username == ""){
		$username.next().removeClass('active').text('이름을 입력하세요.');
		$validUsername.val("");
	}
	else {
		$username.next().addClass('active').text('사용하실 수 있습니다.');
		$validUsername.val("valid");
	}
}

function onBlurEmail() {
	var $email = $('input[name="email"]');
	var email = $email.val().trim();
	var $validEmail = $("input[name='validEmail']");
	var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	if(email == "" || email.match(regExp) == null){
		$email.next().removeClass('active').text('이메일을 올바르게 입력하세요.');
		$validEmail.val("");
		return false;
	}
	else {
		$email.next().addClass('active').text('사용하실 수 있습니다.');
		$validEmail.val("valid");
		return true;
	}
}


$("input[name='userid']").on('blur', onBlur);
$("input[name='userpw']").on('blur', onBlurPass);
$("input[name='username']").on('blur', onBlurName);
$("input[name='email']").on('keyup', onBlurEmail);