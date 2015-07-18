$(function() {

var source   = $("#test-template").html();
var template = Handlebars.compile(source);

$('#submit-track').on('click', function(event) {
	event.preventDefault();
	var word = { track: $('#track-name').val(), artist: $('#artist-name').val()};

	console.log('hello butt face');
	$('#result-display').html(template(word));

});

})