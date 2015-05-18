Template.home.events = {
	'submit form': function(event) {
		event.preventDefault();
		Router.go('/'+document.getElementById('school').value);
	}
}
Meteor.startup(function () {
	console.log('got here');
	particlesJS('particles-js', {});
});
