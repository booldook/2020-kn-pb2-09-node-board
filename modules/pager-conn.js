const pager = (page, totalRecord, obj) => {
	let { listCnt = 5, pagerCnt = 3 } = obj;
	let totalPage = Math.ceil(totalRecord / listCnt);
	let startIdx = (page - 1) * listCnt;
	let startPage = Math.floor((page - 1) / listCnt) * pagerCnt + 1;
	let endPage = startPage + pagerCnt - 1;
	let nextPage = page + 1;
	let prevPage = page - 1;
	let nextPager = endPage + 1;
	let prevPager = startPage - 1;
	let firstPage = 1;
	let lastPage = totalPage;
	return { page, totalRecord, listCnt, pagerCnt, totalPage, startIdx, startPage, endPage, nextPage, prevPage, nextPager, prevPager, firstPage, lastPage };
}

module.exports = pager;