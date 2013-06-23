
var hideArrows = function() {

	$('div.arrow-up').hide();
	$('.main-container > div').hide();
	$('.main').show();
}

var set_Alarm_Item = function() {
	hideArrows();

	$('div.alarm').fadeIn();
	$('div.al').fadeIn();

}
var about_Item = function() {
	hideArrows();
	$('div.about').fadeIn();
	$('div.ab').fadeIn();

}
$(document).ready( (function() {
	hideArrows();
	$('nav ul li a#about').click(about_Item);
	$('nav ul li a#set').click(set_Alarm_Item);
	$('.main').click(hideArrows);
}));



