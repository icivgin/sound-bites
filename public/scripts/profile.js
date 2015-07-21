$(function() {

var userTrue = $('#user-true').html();
var userTrueTemplate = Handlebars.compile(userTrue);

var userFalse = $('#user-false').html();
var userFalseTemplate = Handlebars.compile(userFalse);

var resultSource = $('#result-template').html();
var resultTemplate = Handlebars.compile(resultSource);

var globalUserData;

var marker;
var markerDelete;

var lastDiv;
var thisDiv;

String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};

$('#results-view').on('mouseover', '.result-div', function (event) {
	event.preventDefault();
	var that = $(this);
	lastDiv.css('background-color', 'transparent');
	that.css('background-color', 'rgba(0,0,0,.5)');
	lastDiv = that;

	map.setView([that.attr('data-lat'), that.attr('data-lng')], 14);
	map.removeLayer(marker);
	marker = new L.marker([that.attr('data-lat'), that.attr('data-lng')]).addTo(map);
});



//set up map
var map = L.map('map').setView([37.7833, -122.4167], 13);

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
			for(i=0; i<data.myResults.length; i++) {
				$('#results-view').append(resultTemplate(data.myResults[i]));
				if(i===0) {
					var that = $('#results-view').find('.result-div');
					lastDiv = that;
					lastDiv.css('background-color', 'rgba(0,0,0,.5)');
					marker = new L.marker([that.attr('data-lat'), that.attr('data-lng')]).addTo(map);
				}
			}
		});

	} else {
		$('#navbar-view').html(userFalseTemplate());
	}
});

})