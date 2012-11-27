$(function(){

var time = {},
		breakdown;
	
$('#go').on('click', function() {

	time = {
		value: $('#time').val()
	};
	
	time.validFormat = /\d\d\:\d\d/.test(time.value);

	breakdown = time.value.match(/(\d\d):(\d\d)/)

	if (breakdown === null) {
		alert('not in the right format');
	} else {
		time.hours = parseInt(breakdown[1]);
		time.minutes = parseInt(breakdown[2]);
	}

	if (!time.validFormat) {
		alert('not in 24 hour format');
	} else if (time.hours > 24 || time.minutes > 60) {
		alert('not a valid time');
	} else {
		process(time);
	}

});

function process(time) {

	var minsModifier = {
			0: 'exactly ',
			1: 'five ',
			2: 'ten ',
			3: 'a quarter ',
			4: 'twenty ',
			5: 'twenty five ',
			6: 'half '
		},
		hourModifier = {
			00: 'midnight',
			01: 'one',
			02: 'two',
			03: 'three',
			04: 'four',
			05: 'five',
			06: 'six',
			07: 'seven',
			08: 'eight',
			09: 'nine',
			10: 'ten',
			11: 'eleven',
			12: 'noon'
		},
		leftoverMinutes = {
			0: 'it\'s ',
			1: 'just gone ',
			2: 'after ',
			3: 'nearly ',
			4: 'almost '
		},
		modifier = 'past ',
		minIncrementor = 0;

		if (time.minutes > 32) {
			time.minutes = 60 - time.minutes;
			modifier = 'to ';
			incrementHour();
			leftoverMinutes[5] = leftoverMinutes[1];
			leftoverMinutes[1] = leftoverMinutes[4];
			leftoverMinutes[4] = leftoverMinutes[5];
			leftoverMinutes[5] = leftoverMinutes[2];
			leftoverMinutes[2] = leftoverMinutes[3];
			leftoverMinutes[3] = leftoverMinutes[5];
			delete leftoverMinutes[5];
		}

		if (time.minutes%5 > 2) {
			minIncrementor = 1;
		}

	$('#output').text(
		leftoverMinutes[time.minutes%5] + 
		minsModifier[Math.floor(time.minutes/5) + minIncrementor] + 
		(!!Math.floor(time.minutes/5) ? modifier : '') + 
		hourModifier[time.hours===12?12:time.hours%12]
	);
}

function incrementHour() {
	if (time.hours === 23) {
		time.hours = 00;
	} else {
		time.hours++;
	}
}

});