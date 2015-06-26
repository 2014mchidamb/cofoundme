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
	},
	'click #insertProjectForm': function(event) {
		event.preventDefault();
		Router.go('/project/new');
	},
	'click #profile': function(event) {
		event.preventDefault();
		Router.go('/profile/edit');
	}
};
