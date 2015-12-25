if(Meteor.isClient)
{
	Template.myProjects.rendered = function() {
		Meteor.subscribe("projectsByUser", Meteor.userId());
	};

	Template.myProjects.helpers({
		myprojs: function() {
			var result = Projects.find().fetch();
			return result;
		}
	});
}