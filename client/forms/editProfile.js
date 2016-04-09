var userId;
Template.editProfile.created = function(){
	userId = this.data.id;
};

Template.editProfile.events({
	"submit form": function(event) {
		event.preventDefault();
		var name = event.target.name.value;
		var school = event.target.school.value;
		var skills = event.target.skills.value;
		var seeking = event.target.seeking.checked;
        var resume = event.target.resume.value;
		Meteor.call("editUser", name, school, skills, seeking, resume, function(error, result){
			if(error)
				console.log(error);
			else
				Router.go('/profile/'+userId+'/home');
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

