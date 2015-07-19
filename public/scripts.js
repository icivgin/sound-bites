$(function() {

//put this all in a controller

var source   = $("#result-template").html();
var template = Handlebars.compile(source);

var foodSource   = $("#food-template").html();
var foodTemplate = Handlebars.compile(foodSource);

var toggle = true;

var apiKey = 'DGY3JGAZP1OFZR4RO';
var clientID = 'J3QA1RADSXWM43QI0VTSC1EFFCFFZYKPZW2Z2PNVL5YEWU5T';
var clientSecret = 'TRR5QY22ZJWTTGWRXQ50MQIFXC0VHOLC2F3EPG2YRBMIFIXP';

function map (placeholder1, placeholder2) {
	var random = Math.floor(Math.random() * 10);
	console.log(placeholder1 + placeholder2);

	if (placeholder1 == 'pop' || placeholder1 == 'teen pop' || placeholder1 == 'k-pop' || placeholder1 == 'dance pop' ) {
		var optionArr = [
			'boba tea',
			'froyo',
			'frozen yogurt',
			'ice cream',
			'juice',
			'smoothie',
			'healthy',
			'salad wrap',
			'salad',
			'fresh'
		];
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder1 == 'rock' || placeholder1 == 'jam band' || placeholder1 == 'classic rock' || placeholder1 == 'blues-rock') {
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
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder1 == 'indie folk' || placeholder1 == 'singer-songwriter' || placeholder1 == 'native american' || placeholder1 == 'bluegrass' || placeholder1 == 'new wave' || placeholder1 == 'alternative' || placeholder1 == 'indie pop') {
		var optionArr = [
			'coffee',
			'brunch',
			'vegan',
			'brewery',
			'small plates',
			'wine bar',
			'organic',
			'healthy',
			'farm to table',
			'homestyle'
		];
		console.log(optionArr[random]);
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
			'speakeasy',
			'hip hop bar',
			'ciroc'
		];
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder1 == 'r&b' || placeholder1 == 'soul' ) {
		var optionArr = [
			'creole',
			'soul food',
			'cajun',
			'southern',
			'ciroc',
			'steak and wine',
			'whisky',
			'speakeasy',
			'oysters',
			'good cocktails'
		];
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder1 == 'edm' || placeholder1 == 'dubstep' || placeholder1 == 'electronica' || placeholder1 == 'eurodance' || placeholder1 == 'experimental' || placeholder1 == 'house' || placeholder1 == 'german techno' || placeholder1 == 'glitch' || placeholder1 == 'techno' || placeholder1 == 'trance' || placeholder1 == 'drum and bass' ) {
		var optionArr = [
			'party',
			'loud',
			'late night',
			'dance',
			'club',
			'groups',
			'pasta',
			'burrito',
			'club',
			'dance'
		];
		console.log(optionArr[random]);
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
		console.log(optionArr[random]);
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
		console.log(optionArr[random]);
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
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder1 == 'swing' || placeholder1 == 'motown' || placeholder1 == 'rock-and-roll' || placeholder1 == 'ragtime' || placeholder1 == 'disco' || placeholder1 == 'broadway' || placeholder1 == 'barbershop' || placeholder1 == 'big band' || placeholder1 == 'bebop' || placeholder1 == 'boogie-woogie' ) {
		var optionArr = [
			'burger',
			'shake',
			'jukebox',
			'diner',
			'retro',
			'patty melt',
			'old fashioned',
			'root beer float',
			'soda bar',
			'ice cream bar'
		];
		console.log(optionArr[random]);
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
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder1 == 'jazz' || placeholder1 == 'smooth jazz' || placeholder1 == 'bossa nova' || placeholder1 == 'vocal jazz' || placeholder1 == 'lounge' || placeholder1 == 'classical' ) {
		var optionArr = [
			'classy',
			'dressy',
			'michelin',
			'champagne',
			'oysters',
			'steak house',
			'fine italian',
			'fine dining',
			'romantic',
			'good view'
		];
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder1 == 'reggae' || placeholder1 == 'hawaiian' || placeholder1 == 'ska' || placeholder1 == 'ukulele' ) {
		var optionArr = [
			'hawaiian food',
			'hippy cafe',
			'beach food',
			'acai',
			'healthy',
			'food truck',
			'carribean food',
			'chill bar',
			'brunch',
			'street food'
		];
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder1 == 'grime' || placeholder1 == 'grunge' || placeholder1 == 'punk' || placeholder1 == 'hardcore' || placeholder1 == 'emo' || placeholder1 == 'lo-fi' ) {
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
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder2 == 'pop' || placeholder2 == 'teen pop' || placeholder2 == 'k-pop' || placeholder2 == 'dance pop' ) {
		var optionArr = [
			'boba tea',
			'froyo',
			'frozen yogurt',
			'ice cream',
			'juice',
			'smoothie',
			'healthy',
			'salad wrap',
			'salad',
			'fresh'
		];
		console.log(optionArr[random]);
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
		console.log(optionArr[random]);
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
			'healthy',
			'farm to table',
			'homestyle'
		];
		console.log(optionArr[random]);
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
			'speakeasy',
			'hip hop bar',
			'ciroc'
		];
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder2 == 'r&b' || placeholder2 == 'soul' ) {
		var optionArr = [
			'creole',
			'soul food',
			'cajun',
			'southern',
			'ciroc',
			'steak and wine',
			'whisky',
			'speakeasy',
			'oysters',
			'good cocktails'
		];
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder2 == 'edm' || placeholder2 == 'dubstep' || placeholder2 == 'electronica' || placeholder2 == 'eurodance' || placeholder2 == 'experimental' || placeholder2 == 'house' || placeholder2 == 'german techno' || placeholder2 == 'glitch' || placeholder2 == 'techno' || placeholder2 == 'trance' || placeholder2 == 'drum and bass' ) {
		var optionArr = [
			'party',
			'loud',
			'late night',
			'dance',
			'club',
			'groups',
			'pasta',
			'burrito',
			'club',
			'dance'
		];
		console.log(optionArr[random]);
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
		console.log(optionArr[random]);
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
		console.log(optionArr[random]);
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
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder2 == 'swing' || placeholder2 == 'motown' || placeholder2 == 'rock-and-roll' || placeholder2 == 'ragtime' || placeholder2 == 'disco' || placeholder2 == 'broadway' || placeholder2 == 'barbershop' || placeholder2 == 'big band' || placeholder2 == 'bebop' || placeholder2 == 'boogie-woogie' ) {
		var optionArr = [
			'burger',
			'shake',
			'jukebox',
			'diner',
			'retro',
			'patty melt',
			'old fashioned',
			'root beer float',
			'soda bar',
			'ice cream bar'
		];
		console.log(optionArr[random]);
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
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder2 == 'jazz' || placeholder2 == 'smooth jazz' || placeholder2 == 'bossa nova' || placeholder2 == 'vocal jazz' || placeholder2 == 'lounge' || placeholder2 == 'classical' ) {
		var optionArr = [
			'classy',
			'dressy',
			'michelin',
			'champagne',
			'oysters',
			'steak house',
			'fine italian',
			'fine dining',
			'romantic',
			'good view'
		];
		console.log(optionArr[random]);
		return optionArr[random];

	} else if (placeholder2 == 'reggae' || placeholder2 == 'hawaiian' || placeholder2 == 'ska' || placeholder2 == 'ukulele' ) {
		var optionArr = [
			'hawaiian food',
			'hippy cafe',
			'beach food',
			'acai',
			'healthy',
			'food truck',
			'carribean food',
			'chill bar',
			'brunch',
			'street food'
		];
		console.log(optionArr[random]);
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
		console.log(optionArr[random]);
		return optionArr[random];
	}
}

$('#submit-track').on('submit', function(event) {
	event.preventDefault();
	// var word = { track: $('#track-name').val(), artist: $('#artist-name').val()};

	// check to see if song exists
	$.get('http://developer.echonest.com/api/v4/song/search?api_key=DGY3JGAZP1OFZR4RO&format=json&results=6&artist=' + $('#artist-name').val() + '&title=' + $('#track-name').val(), function (data) {
		console.log(data);
		if (data.response.songs.length !== 0) {

			// query for genres
				$.get('https://developer.echonest.com/api/v4/artist/terms?api_key=' + apiKey + '&name=' + $('#artist-name').val() + '&format=json', function(data) {
					if (toggle) {	
						if (data.response.terms) {
						genre1 = data.response.terms[0].name; 
						genre2 = data.response.terms[1].name; 

						// splitted = genre.split(' ');

							var genres = {genreOne: genre1, genreTwo: genre2};

							$('#result-display').html(template(genres));
							// reset fields

						//map to food
						var mapResult = map(genre2, genre1);
						var food = { food: mapResult };
						$('#result-display').html(foodTemplate(food));
						toggle = true;

						$.get('https://api.foursquare.com/v2/venues/search?client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20130815%20&ll=40.7,-74%20&near=san+francisco&limit=5&query=' + mapResult, function (data) {
							var ranVenue = Math.floor(Math.random() * 5);
							console.log(data.response.venues[ranVenue].name);
						});

						} else { alert('Track not found, please try again.'); }
					}
					else {
						if (data.response.terms) {
						genre1 = data.response.terms[0].name; 
						genre2 = data.response.terms[1].name; 

						// splitted = genre.split(' ');

							var genres = {genreOne: genre1, genreTwo: genre2};

							$('#result-display').html(template(genres));
							// reset fields

						//map to food
						var mapResult = map(genre1, genre2);
						var food = { food: mapResult };
						$('#result-display').html(foodTemplate(food));
						toggle = true;

						$.get('https://api.foursquare.com/v2/venues/search?client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20130815%20&ll=40.7,-74%20&near=san+francisco&limit=5&query=' + mapResult, function (data) {
							var ranVenue = Math.floor(Math.random() * 5);
							console.log(data.response.venues[ranVenue].name);
						});

						} else { alert('Track not found, please try again.'); }
					}
				});

		} else {
			alert('no song exists');
		}
	})
});

})