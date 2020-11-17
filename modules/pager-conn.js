const pager = (page, totalRecord, obj) => {
	page = Number(page);
	let { listCnt = 5, pagerCnt = 3 } = obj || {};
	let totalPage = Math.ceil(totalRecord / listCnt);
	let startIdx = (page - 1) * listCnt;
	let lastPage = page < totalPage ? totalPage : 0;
	let startPage = Math.floor((page - 1) / pagerCnt) * pagerCnt + 1;
	let endPage = startPage + pagerCnt - 1 > totalPage ? totalPage : startPage + pagerCnt - 1;
	let nextPage = page + 1 > totalPage ? 0 : page + 1;
	let prevPage = page - 1;
	let nextPager = endPage + 1 > totalPage ? 0 : endPage + 1;
	let prevPager = startPage - 1;
	let firstPage = 1;
	return { page, totalRecord, listCnt, pagerCnt, totalPage, startIdx, startPage, endPage, nextPage, prevPage, nextPager, prevPager, firstPage, lastPage };
}

module.exports = pager;