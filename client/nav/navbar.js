Template.navbar.events = {
	'click #signin': function(event) {
		event.preventDefault();
		Router.go('/users/login');
	},	
	'click #register': function(event) {
		event.preventDefault();
		Router.go('/users/signup');
	},
	'click #logo': function(event) {
		event.preventDefault();
		Router.go("/");
		// if(!Meteor.userId())
		// 	Router.go('/');
		// else
		// 	Router.go('/'+Meteor.user().profile.school);
	},
	'click #signout': function(event) {
		event.preventDefault();
		Meteor.logout();
	},
	'click #insertProjectForm': function(event) {
		event.preventDefault();
		Router.go('/project/new');
	},
	'click #myProjects': function(event) {
		event.preventDefault();
		Router.go('/profile/myprojects');
	},
	'click #profile': function(event) {
		event.preventDefault();
		Router.go('/profile/'+Meteor.userId()+'/home');
	},	
	'click #mySchool': function(event) {
		event.preventDefault();
		Router.go('/'+Meteor.user().school);
	},
	'click .dropdown-button': function(event, template){
		event.preventDefault();
		template.$(".dropdown-button").dropdown();
	}
};

Template.navbar.helpers({
	cleanUrl: function(){
		var url = Meteor.user().profile.school;
		url = url.replace(/ /g, "%20");
		return url;
	}

});
