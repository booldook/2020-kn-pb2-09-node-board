function onDelete(id) {
	if(confirm('정말로 삭제하시겠습니까?')) {
		location.href = '/book/delete/'+id;
	}
}

function onUpdate(id) {
	location.href = '/book/write/'+id;
}