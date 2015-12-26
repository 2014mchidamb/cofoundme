if(Meteor.isClient)
{
	var result;
	Tracker.autorun(function(){
		Meteor.subscribe("projectsByUser", Meteor.userId());
	});
	// Template.myProjects.rendered = function() {
	// };

	Template.myProjects.helpers({
		myprojs: function() {
			var result = Projects.find().fetch();
			return result;
		}
	});
}