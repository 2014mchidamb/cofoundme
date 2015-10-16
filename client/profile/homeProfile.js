// Template.homeProfile.helpers = {
// 	'seeking':function(){
// 		return this.seeking;
// 	}

// };
Template.homeProfile.events = {
    'click #edit_profile': function(event) {
        event.preventDefault();
        Router.go('/profile/edit');
    }
};

Template.homeProfile.helpers({
	'projects':function(){
		var schoolname = decodeURI(window.location.pathname.split('/')[1]);
		Meteor.subscribe("projectsByUser", Meteor.userId());
		var result = Projects.find().fetch();
		console.log(result);

		return result;
	}

});