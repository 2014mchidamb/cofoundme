
var userId;
Template.homeProfile.rendered = function() {
	userId = this.data.id;
	Meteor.subscribe("projectsByUser", userId);
};

Template.homeProfile.events = {
    'click #edit_profile': function(event) {
        event.preventDefault();
        Router.go('/profile/'+userId+'/edit');
    }
};
Template.homeProfile.helpers({
	'projects':function(){
		var result = Projects.find().fetch();
		return result;
	}

});