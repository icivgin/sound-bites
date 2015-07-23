$(function() {

var searchSource = $('#search-template').html();
var searchTemplate = Handlebars.compile(searchSource);

var finalSourceFour = $('#result-template-four').html();
var finalTemplateFour = Handlebars.compile(finalSourceFour);

var ratingThreeSource = $('#rating-three').html();
var ratingThreeTemplate = Handlebars.compile(ratingThreeSource);

var userTrue = $('#user-true').html();
var userTrueTemplate = Handlebars.compile(userTrue);

var userFalse = $('#user-false').html();
var userFalseTemplate = Handlebars.compile(userFalse);

var toggle = true;
var albumArtGlobal = 'http://gadgtmag.com/media/uploads/2012/10/album-art-missing.png';

var apiKey = 'DGY3JGAZP1OFZR4RO';
var clientID = 'J3QA1RADSXWM43QI0VTSC1EFFCFFZYKPZW2Z2PNVL5YEWU5T';
var clientSecret = 'TRR5QY22ZJWTTGWRXQ50MQIFXC0VHOLC2F3EPG2YRBMIFIXP';

var trackName = '';
var artistName = '';

var lat = 37.7833;
var lng = -122.4167;

var globalUserData;

//popover functionality
$('[data-toggle="popover"]').popover()

//retrieving current location
function saveGeo(position) {
	// console.log('Location found');
	addEventHandlers();
	$('#submit-button').html('Search').css('background-color', '#1498B8').css('border-color', '#1498B8');
	lat = position.coords.latitude;
	lng = position.coords.longitude;
}

var geo = navigator.geolocation.getCurrentPosition(saveGeo);

//sets up the view
function setupView() {
	$.get('/v1/me', function (data) {
		if(data) {
			globalUserData = data;
			$('#navbar-view').html(userTrueTemplate({user: data.firstName.capitalize()}));
			$('#search-view').html(searchTemplate({user: globalUserData.firstName.capitalize()}));
			addEventHandlers();
			$('#track-name').focus();
		} else {
			$('#navbar-view').html(userFalseTemplate());
			$('#search-view').html(searchTemplate({user:'you'}));
			addEventHandlers();
			$('#track-name').focus();
		}
	});
}

//sets up the initial view
function setupFirstView() {
	$.get('/v1/me', function (data) {
		if(data) {
			globalUserData = data;
			$('#navbar-view').html(userTrueTemplate({user: data.firstName.capitalize()}));
			$('#search-view').html(searchTemplate({user: globalUserData.firstName.capitalize()}));
			$('#submit-button').html('Finding your location ...').css('background-color', 'grey').css('border-color', 'grey');
			$('#track-name').focus();
		} else {
			$('#navbar-view').html(userFalseTemplate());
			$('#search-view').html(searchTemplate({user:'you'}));
			$('#submit-button').html('Finding your location ...').css('background-color', 'grey').css('border-color', 'grey');
			$('#track-name').focus();
		}
	});
}

//run setupFirstView on page load
setupFirstView();

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

			// retrieve album art from spotify
			getAlbumArt(trackName, artistName);

			// query for primary and secondary genres
			$.get('https://developer.echonest.com/api/v4/artist/terms?api_key=' + apiKey + '&name=' + artistName + '&format=json', function(data) {
				
				// query with secondary genre for more specificity
				if (data.response.terms[0]) {	
					genre1 = data.response.terms[0].name; 
					genre2 = data.response.terms[1].name; 

					// Show genre toggle (testing)
					// console.log(genre1, genre2);
					
					//ajax request to api search (mapping)
					$.get('/v1/search/' + genre1 + '/' + genre2, function (data) {
						
						// make call to 4square api
						$.get('https://api.foursquare.com/v2/venues/explore?client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20130815%20&ll=' + lat + ',' + lng + '&llAcc=10000.0&radius=10000&limit=10&query=' + data, function (data) {
							
							// checks that query returns results
							if(data.response.groups[0].items.length > 0) {

								//gets random number from result array length and finds venue
								var ranVenue = Math.floor(Math.random() * data.response.groups[0].items.length);
								var venue = data.response.groups[0].items[ranVenue].venue;

								var venueRatingDeep = (venue.rating || 0.0);

								var finalResult = {
									trackNameResult: trackName.capitalize(),
									artistNameResult: artistName.capitalize(),
									albumArt: albumArtGlobal,
									venueName: venue.name,
									venueCat: venue.categories[0].name,
									venueLat: venue.location.lat,
									venueLng: venue.location.lng,
									venueAddressA: venue.location.formattedAddress[0],
									venueAddressB: venue.location.formattedAddress[1],
									venueRating: venueRatingDeep.toFixed(1),
									venueURL: venue.url
								};

								if(globalUserData) {
									$.ajax({
										url: '/v1/users/' + globalUserData._id,
										type: 'PUT',
										data: finalResult,
										success: function (data) {},
										error: function() {
											alert('Error!');
										}
									});
								}

								// hides search template
								$('#search-view').html('');

								// loads correct star result template
								if(finalResult.venueRating > 7.5) {
									$('#result-view').html(finalTemplateFour(finalResult));
								} else if (finalResult.venueRating > 5) {
									$('#result-view').html(finalTemplateFour(finalResult));
									$('#rating').html(ratingThreeTemplate());

								}

								//Add event handlers
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
								});

								// set up map
								var map = L.map('map').setView([finalResult.venueLat, finalResult.venueLng], 12);

								L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
								    attribution: '',
								    maxZoom: 20,
								    id: 'icivgin.b6d584ee',
								    accessToken: 'pk.eyJ1IjoiaWNpdmdpbiIsImEiOiI3MmVjZmMyNmM2ZWYxMGQ2MDAzMWU5MDhiZGI5ZmJkNSJ9.uOGm9rJve_i8WdJFKT3ljg'
								}).addTo(map);

								// add marker
								var marker = L.marker([finalResult.venueLat, finalResult.venueLng]).addTo(map);

							} else {
								alert('No data found. Please try again!');
							}
						});
					});

				} else { alert('No data found. Please try another song!'); }
			});

		} else {
			alert('Are you sure that\'s the correct spelling? We couldn\'t find a match');
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