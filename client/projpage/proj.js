if(Meteor.isClient)
{
	Template.proj.rendered = function() {
		Meteor.subscribe("projectsBySchool", this.data.schoolname);
	};

	Template.proj.helpers({
		projects: function() {
			var result = Projects.find().fetch();
			return result;
		}
	});

	// Template.proj.events({
	// 	'click .card-title': function(event)
	// 	{
	// 		console.log(event);
	// 		Router.go("/"+event.target.value);
	// 	}
	// });
}
