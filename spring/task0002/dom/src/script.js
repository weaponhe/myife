function hasClass(node, className) {
	var classNameStr = node.className;
	if (!classNameStr) {
		return false;
	}
	var classArr = classNameStr.split(/\s+/);
	for (var i = 0; i < classArr.length; i++) {
		if (classArr[i] === className) {
			return true;
		}
	}
	return false;
}

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
		return ret;
	}
}