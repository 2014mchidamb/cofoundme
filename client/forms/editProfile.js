var userId;
Template.editProfile.created = function(){
	userId = this.data.id;
};

Template.editProfile.events({
	'change #resume': function(event, template){
		event.preventDefault();
		var resume_name = template.find("#resume-name");
		if(event.target.files[0])
			resume_name.value = event.target.files[0].name;

	},
	'submit form': function(event) {
		event.preventDefault();
		var name = event.target.name.value;
		var school = event.target.school.value;
		var skills = event.target.skills.value;
		var seeking = event.target.seeking.checked;
		Modules.client.uploadToS3({event:event, file:event.target.resume.files[0], collection:"resume"}, function(resumeUrl, error){
			if(error)
				console.log(error);
			else{
				Meteor.call("editUser", name, school, skills, seeking, resumeUrl, function(error, result){
					if(error)
						console.log(error);
					else{
						console.log("done");
						Router.go('/profile/'+userId+'/home');
					}
				});	
			}
		});


	}

});

Template.editProfile.helpers({
	'isUser':function(){
		if(!Meteor.user())
			return false;
		return Meteor.user()._id === userId;
	}
});

