$(function() {

var source   = $("#test-template").html();
var template = Handlebars.compile(source);

var apiKey = 'DGY3JGAZP1OFZR4RO';

function convertArtist () {

}

$('#submit-track').on('submit', function(event) {
	event.preventDefault();
	var word = { track: $('#track-name').val(), artist: $('#artist-name').val()};
	var genre;


	// $.get('https://api.spotify.com/v1/search?q=' + $('#artist-name').val() + '&type=artist', function(data) {
	// 	console.log(data);

	// 	genre = data.artists.items[0].genres[0]; 

	// 	splitted = genre.split(' ');

	// 	console.log(splitted);

	// 	var genres = {genreOne: splitted[0], genreTwo: splitted[1], genreThree: splitted[0]};

	// 	$('#result-display').html(template(genres));
	// 	console.log(genre); 
	// });

	$.get('http://developer.echonest.com/api/v4/artist/terms?api_key=' + apiKey + '&name=' + $('#artist-name').val() + '&format=json', function(data) {
			genre = data.response.terms[0].name; 
			genre2 = data.response.terms[1].name; 
			genre3 = data.response.terms[2].name; 

			// splitted = genre.split(' ');
			if(genre) {
				console.log(genre);

				var genres = {genreOne: genre, genreTwo: genre2, genreThree: genre3};

				$('#result-display').html(template(genres));
				console.log(genre); 
			} else {
				console.log('sorry please try again');
			}
		});

});


})