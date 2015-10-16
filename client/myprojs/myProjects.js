Template.myProjects.helpers({
	myprojs: function() {
		// Meteor.subscribe("users", schoolname);
		var result = Projects.find({owner: Meteor.userId()}, {sort: {createdAt: -1}}).fetch();
		//Meteor.users.find({"profile.school":schoolname, "profile.seeking":true}, {sort: {createdAt: -1}}).fetch();
		console.log(result);
		return result;
	}
});
