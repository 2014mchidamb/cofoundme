Template.editProfile.events({
	"submit form": function(event) {
		event.preventDefault();
		var name = event.target.name.value;
		var school = event.target.school.value;
		var experience = event.target.exp.value;

		Meteor.call("editUser", name, school, experience);

		Router.go('/profile/home');
	}

});