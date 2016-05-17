var leftBox = $("#left-box");
var rightBox = $("#right-box");
var leftRect = leftBox.getBoundingClientRect();
var rightRect = rightBox.getBoundingClientRect();
var movingBrick = null;

document.onmousemove = handleMouseMove;
leftBox.onmousedown = handleMouseDown;
rightBox.onmousedown = handleMouseDown;
document.onmouseup = handleMouseUp;

function handleMouseMove(event) {
	event = getEvent(event);
	if (movingBrick) {
		movingBrick.style.left = event.clientX + "px";
		movingBrick.style.top = event.clientY + "px";
	}
}

function handleMouseDown(event) {
	event = getEvent(event);
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
	var target = getTarget(event);
	if (hasClass(target, "brick")) {
		movingBrick = target;
		target.style.position = "absolute";
		target.style.opacity = "0.4";
	}
}

function handleMouseUp(event) {
	event = getEvent(event);
	var target = getTarget(event);
	if (movingBrick) {
		if (event.clientX > leftRect.left &&
			event.clientX < leftRect.left + leftBox.offsetWidth &&
			event.clientY > leftRect.top &&
			event.clientY < leftRect.top + leftBox.offsetHeight
		) {
			leftBox.appendChild(movingBrick);
		}
		if (event.clientX > rightRect.left &&
			event.clientX < rightRect.left + rightBox.offsetWidth &&
			event.clientY > rightRect.top &&
			event.clientY < rightRect.top + rightBox.offsetHeight) {
			rightBox.appendChild(movingBrick);
		}
		movingBrick.style.position = "static";
		movingBrick.style.left = 0;
		movingBrick.style.top = 0;
		movingBrick.style.opacity = 1;
		movingBrick = null;
	}
}

function getEvent(event) {
	return event ? event : window.event;
}

function getTarget(event) {
	return event.target || event.srcElement;
}