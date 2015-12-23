Template.myProjects.helpers({
	myprojs: function() {
		Meteor.subscribe("projectsByUser", Meteor.userId());
		var result = Projects.find().fetch();
		return result;
	}
});
