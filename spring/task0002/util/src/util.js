function isArray(arr) {
	return Array.isArray(arr);
}

function isFunction(fn) {
	return fn instanceof Function;
}

function cloneObject(src) {
	var obj = {};
	for (x in src) {
		if (typeof(src[x]) == 'object') {
			obj[x] = cloneObject(src[x])
		} else {
			obj[x] = src[x];
		}
	}
	return obj;
}


function uniqArray(arr) {
	var obj = {};
	var ret = [];
	var i;
	for (i = 0; i < arr.length; i++) {
		if (!obj[arr[i]]) {
			obj[arr[i]] = true;
			ret.push(arr[i]);
		}
	}
	return ret;
}

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

function trim(str) {
	var re = /^\s*(.*?)\s*$/;
	return re.exec(str)[1];
}


function each(arr, fn) {
	arr.forEach(function(item, index, array) {
		fn(item, index);
	});
}

function getObjectLength(obj) {
	var sum = 0;
	for (var x in obj) {
		if (obj.hasOwnProperty(x)) {
			sum++;
		}
	}
	return sum;
}

function isEmail(emailStr) {
	var re = /^[\w.\-]+@\w+\.\w+$/;

}

function isMobilePhone(phone) {
	var re = /^\d{11}$/;
	return re.test(phone);
}



var div = document.getElementById("test");

function addClass(element, newClassName) {
	try {
		element.classList.add(newClassName);
	} catch (ex) {
		var classNames = element.className.split(/\s+/);
		var flag;
		if (element.className.length === 0) {
			flag = false;
		} else {
			var i,
				len;
			for (i = 0, len = classNames.length; i < len; i++) {
				if (classNames[i] === newClassName) {
					flag = true;
				}
			}
		}
		if (!flag) {
			classNames.push(newClassName);
			element.className = classNames.join(" ");
		}
	}
}

function removeClass(element, oldClassName) {
	try {
		element.classList.remove(oldClassName);
	} catch (ex) {
		var classNames = element.className.split(/\s+/);
		var pos = -1,
			i,
			len;
		for (i = 0, len = classNames.length; i < len; i++) {
			if (classNames[i] === oldClassName) {
				pos = i;
			}
		}
		if (pos != -1) {
			classNames.splice(pos, 1);
			element.className = classNames.join(" ");
		}
	}

}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	// your implement
	return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	// your implement
	var x = element.offsetLeft;
	var current = element.offsetParent;
	while (current) {
		x += current.offsetLeft;
		current = current.offsetParent;
	}

	var y = element.offsetTop;
	current = element.offsetParent;
	while (current) {
		y += current.offsetTop;
		current = current.offsetParent;
	}
}

function $(selector) {

}

function getClientSize() {
	var pageWidth = window.innerWidth,
		pageHeight = window.innerHeight;

	if ((typeof pageWidth === "number")) {
		if (document.compatMode === "CSS1Compat") {
			pageWidth = document.documentElement.clientWidth;
			pageHeight = document.documentElement.clientHeight;
		} else {
			pageWidth = document.body.clientWidth;
			pageHeight = document.body.clientHeight;
		}
	}
	return {
		width: pageWidth,
		height: pageHeight
	};
}


var test = document.querySelector("#test");
console.log(test);

function traverseDOMTreeRecursion(dom) {
	//前序遍历
	if (dom.nodeType == 1 || dom.nodeType == 9) {
		var obj = {};
		obj[dom.nodeName] = [];
		for (var i = 0, len = dom.childNodes.length; i < len; i++) {
			var domObj = traverseDOMTree(dom.childNodes[i]);
			if (domObj) {
				obj[dom.nodeName].push(domObj);
			}
		}
		return obj;
	} else {
		return null;
	}
}

var SelectoDetector = {
	tagDetector: /^[^.#]\S+$/,
	idDetector: /^#\S+$/,
	classDetector: /^\.\S+$/,
	testTag: function(selector) {
		return tagDetector.test(selector);
	},
	testId: function(selector) {
		return idDetector.test(selector);
	},
	testClass: function(selector) {
		return classDetector.test(selector);
	}
};

function classifySelector(selectorStr) {
	var selectorArr = selectorStr.trim().split(/\s+/);
	for (var index in selectorArr) {
		if (!(SelectoDetector.testTag(selectorArr[index]) ||
				SelectoDetector.testId(selectorArr[index]) ||
				SelectoDetector.testClass(selectorArr[index]))) {
			return null;
		}
	}
	return selectorArr;
}

function traverseDOMTreeIteration() {
	var stack = [];
	stack.push(document);
	while (stack.length > 0) {
		var dom = stack.pop();
		//处理dom
		console.log(dom.nodeName);
		//将dom的子元素推入栈中
		for (var i = dom.childNodes.length - 1; i >= 0; i--) {
			if (dom.childNodes[i].nodeType == 1) {
				stack.push(dom.childNodes[i]);
			}
		}
	}
}
// traverseDOMTree(document);