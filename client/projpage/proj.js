Template.proj.helpers({
	projects: function() {
		var schoolname = decodeURI(window.location.pathname.split('/')[1]);
		Meteor.subscribe("projects", schoolname);
		var result = Projects.find().fetch();
		console.log(result);
		return result;
	}
});
