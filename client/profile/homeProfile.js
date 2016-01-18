if(Meteor.isClient)
{
	var userId;
	var user;
	var projects;

	Template.homeProfile.onCreated(function(){
		var self = this;

		self.autorun(function(){
			self.subscribe("userById", self.data.id,
				function() {
					user = Meteor.users.find().fetch()[0];

				});
			self.subscribe("projectsByUser", self.data.id,
				function(){
					projects = Projects.find().fetch();
				});
		});
	});
		

	Template.homeProfile.events = {
		'click #edit_profile': function(event) {
			event.preventDefault();
			Router.go('/profile/'+userId+'/edit');
		}
	};

	Template.homeProfile.helpers({
		'projects':function(){
			return projects;
		},
		'title':function(){
			return user.profile.name;
		},
		'school':function(){
			return user.profile.school;
		},
		'skills':function(){
			return user.profile.skills;
		},
		'seeking':function(){
			return user.profile.seeking;
		}

	});
}