function handleInput() {
	var ipt_hobit = $("#ipt-hobit"),
		area_hint = $("#area-hint"),
		area_display = $("#area-display");

	var hobitStr = ipt_hobit.value;
	var hobitArr = uniqArray(hobitStr.split(/[,\uff0c\u3001\s\r;]/));

	for (var i = 0; i < hobitArr.length; i++) {
		console.log("for");
		if (/^\s*$/.test(hobitArr[i])) {
			hobitArr.splice(i--, 1);
		}
	}

	if (hobitArr.length == 0 || hobitArr.length > 10) {
		area_hint.innerHTML = "you didn't input any hobits OR you have more than hobits.";
	} else {
		area_hint.innerHTML = "";
		area_display.innerHTML = "";

		for (var i = 0, len = hobitArr.length; i < len; i++) {
			var checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");
			checkbox.setAttribute("id", hobitArr[i]);
			var label = document.createElement("label");
			label.setAttribute("for", hobitArr[i]);
			var text = document.createTextNode(hobitArr[i]);
			label.appendChild(text);
			area_display.appendChild(label);
			area_display.appendChild(checkbox);
		}
	}
}
addClickEvent($("#btn-submit"), handleInput);