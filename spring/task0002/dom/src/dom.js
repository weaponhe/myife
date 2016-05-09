/**
 * String.prototype.trim兼容旧版本
 */
if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}

/**
 * [hasClass 检测element是否有className类]
 * @param  {[type]}  element   [Dom元素]
 * @param  {[type]}  className [待检测类名]
 * @return {Boolean}           [description]
 */
function hasClass(element, className) {
	var classNameStr = element.className;
	if (!classNameStr) {
		return false;
	}
	var classArr = classNameStr.trim().split(/\s+/);
	for (var i = 0; i < classArr.length; i++) {
		if (classArr[i] == className) {
			return true;
		}
	}
	return false;
}

/**
 * [addClass 为element增加一个样式名为newClassName的新样式]
 * @param {[type]} element      [Dom元素]
 * @param {[type]} newClassName [待增加类名]
 */
function addClass(element, newClassName) {
	if (!hasClass(element, newClassName)) {
		element.className += " " + newClassName;
	}
}

/**
 * [removeClass 移除element中的样式oldClassName]
 * @param  {[type]} element      [Dom元素]
 * @param  {[type]} oldClassName [待删除类名]
 * @return {[type]}              [description]
 */
function removeClass(element, oldClassName) {
	var classNameStr = element.className;
	var classArr = classNameStr.trim().split(/\s+/);
	for (var i = 0, len = classArr.length; i < len; i++) {
		if (classArr[i] === oldClassName) {
			classArr.splice(i, 1);
			break;
		}
	}
	element.className = classArr.join(" ");
}

/**
 * [isSiblingNode 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值]
 * @param  {[type]}  element     [description]
 * @param  {[type]}  siblingNode [description]
 * @return {Boolean}             [description]
 */
function isSiblingNode(element, siblingNode) {
	return element.parentNode === siblingNode.parentNode;
}

/**
 * [getPosition 获取element相对于浏览器窗口的位置，返回一个对象{x, y}]
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function getPosition(element) {
	//可以使用element.getBoundingClientRect()
	var x = element.offsetLeft;
	var current = element.offsetParent;
	while (current) {
		x += current.offsetLeft - current.scrollLeft;
		current = current.offsetParent;
	}
	var y = element.offsetTop;
	current = element.offsetParent;
	while (current) {
		y += current.offsetTop - current.scrollTop;
		current = current.offsetParent;
	}
	return {
		x: x,
		y: y
	};
}

/**
 * [$ mini jQuery]
 * @param  {[type]} selector [选择器]
 * @return {[type]}          [description]
 */
function $(selector) {
	var idReg = /^#([\w_\-]+)/,
		classReg = /^\.([\w_\-]+)/,
		tagReg = /^\w+$/i,
		attrReg = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/;
	var result = [];
	var selectorArr = selector.split(/\s+/);
	return search(selectorArr);

	function direct(part, actions) {
		var regResult;
		var fn,
			params = [].slice.call(arguments, 2);
		if (regResult = part.match(idReg)) {
			fn = "id";
			params.push(regResult[1]);
		} else if (regResult = part.match(classReg)) {
			fn = "className";
			params.push(regResult[1]);
		} else if (regResult = part.match(tagReg)) {
			fn = "tag";
			params.push(regResult[0]);
		} else if (regResult = part.match(attrReg)) {
			fn = "attribute";
			params.push(regResult[1], regResult[2], regResult[4]);
		}
		return actions[fn].apply(null, params);
	}

	function filterParents(parts, result) {
		var actions = {
			id: function(node, id) {
				return node.id == id;
			},
			className: function(node, className) {
				return hasClass(node, className);
			},
			tag: function(node, tagName) {
				return node.nodeName.toLowerCase() == tagName.toLowerCase();
			},
			attribute: function(node, tag, key, value) {
				var sameTag = false;
				var hasAttribute = false;

				if (tag) {
					sameTag = (node.nodeName.toLowerCase() === tag.toLowerCase());
				} else {
					sameTag = true;
				}

				if (node.getAttribute(key) != null) {
					hasAttribute = true;
				} else {
					hasAttribute = false;
				}

				if (sameTag && hasAttribute) {
					if (value === "" || node.getAttribute(key) === value) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		};
		var part = parts.pop();
		for (var i = 0; i < result.length; i++) {
			var p = result[i].pinhead;
			var searchResult = false;
			while (p = p.parentNode) {
				searchResult = direct(part, actions, p);
				if (searchResult) {
					break;
				}
			}
			if (searchResult) {
				result[i].pinhead = p;
			} else {
				result.splice(i--, 1);
			}
		}
		return parts[0] && result[0] ? filterParents(parts, result) : result;
	}

	function search(parts) {
		var result = [];
		var actions = {
			id: function(id) {
				var node = document.getElementById(id);
				result.push({
					target: node,
					pinhead: node
				});
			},
			className: function(className) {
				var nodes = [];
				if (document.getElementByClassName) {
					nodes = document.getElementsByClassName(className);
				} else {
					var elements = document.getElementsByTagName("*");
					for (var i = 0, len = elements.length; i < len; i++) {
						if (hasClass(elements[i], className)) {
							nodes.push(elements[i]);
						}
					}
				}
				for (var i = 0, len = nodes.length; i < len; i++) {
					result.push({
						target: nodes[i],
						pinhead: nodes[i]
					});
				}

			},
			tag: function(tagName) {
				var nodes = document.getElementsByTagName(tagName);
				for (var i = 0, len = nodes.length; i < len; i++) {
					result.push({
						target: nodes[i],
						pinhead: nodes[i]
					});
				}
			},
			attribute: function(tag, key, value) {
				var nodes = [];
				var elements = document.getElementsByTagName("*");
				for (var i = 0, len = elements.length; i < len; i++) {
					var sameTag = false;
					var hasAttribute = false;
					var node = elements[i];
					if (tag) {
						sameTag = (node.nodeName.toLowerCase() === tag.toLowerCase());
					} else {
						sameTag = true;
					}

					if (node.getAttribute(key) != null) {
						hasAttribute = true;
					} else {
						hasAttribute = false;
					}

					if (sameTag && hasAttribute) {
						if (value === "" || node.getAttribute(key) === value) {
							nodes.push(elements[i]);
						}
					}
				}

				for (var i = 0, len = nodes.length; i < len; i++) {
					result.push({
						target: nodes[i],
						pinhead: nodes[i]
					});
				}
			}
		}
		var part = parts.pop();
		if (part) {
			direct(part, actions);
		}
		return parts[0] && result[0] ? decode(filterParents(parts, result)) : decode(result);
	}

	function decode(result) {
		var ret = [];
		for (var i = 0, len = result.length; i < len; i++) {
			ret.push(result[i].target);
		}
		return ret[1] ? ret : ret[0];
	}
}
$.on = function(selector, event, listener) {
	var element = $(selector);
	try {
		element.addEventListener(event, listener, false);
	} catch (ex) {
		element.attachEvent("on" + event, listener);
	}
}
$.un = function(selector, event, listener) {
	var element = $(selector);
	try {
		element.removeEventListener(event, listener);
	} catch (ex) {
		element.detachEvent("on" + event, listener);
	}
}
$.click = function(selector, listener) {
	var element = $(selector);
	addEvent(element, "click", listener);
}
$.enter = function(selector, listener) {
	var element = $(selector);
	element.onkeydown = function(e) {
		e = e || window.event;
		if (e.keyCode == 13) {
			listener.call(null, e);
		}
	}
}
$.delegate = function(selector, tag, eventName, listener) {
	var element = $(selector);
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