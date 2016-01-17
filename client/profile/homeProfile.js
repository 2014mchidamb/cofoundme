if(Meteor.isClient)
{
	var userId;
	Tracker.autorun(function(){
		Meteor.subscribe("userById", Session.get("userid"));
		Meteor.subscribe("projectsByUser", Session.get("userid"));
	});
	Template.homeProfile.onRendered(function() {
		userId = this.data.id;
		Meteor.subscribe("projectsByUser", userId);
	});

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
}