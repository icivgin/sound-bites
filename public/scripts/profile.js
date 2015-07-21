$(function() {

var userTrue = $('#user-true').html();
var userTrueTemplate = Handlebars.compile(userTrue);

var userFalse = $('#user-false').html();
var userFalseTemplate = Handlebars.compile(userFalse);

var resultSource = $('#result-template').html();
var resultTemplate = Handlebars.compile(resultSource);

var globalUserData;

String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};

$('#results-view').on('click', '.result-div', function (event) {
	console.log($(this));
	var allResults = $('#results-view').children()[1].children;
	for (i=0; i<allResults.length; i++) {
		console.log(allResults[i]);
		allResults[i].style.background = '#4FC1E9';
		var marker = L.marker([finalResult.venueLat, finalResult.venueLng]).addTo(map);

	}
	$(this).css('background-color', 'green');
});



//set up map
var map = L.map('map').setView([37.7833, -122.4167], 12);

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
$.get('/v1/me', function (data) {
	if(data) {
		globalUserData = data;
		$('#navbar-view').html(userTrueTemplate({user: data.firstName.capitalize()}));

		$.get('/v1/users/' + globalUserData._id, function (data) {

			$('#history-view').append(resultTemplate());

			// for(i=0; i<data.length; i++) {
			// 	$('#history-view').append(resultTemplate(data[i]));
			// }
		});

	} else {
		$('#navbar-view').html(userFalseTemplate())
	}
});

})