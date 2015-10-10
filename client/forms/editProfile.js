Template.editProfile.events({
	"submit form": function(event) {
		event.preventDefault();
		var name = event.target.name.value;
		var school = event.target.school.value;
		var skills = event.target.skills.value;
		var seeking = event.target.seeking.checked;
		Meteor.call("editUser", name, school, skills, seeking, function(error, result){
			if(error)
				console.log(error);
			else
				Router.go('/profile/home');
		});
		
	}

});