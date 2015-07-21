$(function() {

//put this all in a controller

var searchSource = $('#search-template').html();
var searchTemplate = Handlebars.compile(searchSource);

var finalSource = $('#result-template').html();
var finalTemplate = Handlebars.compile(finalSource);

var userTrue = $('#user-true').html();
var userTrueTemplate = Handlebars.compile(userTrue);

var userFalse = $('#user-false').html();
var userFalseTemplate = Handlebars.compile(userFalse);

var toggle = true;
var albumArtGlobal = '';

var apiKey = 'DGY3JGAZP1OFZR4RO';
var clientID = 'J3QA1RADSXWM43QI0VTSC1EFFCFFZYKPZW2Z2PNVL5YEWU5T';
var clientSecret = 'TRR5QY22ZJWTTGWRXQ50MQIFXC0VHOLC2F3EPG2YRBMIFIXP';

var trackName = '';
var artistName = '';

var globalUserData;

$.get('/v1/me', function (data) {
	if(data) {
		globalUserData = data;
		$('#navbar-view').html(userTrueTemplate({user: data.firstName.capitalize()}));
	} else {
		$('#navbar-view').html(userFalseTemplate())
	}
});

//load search on page load
$('#search-view').html(searchTemplate());

String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};

function getAlbumArt (trackName, artistName) {
	$.get('https://api.spotify.com/v1/search?q=' + trackName + '%20' + artistName + '&type=track', function (data) {
		albumArtGlobal = data.tracks.items[0].album.images[1].url;
	});
}

function getResult (trackName, artistName) {

	// check to see if song exists
	$.get('https://developer.echonest.com/api/v4/song/search?api_key=DGY3JGAZP1OFZR4RO&format=json&results=6&artist=' + artistName + '&title=' + trackName, function (data) {
		if (data.response.songs.length !== 0) {

			getAlbumArt(trackName, artistName);

			// query for primary and secondary genres
				$.get('https://developer.echonest.com/api/v4/artist/terms?api_key=' + apiKey + '&name=' + artistName + '&format=json', function(data) {
					// query with secondary genre for more specificity
					if (toggle) {	
						genre1 = data.response.terms[0].name; 
						genre2 = data.response.terms[1].name; 

						if (data.response.terms) {
						
						//get venue
						// HANDLEBARS genre templateing
						// var genres = {genreOne: genre1, genreTwo: genre2};
						// $('#result-display-primary').html(template(genres));

						// Map genre to food!
						// var mapResult = mapGenre(genre1, genre2);
						
						// HANDLEBARS food templating
						// var food = { food: mapResult };
						// $('#result-display-secondary').html(foodTemplate(food));
						$.get('/v1/search/' + genre1 + '/' + genre2, function (data) {
						// make call to 4square api
							$.get('https://api.foursquare.com/v2/venues/explore?client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20130815%20&near=san+francisco&limit=10&query=' + data, function (data) {
								// checks that query returns 5 results
								if(data.response.groups[0].items.length > 9) {
									var ranVenue = Math.floor(Math.random() * 10);
									var venue = data.response.groups[0].items[ranVenue].venue;

									var trackNameDeep = trackName.capitalize();
									var artistNameDeep = artistName.capitalize();

									var finalResult = {
										trackNameResult: trackNameDeep,
										artistNameResult: artistNameDeep,
										albumArt: albumArtGlobal,
										venueName: venue.name,
										venueCat: venue.categories[0].name,
										venueLat: venue.location.lat,
										venueLng: venue.location.lng,
										venueAddressA: venue.location.formattedAddress[0],
										venueAddressB: venue.location.formattedAddress[1],
										venueRating: venue.rating,
										venueURL: venue.url
									};

									if(globalUserData) {
										console.log(globalUserData);
										$.ajax({
											url: '/v1/users/' + globalUserData._id,
											type: 'PUT',
											data: finalResult,
											success: function (data) {
												console.log('heyyo');
											},
											error: function() {
												alert('Error!');
											}
										});
									}

									$('#search-view').html('');
									$('#result-view').html(finalTemplate(finalResult));

									//on new search click
									$('#new-search').on('click', function(event) {
										event.preventDefault();
										
										$('#result-view').html('');
										$('#search-view').html(searchTemplate());
										addEventHandlers();
									});

									//on search again click
									$('#search-again').on('click', function(event) {
										event.preventDefault();
										getResult(trackName, artistName);
									})

									//set up map
									var map = L.map('map').setView([finalResult.venueLat, finalResult.venueLng], 15);

									//add tile
									//dark - http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png
									//light - http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png
									L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
									    attribution: '',
									    maxZoom: 20,
									}).addTo(map);

									//add marker
									var marker = L.marker([finalResult.venueLat, finalResult.venueLng]).addTo(map);

								} else {
									alert('Oops! Something went wrong ... Try again!');
								}
							});
						});

						//set toggle
						toggle = true;

						} else { alert('Seems like that song doesn\'t exist ... Try a different search!'); }
					}
				});

		} else {
			alert('Seems like that song doesn\'t exist ... Try a different search!');
		}
	});
}

//on submit of search field
$('#submit-track').on('submit', function(event) {
	event.preventDefault();
	// var word = { track: $('#track-name').val(), artist: $('#artist-name').val()};

	getResult($('#track-name').val(), $('#artist-name').val());
});

function addEventHandlers () {
	//on submit of search field
	$('#submit-track').on('submit', function(event) {
		event.preventDefault();
		// var word = { track: $('#track-name').val(), artist: $('#artist-name').val()};
		getResult($('#track-name').val(), $('#artist-name').val());
	});
};

})