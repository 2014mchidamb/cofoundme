var userId;
var resumeChanged = false;
Template.editProfile.created = function(){
	userId = this.data.id;
};

Template.editProfile.events({
	'change #resume': function(event, template){
		event.preventDefault();
		var resumeName = template.find("#resume-name");
		if(event.target.files[0]){
			resumeName.value = event.target.files[0].name;
			resumeChanged = true;
		}

	},
	'submit form': function(event) {
		event.preventDefault();
		var name = event.target.name.value;
		var school = event.target.school.value;
		var skills = event.target.skills.value;
		var seeking = event.target.seeking.checked;
		if(resumeChanged){
			Modules.client.uploadToS3({event:event, file:event.target.resume.files[0], collection:"resume"}, function(resumeUrl, error){
				if(error)
					console.log(error);
				else{
					Meteor.call("editUser", name, school, skills, seeking, resumeUrl, function(error, result){
						if(error)
							console.log(error);
						else{
							Router.go('/profile/'+userId+'/home');
						}
					});	
				}
			});
		}
		else {
			Meteor.call("editUser", name, school, skills, seeking, Meteor.user().profile.resume, function(error, result){
				if(error)
					console.log(error);
				else{
					Router.go('/profile/'+userId+'/home');
				}
			});	

		}


	}

});

Template.editProfile.helpers({
	'isUser':function(){
		if(!Meteor.user())
			return false;
		return Meteor.user()._id === userId;
	},
	'resumeName':function(){
		console.log(Meteor.user());
		return Meteor.user().profile.resume.substring(Meteor.user().profile.resume.lastIndexOf("/")+1);
	}
});

