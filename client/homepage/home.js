Template.home.events = {
	'submit form': function(event) {
		event.preventDefault();
		Router.go('/'+document.getElementById('school').value);
	}
}
