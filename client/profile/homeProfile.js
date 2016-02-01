if(Meteor.isClient)
{

	var user;
	var projects;
	var userId;

	Template.homeProfile.onCreated(function(){
		var self = this;
		self.autorun(function(){
			userId = self.data.id;
			console.log(userId);
			self.subscribe("userById", userId,
				function() {
					user = Meteor.users.find({_id:userId}).fetch()[0];

				});
			self.subscribe("projectsByUser", userId,
				function(){
					projects = Projects.find({owner:userId}).fetch();
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
		},
		'isCurrentUser':function(){
			return userId === Meteor.userId();
		},
		'editUrl':function(){
			return '/profile/'+userId+"/edit";
		}

	});
}