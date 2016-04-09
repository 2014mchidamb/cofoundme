Template.teamproj.events = {
    'click #proj': function(event) {
        event.preventDefault();
        Router.go(window.location.pathname+'/projects');
    },
	'click #team': function(event) {
		event.preventDefault();
		Router.go(window.location.pathname+'/coders');
	},
    'click #need': function(event) {
        event.preventDefault();
        Router.go(window.location.pathname+'/needs');
    }
}
