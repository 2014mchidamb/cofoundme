var userId;
var resumeChanged = false;
var profilePictureChanged = false;
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
	'change #profile-picture':function(Event, template){
		event.preventDefault();
		var profilePicture = template.find("#profile-picture-name");
		if(event.target.files[0]){
			profilePicture.value = event.target.files[0].name;
			profilePictureChanged = true;

		}
	},
	'submit form': function(event) {
		event.preventDefault();
		var name = event.target.name.value;
		var school = event.target.school.value;
		var skills = event.target.skills.value;
		var seeking = event.target.seeking.checked;
		if(resumeChanged){
			Modules.client.uploadToS3({event:event, file:event.target.resume.files[0], collection:"resumes"}, function(resumeUrl, error){
				if(error)
					console.log(error);
				// resume and picture changed
				else if(profilePictureChanged){
					Modules.client.uploadToS3({event:event, file:event.target["profile-picture"].files[0], collection:"images"}, function(pictureUrl, error){
						if(error)
							console.log(error);
						else{
							callEditUser(name, school, skills, seeking, resumeUrl, pictureUrl);
						}
					});
				}
				// resume changed
				else
					callEditUser(name, school, skills, seeking, resumeUrl, Meteor.user().profile.picture);

				
			});
		}
		// picture changed
		else if(profilePictureChanged){
			console.log(event.target);
			Modules.client.uploadToS3({event:event, file:event.target["profile-picture"].files[0], collection:"images"}, function(pictureUrl, error){
				if(error)
					console.log(error);
				else
					callEditUser(name, school, skills, seeking, Meteor.user().profile.resume, pictureUrl);
				
			});
		}
		// If resume and picture weren't changed
		else 
			callEditUser(name, school, skills, seeking, Meteor.user().profile.resume, Meteor.user().profile.picture);
		
	}
});

Template.editProfile.helpers({
	'isUser':function(){
		if(!Meteor.user())
			return false;
		return Meteor.user()._id === userId;
	},
	'resumeName':function(){
		return Meteor.user().profile.resume.substring(Meteor.user().profile.resume.lastIndexOf("/")+1);
	},
	'profilePictureName':function(){
		return Meteor.user().profile.picture.substring(Meteor.user().profile.picture.lastIndexOf("/")+1);
	},
	'progress':function(){
		//console.log(Math.round(Modules.client.uploadToS3Progress()) );
		return Math.round(Modules.client.uploadToS3Progress() *100);
	}
});

function callEditUser(name, school, skills, seeking, resumeUrl, pictureUrl){
	console.log(name, school, skills, seeking, resumeUrl, pictureUrl);
	Meteor.call("editUser", name, school, skills, seeking, resumeUrl, pictureUrl,  function(error, result){
				if(error)
					console.log(error);
				else
					Router.go('/profile/'+userId+'/home');

			});	
}
