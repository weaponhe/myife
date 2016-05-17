var suggestData = ['Simon', 'Erik', 'Kener', 'Kenerqwe', 'Kenerasd', 'Simonc', 'Simonb', 'Simona'];

var input = document.getElementById("search-input");
var display = document.getElementById("display");
var ul = display.getElementsByTagName("ul")[0];
var lastResult = [];
var lastKey = "";
input.onkeyup = function(e) {
	var key = e.target.value;
	if (key == "") {
		display.style.display = "none";
	} else if (key != lastKey) {
		var result = suggust(key);
		if (!isSameArray(result, lastResult)) {
			lastResult = result;
			if (result.length) {
				ul.innerHTML = "";
				var innerHTML = "";
				for (var i = 0, len = result.length; i < len; i++) {
					innerHTML += "<li>" + "<span>" +
						key + "</span>" +
						result[i].slice(key.length, result[i].length) +
						"</li>"
				}
				ul.innerHTML = innerHTML;
				display.style.display = "block";
			} else {
				display.style.display = "none";
			}
		} else {
			var lis = ul.getElementsByTagName("li");
			var innerHTML = "";
			for (var i = 0, len = lis.length; i < len; i++) {
				innerHTML = "<span>" +
					key + "</span>" +
					result[i].slice(key.length, result[i].length);
				lis[i].innerHTML = innerHTML;
			}
		}
	}
	lastKey = key;
};
input.onkeydown = function(e) {
	var keyCode = e.keyCode;
	var lis = document.getElementsByTagName("li");
	if (keyCode == 38) {
		var i, len;
		for (i = 0, len = lis.length; i < len; i++) {
			if (hasClass(lis[i], "selected")) {
				break;
			}
		}
		//finded
		if (i > 0 && i < len) {
			removeClass(lis[i], "selected");
			addClass(lis[i - 1], "selected");
		}
	} else if (keyCode == 40) {
		var i, len;
		for (i = 0, len = lis.length; i < len; i++) {
			if (hasClass(lis[i], "selected")) {
				break;
			}
		}
		// not finded
		if (i > len - 1) {
			addClass(lis[0], "selected");
		} else if (i < len - 1) {
			removeClass(lis[i], "selected");
			addClass(lis[i + 1], "selected");
		}
	} else if (keyCode == 13) {
		console.log("enter");
		e.target.value = $(".selected").innerHTML.replace(/<\/?span>/g, "")
	}
}

ul.onclick = function(e) {
	var lis = document.getElementsByTagName("li");
	for (var i = 0, len = lis.length; i < len; i++) {
		removeClass(lis[i], "selected");
	}
	addClass(e.target, "selected");
	input.focus();
}

function suggust(key) {
	var maxSuggestNum = 4;
	var result = [];
	for (var i = 0, len = suggestData.length; i < len; i++) {
		if (suggestData[i].indexOf(key) == 0) {
			result.push(suggestData[i]);
		}
	}
	result.sort();
	return result.length > maxSuggestNum ? result.slice(0, 4) : result;
}

function isSameArray(arr1, arr2) {
	if (arr1.length == arr2.length) {
		for (var i = 0, len = arr1.length; i < len; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
}