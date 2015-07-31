$(function() {

$('#login').on('submit', function (event) {
	event.preventDefault();	

	$.ajax({
		url: '/login',
		type: 'POST',
		data: {userName: $('#login-userName').val(), password: $('#login-password').val()},
		success: function(data) {
			if (data == 'user not found') {
				$('#user-error').html('<span class="glyphicon glyphicon-exclamation-sign red" aria-hidden="true"></span> User does not exist... Try again.');
				$('#login-userName').val('').focus();
				$('#login-password').val('');
			} else if (data == 'password does not match') {
				$('#user-error').html('');
				$('#password-error').html('<span class="glyphicon glyphicon-exclamation-sign red" aria-hidden="true"></span> Password does not match... Try again.');
				$('#login-password').val('').focus();

			} else {
				window.location = data.redirect;
			}
		}
	});
});

})