# 1. Object.entries(객체)
```js
var arr = [10, 30, 50, 15, 83];
var over30 = arr.filter(v => v>=30);
console.log(over30)
// [30, 50, 83]
var user = [{name:'홍', age: 20}, {name: '김', age: 15}, {name: '이', age: 35}];
var user30 = user.filter(v => v.age>=30);
console.log(user30);
// [{…}]0: {name: "이", age: 35}
var field2 = ['title', 'writer'];
var data2 = {id: 1, title: '제목', writer: '작가', content: '홍길동이가...'};
var temp = Object.entries(data2);
console.log(temp)
// 0: (2) ["id", 1]1: (2) ["title", "제목"]2: (2) ["writer", "작가"]3: (2) ["content", "홍길동이가..."]length: 4__proto__: Array(0)
temp.filter(v => field2.includes(v[0]));
(2) [Array(2), Array(2)]

var arr = [10,20,30,40]
arr.toString();
// "10,20,30,40"
var field3 = ['title', 'writer','content'];
field3.toString();
// "title,writer,content"

console.log(temp);
/* (4) [Array(2), Array(2), Array(2), Array(2)]
0: (2) ["id", 1]
1: (2) ["title", "제목"]
2: (2) ["writer", "작가"]
3: (2) ["content", "홍길동이가..."] */

// temp.push(['savefile', file.filename]); 
// temp.push(['realfile', file.originalname]); 
// temp.push(['filesize', file.size]); 
temp.push(['savefile', '201116-abcd.jpg']); 
temp.push(['realfile', 'abcd.jpg']); 
temp.push(['filesize', 12345]); 
console.log(temp);

/* 0: (2) ["id", 1]
1: (2) ["title", "제목"]
2: (2) ["writer", "작가"]
3: (2) ["content", "홍길동이가..."]
4: (2) ["savefile", "201116-abcd.jpg"]
5: (2) ["realfile", "abcd.jpg"]
6: Array(2)
0: "filesize"
1: 12345 */
```