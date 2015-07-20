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

$.get('/api/me', function (data) {
	if(data) {
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

function mapGenre (placeholder1, placeholder2) {
	var random = Math.floor(Math.random() * 10);

	if (placeholder1 == 'pop' || placeholder1 == 'teen pop' || placeholder1 == 'k-pop' || placeholder1 == 'dance pop' ) {
		var optionArr = [
			'boba tea',
			'froyo',
			'frozen yogurt',
			'ice cream',
			'juice',
			'smoothie',
			'organic food',
			'salad wrap',
			'salad',
			'fresh'
		];
		return optionArr[random];

	} else if (placeholder1 == 'rock' || placeholder1 == 'jam band' || placeholder1 == 'classic rock' || placeholder1 == 'blues-rock') {
		var optionArr = [
			'burgers',
			'burgers and fries',
			'american grill',
			'beer',
			'steaks',
			'brewery',
			'live music',
			'sports bar',
			'grill',
			'burgers'
		];
		return optionArr[random];

	} else if (placeholder1 == 'indie folk' || placeholder1 == 'singer-songwriter' || placeholder1 == 'native american' || placeholder1 == 'bluegrass' || placeholder1 == 'new wave' || placeholder1 == 'alternative' || placeholder1 == 'indie pop') {
		var optionArr = [
			'coffee',
			'brunch',
			'vegan',
			'brewery',
			'small plates',
			'wine bar',
			'organic restaurant',
			'locally sourced',
			'farm to table',
			'homestyle'
		];
		return optionArr[random];

	} else if (placeholder1 == 'rap' || placeholder1 == 'hip hop' || placeholder1 == 'gangster rap' || placeholder1 == 'old school hip hop' || placeholder1 == 'cajun' || placeholder1 == 'blues' ) {
		var optionArr = [
			'fried chicken',
			'cajun',
			'southern food',
			'steak',
			'ribs',
			'waffles',
			'soul food',
			'speakeasy bar',
			'hip hop bar',
			'night club lounge'
		];
		return optionArr[random];

	} else if (placeholder1 == 'r&b' || placeholder1 == 'soul' ) {
		var optionArr = [
			'creole',
			'soul food',
			'cajun',
			'southern',
			'cocktails',
			'steak and wine',
			'whisky',
			'speakeasy bar',
			'oysters',
			'good cocktails'
		];
		return optionArr[random];

	} else if (placeholder1 == 'edm' || placeholder1 == 'dubstep' || placeholder1 == 'electronica' || placeholder1 == 'electronic' || placeholder1 == 'eurodance' || placeholder1 == 'experimental' || placeholder1 == 'house' || placeholder1 == 'german techno' || placeholder1 == 'glitch' || placeholder1 == 'techno' || placeholder1 == 'trance' || placeholder1 == 'drum and bass' ) {
		var optionArr = [
			'party',
			'loud',
			'late night',
			'dance club',
			'club',
			'groups',
			'pasta',
			'burrito',
			'club',
			'dance club'
		];
		return optionArr[random];

	} else if (placeholder1 == 'british invasion' || placeholder1 == 'britpop' || placeholder1 == 'celtic' || placeholder1 == 'europop' ) {
		var optionArr = [
			'irish pub',
			'pub',
			'fish and chips',
			'fish',
			'irish',
			'british',
			'guinness',
			'dive bar',
			'sheperd pie',
			'cocktails'
		];
		return optionArr[random];

	} else if (placeholder1 == 'latin' || placeholder1 == 'cuban rumba' || placeholder1 == 'reggaeton' || placeholder1 == 'salsa' || placeholder1 == 'tango' || placeholder1 == 'tropical' || placeholder1 == 'world' || placeholder1 == 'merengue' || placeholder1 == 'mariachi' || placeholder1 == 'bachata' ) {
		var optionArr = [
			'latin food',
			'pallela',
			'spanish food',
			'tapas',
			'mexican',
			'tapas',
			'sangria',
			'cajun food',
			'carribean food',
			'maduros'
		];
		return optionArr[random];

	} else if (placeholder1 == 'chill-out trance' || placeholder1 == 'ambient' || placeholder1 == 'chillstep' ) {
		var optionArr = [
			'japanese fusion',
			'sushi',
			'hookah bar',
			'coffee shop',
			'cafe',
			'brunch',
			'relaxed food',
			'outdoor patio',
			'wine bar',
			'lounge'
		];
		return optionArr[random];

	} else if (placeholder1 == 'swing' || placeholder1 == 'motown' || placeholder1 == 'rock-and-roll' || placeholder1 == 'ragtime' || placeholder1 == 'disco' || placeholder1 == 'broadway' || placeholder1 == 'barbershop' || placeholder1 == 'big band' || placeholder1 == 'bebop' || placeholder1 == 'boogie-woogie' ) {
		var optionArr = [
			'burger',
			'shake',
			'diner',
			'diner',
			'retro restaurant',
			'patty melt',
			'old fashioned restaurant',
			'diner',
			'soda bar',
			'ice cream bar'
		];
		return optionArr[random];

	} else if (placeholder1 == 'country' || placeholder1 == 'honky tonk' || placeholder1 == 'nashville sound' ) {
		var optionArr = [
			'sweet tea',
			'pulled pork',
			'fried chicken',
			'southern',
			'grits',
			'comfort food',
			'bbq',
			'ribs',
			'homestyle',
			'homestyle'
		];
		return optionArr[random];

	} else if (placeholder1 == 'jazz' || placeholder1 == 'smooth jazz' || placeholder1 == 'bossa nova' || placeholder1 == 'vocal jazz' || placeholder1 == 'lounge' || placeholder1 == 'classical' ) {
		var optionArr = [
			'fine dining',
			'5 star',
			'michelin',
			'champagne',
			'oysters',
			'steak house',
			'fine italian',
			'fine dining',
			'romantic dining',
			'good view restaurant'
		];
		return optionArr[random];

	} else if (placeholder1 == 'reggae' || placeholder1 == 'hawaiian' || placeholder1 == 'ska' || placeholder1 == 'ukulele' ) {
		var optionArr = [
			'hawaiian food',
			'hippy cafe',
			'beach food',
			'acai',
			'locally sourced',
			'food truck',
			'carribean food',
			'chill bar',
			'brunch',
			'street food'
		];
		return optionArr[random];

	} else if (placeholder1 == 'grime' || placeholder1 == 'grunge' || placeholder1 == 'punk'  || placeholder1 == 'emo' || placeholder1 == 'lo-fi' ) {
		var optionArr = [
			'cofee shop',
			'funky bar',
			'live music',
			'cofee shop',	
			'funky bar',
			'live music',
			'dive bar',
			'crappy bar',
			'live music',
			'cofee shop'
		];
		return optionArr[random];

	} else if (placeholder2 == 'pop' || placeholder2 == 'teen pop' || placeholder2 == 'k-pop' || placeholder2 == 'dance pop' ) {
		var optionArr = [
			'boba tea',
			'froyo',
			'frozen yogurt',
			'ice cream',
			'juice',
			'smoothie',
			'locally sourced',
			'salad wrap',
			'salad',
			'fresh'
		];
		return optionArr[random];

	} else if (placeholder2 == 'rock' || placeholder2 == 'jam band' || placeholder2 == 'classic rock' || placeholder2 == 'blues-rock') {
		var optionArr = [
			'burgers',
			'burgers and fries',
			'shakes',
			'beer',
			'steaks',
			'happy hour',
			'live music',
			'sports bar',
			'sports bar',
			'burgers'
		];
		return optionArr[random];

	} else if (placeholder2 == 'indie folk' || placeholder2 == 'singer-songwriter' || placeholder2 == 'native american' || placeholder2 == 'bluegrass' || placeholder2 == 'new wave' || placeholder2 == 'alternative' || placeholder2 == 'indie pop') {
		var optionArr = [
			'coffee',
			'brunch',
			'vegan',
			'brewery',
			'small plates',
			'wine bar',
			'organic',
			'locally sourced',
			'farm to table',
			'homestyle'
		];
		return optionArr[random];

	} else if (placeholder2 == 'rap' || placeholder2 == 'hip hop' || placeholder2 == 'gangster rap' || placeholder2 == 'old school hip hop' || placeholder2 == 'cajun' || placeholder2 == 'blues' ) {
		var optionArr = [
			'fried chicken',
			'cajun',
			'southern food',
			'steak',
			'ribs',
			'waffles',
			'soul food',
			'speakeasy bar',
			'hip hop bar',
			'bbq'
		];
		return optionArr[random];

	} else if (placeholder2 == 'r&b' || placeholder2 == 'soul' ) {
		var optionArr = [
			'creole',
			'soul food',
			'cajun',
			'southern',
			'classy dinner',
			'steak and wine',
			'whisky',
			'speakeasy bar',
			'oysters',
			'good cocktails'
		];
		return optionArr[random];

	} else if (placeholder2 == 'edm' || placeholder2 == 'dubstep' || placeholder2 == 'electronica' || placeholder1 == 'electronic' || placeholder2 == 'eurodance' || placeholder2 == 'experimental' || placeholder2 == 'house' || placeholder2 == 'german techno' || placeholder2 == 'glitch' || placeholder2 == 'techno' || placeholder2 == 'trance' || placeholder2 == 'drum and bass' ) {
		var optionArr = [
			'party',
			'loud',
			'late night',
			'dance club',
			'club',
			'groups',
			'pasta',
			'burrito',
			'club',
			'dance club'
		];
		return optionArr[random];

	} else if (placeholder2 == 'british invasion' || placeholder2 == 'britpop' || placeholder2 == 'celtic' || placeholder2 == 'europop' ) {
		var optionArr = [
			'irish pub',
			'pub',
			'fish and chips',
			'fish',
			'irish',
			'british',
			'guinness',
			'dive bar',
			'sheperd pie',
			'cocktails'
		];
		return optionArr[random];

	} else if (placeholder2 == 'latin' || placeholder2 == 'cuban rumba' || placeholder2 == 'reggaeton' || placeholder2 == 'salsa' || placeholder2 == 'tango' || placeholder2 == 'tropical' || placeholder2 == 'world' || placeholder2 == 'merengue' || placeholder2 == 'mariachi' || placeholder2 == 'bachata' ) {
		var optionArr = [
			'latin food',
			'pallela',
			'spanish food',
			'tapas',
			'mexican',
			'tapas',
			'sangria',
			'cajun food',
			'carribean food',
			'maduros'
		];
		return optionArr[random];

	} else if (placeholder2 == 'chill-out trance' || placeholder2 == 'ambient' || placeholder2 == 'chillstep' ) {
		var optionArr = [
			'japanese fusion',
			'sushi',
			'hookah bar',
			'coffee shop',
			'cafe',
			'brunch',
			'relaxed food',
			'outdoor patio',
			'wine bar',
			'lounge'
		];
		return optionArr[random];

	} else if (placeholder2 == 'swing' || placeholder2 == 'motown' || placeholder2 == 'rock-and-roll' || placeholder2 == 'ragtime' || placeholder2 == 'disco' || placeholder2 == 'broadway' || placeholder2 == 'barbershop' || placeholder2 == 'big band' || placeholder2 == 'bebop' || placeholder2 == 'boogie-woogie' ) {
		var optionArr = [
			'burger',
			'shake',
			'diner',
			'diner',
			'retro restaurant',
			'patty melt',
			'old fashioned restaurant',
			'diner',
			'soda bar',
			'ice cream bar'
		];
		return optionArr[random];

	} else if (placeholder2 == 'country' || placeholder2 == 'honky tonk' || placeholder2 == 'nashville sound' ) {
		var optionArr = [
			'sweet tea',
			'pulled pork',
			'fried chicken',
			'southern',
			'grits',
			'comfort food',
			'bbq',
			'ribs',
			'homestyle',
			'homestyle'
		];
		return optionArr[random];

	} else if (placeholder2 == 'jazz' || placeholder2 == 'smooth jazz' || placeholder2 == 'easy listening' || placeholder2 == 'bossa nova' || placeholder2 == 'vocal jazz' || placeholder2 == 'lounge' || placeholder2 == 'classical' ) {
		var optionArr = [
			'fine dining',
			'5 star',
			'michelin',
			'champagne',
			'oysters',
			'steak house',
			'fine italian',
			'fine dining',
			'romantic dining',
			'good view restaurant'
		];
		return optionArr[random];

	} else if (placeholder2 == 'reggae' || placeholder2 == 'hawaiian' || placeholder2 == 'ska' || placeholder2 == 'ukulele' ) {
		var optionArr = [
			'hawaiian food',
			'hippy cafe',
			'beach food',
			'acai',
			'locally sourced',
			'food truck',
			'carribean food',
			'chill bar',
			'brunch',
			'street food'
		];
		return optionArr[random];

	} else if (placeholder2 == 'grime' || placeholder2 == 'grunge' || placeholder2 == 'punk' || placeholder2 == 'hardcore' || placeholder2 == 'emo' || placeholder2 == 'lo-fi' ) {
		var optionArr = [
			'cofee shop',
			'funky bar',
			'live music',
			'cofee shop',	
			'funky bar',
			'live music',
			'dive bar',
			'crappy bar',
			'live music',
			'cofee shop'
		];
		return optionArr[random];
	}
}

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

						console.log(genre1 + ' ' + genre2);

						if (data.response.terms) {
						
						//get venue
						// HANDLEBARS genre templateing
						// var genres = {genreOne: genre1, genreTwo: genre2};
						// $('#result-display-primary').html(template(genres));

						// Map genre to food!
						var mapResult = mapGenre(genre1, genre2);
						
						// HANDLEBARS food templating
						// var food = { food: mapResult };
						// $('#result-display-secondary').html(foodTemplate(food));

						// make call to 4square api
						$.get('https://api.foursquare.com/v2/venues/explore?client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20130815%20&near=san+francisco&limit=10&query=' + mapResult, function (data) {
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
									venueRating: venue.rating
								};

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