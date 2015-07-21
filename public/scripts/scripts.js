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

var lat = 37.7833;
var lng = -122.4167;

function saveGeo(position) {
	lat = position.coords.latitude;
	lng = position.coords.longitude;
}

var geo = navigator.geolocation.getCurrentPosition(saveGeo);

var globalUserData;

function setupView() {
	$.get('/v1/me', function (data) {
		if(data) {
			globalUserData = data;
			$('#navbar-view').html(userTrueTemplate({user: data.firstName.capitalize()}));
			$('#search-view').html(searchTemplate({user: globalUserData.firstName.capitalize()}));
			addEventHandlers();
		} else {
			$('#navbar-view').html(userFalseTemplate());
			$('#search-view').html(searchTemplate({user:'you'}));
			addEventHandlers();
		}
	});
}

setupView();

//load search on page load
// $('#search-view').html(searchTemplate({user:'you'}));

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
						
						//ajax request to api search (mapping)
						$.get('/v1/search/' + genre1 + '/' + genre2, function (data) {
							console.log(lat,lng);
						// make call to 4square api
							$.get('https://api.foursquare.com/v2/venues/explore?client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20130815%20&ll=' + lat + ',' + lng + '&llAcc=10000.0&limit=10&query=' + data, function (data) {
								// checks that query returns 5 results
								if(data.response.groups[0].items.length > 1) {
									var ranVenue = Math.floor(Math.random() * data.response.groups[0].items.length);
									var venue = data.response.groups[0].items[ranVenue].venue;

									var trackNameDeep = trackName.capitalize();
									var artistNameDeep = artistName.capitalize();
									var venueRatingDeep = (venue.rating.toFixed(1) || 0.0)

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
										venueRating: venueRatingDeep,
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
										setupView();
									});

									//on search again click
									$('#search-again').on('click', function(event) {
										event.preventDefault();
										getResult(trackName, artistName);
									})

									//set up map
									var map = L.map('map').setView([finalResult.venueLat, finalResult.venueLng], 12);

									//add tile
									//dark - http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png
									//light - http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png
									L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
									    attribution: '',
									    maxZoom: 20,
									    id: 'icivgin.b6d584ee',
									    accessToken: 'pk.eyJ1IjoiaWNpdmdpbiIsImEiOiI3MmVjZmMyNmM2ZWYxMGQ2MDAzMWU5MDhiZGI5ZmJkNSJ9.uOGm9rJve_i8WdJFKT3ljg'
									}).addTo(map);

									//add marker
									var marker = L.marker([finalResult.venueLat, finalResult.venueLng]).addTo(map);

								} else {
									console.log(data);
									alert('Not enough data');
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

function addEventHandlers () {
	//on submit of search field
	$('#submit-track').on('submit', function(event) {
		event.preventDefault();
		// var word = { track: $('#track-name').val(), artist: $('#artist-name').val()};
		getResult($('#track-name').val(), $('#artist-name').val());
	});
};

})