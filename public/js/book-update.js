function onRemove(id) {
	if(confirm('첨부파일을 삭제하시겠습니까? 삭제후에는 복구되지 않습니다!')) {
		$.get('/book/remove/'+id, function(r) {
			if(r.code == 200) {
				$(".file-wrap").remove();
			}
			else {
				alert("삭제에 실패하였습니다. 관리자에게 문의하세요.");
			}
		});
	}
}