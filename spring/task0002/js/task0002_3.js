// configureSlider($(".slideset"), $(".slide"), true, true, 2000);

function extend(target, options) {
	for (var key in options) {
		if (options.hasOwnProperty(key)) {
			target[key] = options[key];
		}
	}
	return target;
}

function Slider(options) {
	this.statusMap = {
		index: 0,
		prefix: 'slider',
		itemClass: 'slider-item',
		interval: 5000,
		loop: 1,
		effect: null
	};
	extend(this.statusMap, options);
	this.jqMap = {};
	this.setJqMap();
	this.statusMap.count = this.jqMap.items.length;

	if (this.statusMap.effect) {
		this.statusMap.effect.bindTarget(this);
	}

	this.slide(this.statusMap.index);
}

Slider.prototype.setJqMap = function() {
	this.jqMap.main = $('.' + this.statusMap.prefix);
	this.jqMap.items = $('.' + this.statusMap.prefix + ' ' + '.' + this.statusMap.itemClass);
	this.jqMap.stage = $('.' + this.getPartClass('inner'));
}

Slider.prototype.getPartClass = function(part) {
	return this.statusMap.prefix + '-' + part;
};

Slider.prototype.slide = function(index, nextIndex) {
	if (nextIndex != undefined) {
		effect.start();
	} else {
		this.initCSS();
	}
	this.updateStatus();
	var self = this;
	setTimeout(function() {
		self.slide(self.statusMap.index, self.statusMap.nextIndex);
	}, this.statusMap.interval)
}

Slider.prototype.updateStatus = function() {
	if (!this.statusMap.nextIndex) {
		this.statusMap.index = 0;
		this.statusMap.nextIndex = this.statusMap.count > 0 ? 1 : 0;
	} else {
		this.jqMap.items[this.statusMap.index].style.left = "100%";
		this.statusMap.index++;
		this.statusMap.nextIndex++;
		if (this.statusMap.count == this.statusMap.index) {
			this.statusMap.nextIndex = 0;
		}
		if (this.statusMap.count == this.statusMap.nextIndex) {
			this.statusMap.nextIndex = 0;
		}
	}
}

Slider.prototype.initCSS = function() {
	this.jqMap.main.style.position = "relative";
	this.jqMap.main.style.overflow = "hidden";
	this.jqMap.main.style.height = "100px";

	var items = this.jqMap.items;
	for (var i = 0, len = items.length; i < len; i++) {
		items[i].style.height = "100px";
		items[i].style.position = "absolute";
		items[i].style.width = "100%"
		if (i != 0) {
			items[i].style.left = "100%"
		}
	}
}



function Animation(options) {
	this.duration = 3000;
	this.smooth = 600;
	extend(this, options);
}

Animation.prototype.bindTarget = function(target) {
	this.target = target;
}

Animation.prototype.start = function() {
	var currentTarget = this.target.jqMap.items[this.target.statusMap.index];
	var nextTarget = this.target.jqMap.items[this.target.statusMap.nextIndex];
	var duration = this.duration;
	var elapse = this.duration;
	var iterval = this.duration / this.smooth;
	animate();

	function animate() {
		if (elapse >= 0) {
			currentTarget.style.left = -(1 - (elapse / duration)) * 100 + "%";
			nextTarget.style.left = (elapse / duration) * 100 + "%";

			elapse -= iterval;

			setTimeout(animate, iterval);
		}
	}
}