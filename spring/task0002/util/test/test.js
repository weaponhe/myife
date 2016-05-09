/**
 * cloneObject测试用例
 */
var srcObj = {
	a: 1,
	b: {
		b1: ["hello", "hi"],
		b2: "JavaScript"
	}
};

var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a); // 1
console.log(tarObj.b.b1[0]); // "hello"

var num = new Number(1);
var bol = new Boolean(true);
var str = new String("str");
var date = new Date();
var arr = [num, bol, str, date];
var obj = {
	num: num,
	bol: bol,
	str: str,
	date: date,
	arr: arr
}

var r1 = cloneObject(num);
var r2 = cloneObject(bol);
var r3 = cloneObject(str);
var r4 = cloneObject(str);
var r5 = cloneObject(arr);
var r6 = cloneObject(obj);

console.log(r1, r1 === num);
console.log(r2, r2 === bol);
console.log(r3, r3 === str);
console.log(r4, r4 === date);
console.log(r5, r5 === arr);
console.log(r6, r6 === obj);

console.log(r6.arr[0], num, r6.arr[0] === num);

/**
 * uniqArray的测试用例
 */

var a = [1, "2", "dasdas", 213, 1, "2", 2, ];
console.log(uniqArray(a));

var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]


// 使用示例
var obj = {
	a: 1,
	b: 2,
	c: {
		c1: 3,
		c2: 4
	},
	toString: "asd"
};
console.log(getObjectLength(obj)); // 4

// 例如：
function clicklistener(event) {
	console.log("click");
}
$.on("#doma", "click", clicklistener);


function liClicker(event) {
	console.log(event);
}
$.delegate('#list', "li", "click", liClicker);