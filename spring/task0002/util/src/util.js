/**
 * @author heweipeng
 */

/**
 *判断arr是否为一个数组，返回一个bool值
 * 
 * @param  {[type]} arr 待检测对象
 * @return {Boolean}
 */
function isArray(arr) {
	return Object.prototype.toString.call(arr) === "[object Array]";
}

/**
 *判断fn是否为一个函数，返回一个bool值
 * 
 * @param  {Function} fn 待检测对象
 * @return {Boolean}
 */
function isFunction(fn) {
	return Object.prototype.toString.call(fn) === "[object Function]";
}

/**
 *使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
 *被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
 * 
 * @param  {[type]} src 源对象
 * @return {[type]} 克隆对象
 */
function cloneObject(src) {

	function handleArray(src) {
		var ret = [];
		for (var i = 0, len = src.length; i < len; i++) {
			ret.push(cloneObject(src[i]));
		}
		return ret;
	}

	function handleObject(src) {
		var obj = {};
		for (x in src) {
			obj[x] = cloneObject(src[x]);
		}
		return obj;
	}

	if (typeof src === "object") {
		switch (Object.prototype.toString.call(src)) {
			case "[object Number]":
				return new Number(src);
			case "[object String]":
				return new String(src);
			case "[object Boolean]":
				return new Boolean(src);
			case "[object Date]":
				return new Date(src);
			case "[object Array]":
				return handleArray(src);
			case "[object Object]":
				return handleObject(src);
		}
	} else {
		return src;
	}
}

/**
 * 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
 * 
 * @param  {[type]} arr 待去重数组
 * @return {[type]}
 */
function uniqArray(arr) {
	var strObj = {};
	var numObj = {};
	var ret = [];
	for (var i = 0, len = arr.length; i < len; i++) {
		switch (typeof arr[i]) {
			case "number":
				if (!obj[arr[i]]) {
					numObj[arr[i]] = true;
				}
				break;
			case "string":
				if (!obj[arr[i]]) {
					strObj[arr[i]] = true;
				}
		}
	}
	for (var item in strObj) {
		ret.push(item);
	}
	for (item in numObj) {
		ret.push(parseFloat(item));
	}
	return ret;
}

/**
 * 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
 * 假定空白字符只有半角空格、Tab
 * 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
 * 
 * @param  {[type]} 待trim字符串
 * @return {[type]}
 */
function simpleTrim(str) {
	var start = 0;
	while (start < str.length) {
		if (str[start] === ' ' || str[start] === '	') {
			start++;
		} else {
			break;
		}
	}
	var end = start;
	var index = start;
	while (index < str.length) {
		if (str[index] !== ' ' && str[index] !== '	') {
			end = index;
		}
		index++;
	}
	return str.slice(start, end + 1);
}

/**
 *对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
 * 
 * @param  {[type]}
 * @return {[type]}
 */
function trim(str) {
	var re = /^\s*(.*?)\s*$/;
	return re.exec(str)[1];
}

/**
 *实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
 * 
 * @param  {[type]} arr 数组
 * @param  {Function} fn 函数
 * @return {[type]}
 */
function each(arr, fn) {
	for (var i = 0, len = arr.length; i < len; i++) {
		fn(arr[i], i);
	}
}

/**
 *获取一个对象里面第一层元素的数量，返回一个整数
 * 
 * @param  {[type]}
 * @return {[type]}
 */
function getObjectLength(obj) {
	var sum = 0;
	for (var x in obj) {
		if (obj.hasOwnProperty(x)) {
			sum++;
		}
	}
	var bug = ['toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
	for (var i = 0, len = bug.length; i < len; i++) {
		if (obj.propertyIsEnumerable(bug[i])) {
			sum++;
		}
	}

	return sum;
}

/**
 * 判断是否为邮箱地址
 * 
 * @param  {[type]}
 * @return {Boolean}
 */
function isEmail(emailStr) {
	var re = /^[\w.\-]+@\w+\.\w+$/;

}

/**
 *判断是否为手机号
 * 
 * @param  {[type]}
 * @return {Boolean}
 */
function isMobilePhone(phone) {
	var re = /^\d{11}$/;
	return re.test(phone);
}

/**
 * [addEvent 给一个element绑定一个针对event事件的响应，响应函数为listener]
 * @param {[type]} element  [dom元素]
 * @param {[type]} event    [事件名称]
 * @param {[type]} listener [响应函数]
 */
function addEvent(element, event, listener) {
	try {
		element.addEventListener(event, listener, false);
	} catch (ex) {
		element.attachEvent("on" + event, listener);
	}
}

/**
 * [removeEvent 移除element对象对于event事件发生时执行listener的响应]
 * @param  {[type]} element  [dom元素]
 * @param  {[type]} event    [事件名称]
 * @param  {[type]} listener [响应函数]
 */
function removeEvent(element, event, listener) {
	try {
		element.removeEventListener(event, listener);
	} catch (ex) {
		element.detachEvent("on" + event, listener);
	}
}

/**
 * [addClickEvent 实现对click事件的绑定]
 * @param {[type]} element  [dom元素]
 * @param {[type]} listener [响应函数]
 */
function addClickEvent(element, listener) {
	addEvent(element, "click", listener);
}

/**
 * [addEnterEvent 实现对于按Enter键时的事件绑定]
 * @param {[type]} element  [dom元素]
 * @param {[type]} listener [响应函数]
 */
function addEnterEvent(element, listener) {
	element.onkeydown = function(e) {
		e = e || window.event;
		if (e.keyCode == 13) {
			listener.call(null, e);
		}
	}
}

/**
 * [delegateEvent 事件代理]
 * @param  {[type]} element   [description]
 * @param  {[type]} tag       [description]
 * @param  {[type]} eventName [description]
 * @param  {[type]} listener  [description]
 * @return {[type]}           [description]
 */
function delegateEvent(element, tag, eventName, listener) {
	try {
		element.addEventListener(eventName, function(event) {
			var target = event.target;
			console.log(target.nodeName);
			if (target.nodeName.toLowerCase() == tag.toLowerCase()) {
				listener.call(target, event);
			}
		}, false);
	} catch (ex) {
		element.attachEvent("on" + eventName, function() {
			var event = window.event;
			var target = event.srcElement;
			if (target.nodeName.toLowerCase() == tag.toLowerCase()) {
				listener.call(target, event);
			}
		});
	}
}