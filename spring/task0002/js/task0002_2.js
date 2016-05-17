function handleInterval(targetDate) {
	var intervalOfOneSecond = 1000,
		intervalOfOneMinute = intervalOfOneSecond * 60,
		intervalOfOneHour = intervalOfOneMinute * 60,
		intervalOfOneDay = intervalOfOneHour * 24;
	var interval = Math.abs(targetDate - new Date());
	var days = Math.floor(interval / intervalOfOneDay);
	interval %= intervalOfOneDay;
	var hours = Math.floor(interval / intervalOfOneHour);
	interval %= intervalOfOneHour;
	var minutes = Math.floor(interval / intervalOfOneMinute);
	interval %= intervalOfOneMinute;
	var seconds = Math.floor(interval / intervalOfOneSecond);
	return {
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds
	}
}

function handleClick() {
	var ipt_date = $("#ipt-date"),
		area_display = $("#area-display");
	var dateStr = ipt_date.value;
	var dateArr = dateStr.split("-");
	var targetDate = new Date(dateArr.join("/"));
	var intervalId = setInterval(function() {
		var interval = handleInterval(targetDate);
		if (interval.days == 0 &&
			interval.hours == 0 &&
			interval.minutes == 0 &&
			interval.seconds == 0) {
			area_display.innerHTML = "";
			clearInterval(intervalId);
		} else {
			area_display.innerHTML = "距离" +
				targetDate.getFullYear() + "年" +
				(targetDate.getMonth() + 1) + "月" +
				targetDate.getDate() + "日" +
				"还有" + interval.days + "天" +
				interval.hours + "小时" +
				interval.minutes + "分" +
				interval.seconds + "秒";
		}
	}, 1000);
}

addClickEvent($("#btn-submit"), handleClick)