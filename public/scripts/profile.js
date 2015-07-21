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

$.get('/api/me', function (data) {
	if(data) {
		console.log(data);
		globalUserData = data;
		$('#navbar-view').html(userTrueTemplate({user: data.firstName.capitalize()}));

		$.get('/api/users/' + globalUserData._id, function (data) {

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