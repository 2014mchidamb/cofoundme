if(Meteor.isClient)
{

	var user;
	var projects;
	var userId;
	var resume;

	Template.homeProfile.onCreated(function(){
		var self = this;
		self.autorun(function(){
			userId = self.data.id;
			self.subscribe("userById", userId,
				function() {
					user = Meteor.users.find({_id:userId}).fetch()[0];

				});
			self.subscribe("projectsByUser", userId,
				function(){
					projects = Projects.find({owner:userId}).fetch();
				});
			self.subscribe("resumeByUser", userId,
				function(){
					resume = Resumes.find({owner:userId}).fetch();
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
		'email':function(){
			return user.emails[0].address;
		},
		'school':function(){
			return user.profile.school;
		},
		'skills':function(){
			return user.profile.skills;
		},
		'resumeShort':function(){
			return user.profile.resume.substring(user.profile.resume.lastIndexOf("/")+1);
		},
        'resumeUrl':function(){
            return user.profile.resume;
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
