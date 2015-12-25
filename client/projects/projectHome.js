if(Meteor.isClient)
{
	var proj;
	var sub;

	Template.projectHome.onCreated(function(){
		console.log(Meteor.userId());
		var instance = this;
		sub = Meteor.subscribe("projectsByUser", Meteor.userId(), function() {
			proj = Projects.find({_id:instance.data.id}).fetch()[0];				
		});
	});


	Template.projectHome.helpers({
		title: function() {	
			if(sub.ready())	
				return proj.name;
		},
		desc: function(){
			if(sub.ready())
				return proj.desc;
		},
		project: function(){
			if(sub.ready())
				return proj;
		}


	});
}
