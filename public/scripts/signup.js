$(function() {

//popover
$('[data-toggle="popover"]').popover()

//checks if valid email address (needs '@', '.', and at least 5 characters)
function check() {
	var atInclude = $('#new-user-email').val().indexOf('@');
	if (($('#new-user-email').val().indexOf('@') === -1 || $('#new-user-email').val().indexOf('.') === -1 || $('#new-user-email').val().length < 5) && $('#new-user-email').val()) {
		return false;
	} else {
		return true;
	}
}

//data validation
//checks for unique username
$('#new-user-userName').on('focusout', function (event) {
	var attempt = $(this).val();
	$.get('/v1/users/find/userName/' + $(this).val(), function (data) {
		if(data === attempt) {
			alert('Username already taken.');
			$('#new-user-userName').focus().val('');
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