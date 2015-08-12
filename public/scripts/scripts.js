$(function() {

var searchSource = $('#search-template').html();
var searchTemplate = Handlebars.compile(searchSource);

var finalSourceFour = $('#result-template-four').html();
var finalTemplateFour = Handlebars.compile(finalSourceFour);

var ratingThreeSource = $('#rating-three').html();
var ratingThreeTemplate = Handlebars.compile(ratingThreeSource);

var favoriteSource = $('#favorite-option').html();
var favoriteTemplate = Handlebars.compile(favoriteSource);

var userTrue = $('#user-true').html();
var userTrueTemplate = Handlebars.compile(userTrue);

var userFalse = $('#user-false').html();
var userFalseTemplate = Handlebars.compile(userFalse);

var toggle = true;

var trackName = '';
var artistName = '';

var lat = 37.7723;
var lng = -122.4514;

var genre1 = '';
var genre2 = '';

var searchAgainURL = '';

var globalUserData;

//regex for queries with ampersand
function replaceString (inputString) {
	var re = /\//;
	return inputString.replace(re, '%2f');
}

//popover functionality
$('[data-toggle="popover"]').popover()

//sets up the view
function setupView() {
	$.get('/v1/me', function (data) {
		if(data) {
			globalUserData = data;
			$('#navbar-view').html(userTrueTemplate({user: data.userName}));
			$('#search-view').html(searchTemplate({user: globalUserData.userName}));
			addEventHandlers();
			$('#track-name').focus();
		} else {
			$('#navbar-view').html(userFalseTemplate());
			$('#search-view').html(searchTemplate({user:'you'}));
			addEventHandlers();
			$('#track-name').focus();
			$('#collapseExample').collapse('show');
		}
	});
}

setupView();

String.prototype.capitalize = function(){
    var stringArr = this.toLowerCase().split(' ');
    function capital(match) {
    	return match.toUpperCase();
    }
    for (i=0;i<stringArr.length; i++) {
    	stringArr[i] = stringArr[i].replace(/^\w/, capital);
    }
    return stringArr.join(' ');
};

function getResult (trackName, artistName) {
	// check to see if song exists
	$.get('/v1/proxy/echo/primary/' + replaceString(artistName) + '/' + replaceString(trackName), function (data) {
		data = JSON.parse(data);
		if (data.response.songs.length !== 0) {

			// query for primary and secondary genres
			$.get('/v1/proxy/echo/secondary/' + replaceString(artistName), function (data) {
				// query with secondary genre for more specificity
				data = JSON.parse(data);
				if (data.response.terms[0]) {	
					genre1 = data.response.terms[0].name; 
					genre2 = data.response.terms[1].name; 

					//ajax request to api search (mapping)
					searchVenue(genre1, genre2);

				} else { alert('No data found. Please try another song!'); }
			});

		} else {
			alert('Are you sure that\'s the correct spelling? We couldn\'t find a match');
		}
	});
}

function searchVenue (genre1, genre2) {
	$.get('/v1/search/' + genre1 + '/' + genre2, function (data) {
		// make call to 4square api
		$.get('/v1/proxy/foursquare/primary/' + data + '/' + lat + '/' + lng, function (data) {
			data = JSON.parse(data);
			// checks that query returns results
			if(data.response.groups[0].items.length > 0) {

				//gets random number from result array length and finds venue
				var ranVenue = Math.floor(Math.random() * data.response.groups[0].items.length);
				var venue = data.response.groups[0].items[ranVenue].venue;

				var venueRatingDeep = (venue.rating || 0.0);

				var finalResult = {
					trackNameResult: trackName.capitalize(),
					artistNameResult: artistName.capitalize(),
					venueName: venue.name,
					venueCat: venue.categories[0].name,
					venueLat: venue.location.lat,
					venueLng: venue.location.lng,
					venueAddressA: venue.location.formattedAddress[0],
					venueAddressB: venue.location.formattedAddress[1],
					venueRating: venueRatingDeep.toFixed(1),
					venueURL: (venue.url || ('http://lmgtfy.com/?q=' + venue.name))
				};

				// hides search template
				$('#search-view').html('');

				// loads correct star result template
				if(finalResult.venueRating > 7.5) {
					$('#result-view').html(finalTemplateFour(finalResult));
				} else {
					$('#result-view').html(finalTemplateFour(finalResult));
					$('#rating').html(ratingThreeTemplate());
				}

				if(globalUserData) {
					$('#favorite').html(favoriteTemplate)
					$('#favorite-result').one('click', function(event) {
						$.ajax({
							url: '/v1/users/' + globalUserData._id,
							type: 'PUT',
							data: finalResult,
							success: function (data) {},
							error: function() {
								alert('Error!');
							}
						});
						$('#heart').addClass('red');
					});
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
					searchVenue(genre1, genre2);
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
}

function addEventHandlers () {
	//on submit of search field
	$('#submit-track').on('submit', function(event) {
		event.preventDefault();
		getResult($('#track-name').val(), $('#artist-name').val());
	});
};

})