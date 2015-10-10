Template.editProfile.events({
	"submit form": function(event) {
		event.preventDefault();
		var name = event.target.name.value;
		var school = event.target.school.value;
		var experience = event.target.exp.value;
		var seeking = event.target.seeking.checked;
		console.log(seeking);
		Meteor.call("editUser", name, school, experience, seeking);
		Router.go('/profile/home');
	}

});