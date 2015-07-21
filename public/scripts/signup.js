$(function() {

function check() {
	var atInclude = $('#new-user-email').val().indexOf('@');
	console.log(atInclude);
	if ($('#new-user-email').val().indexOf('@') === -1 && $('#new-user-email').val()) {
		return false;
	} else {
		return true;
	}
}

//data validation

//checks for unique username
$('#new-user-userName').on('focusout', function (event) {
	$.get('/v1/users/find/userName/' + $('#new-user-userName').val(), function (data) {
		if(data === $('#new-user-userName').val()) {
			alert('Username already taken.');
			$('#new-user-userName').val('').focus();
		}
	});
});

//checks if valid and unique email
$('#new-user-email').on('focusout', function (event) {
	if (!check()) {
			alert('Not a valid email.')
			$('#new-user-email').val('').focus();
	} else {
		$.get('/v1/users/find/email/' + $('#new-user-email').val(), function (data) {
			if (data === $('#new-user-email').val()) {
				alert('Email already has an account.');
				$('#new-user-email').val('').focus();
			}
		});
	}
});

})