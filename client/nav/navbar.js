Template.navbar.events = {
	'click #signin': function(event) {
		event.preventDefault();
		Router.go('/users/login');
	},
	'click #logo': function(event) {
		event.preventDefault();
		Router.go('/');
	},
	'click #signout': function(event) {
		event.preventDefault();
		Meteor.logout();
	}
}
