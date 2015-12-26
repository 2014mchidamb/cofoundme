if(Meteor.isClient)
{
	var proj;
	var sub;
	Tracker.autorun(function(){
		Meteor.subscribe("projectById", Session.get("currentProjId"));
		console.log(Projects.find().fetch());
	});
	// TODO: refresh subscription
	Template.projectHome.onCreated(function(){
		// console.log(this.data.id);
		// sub = Meteor.subscribe("projectById", this.data.id, function() {
		// 	proj = Projects.find().fetch()[0];	
		// 	console.log(proj);			
		// });
		proj = Projects.find({_id:this.data.id}).fetch()[0];
	});


	Template.projectHome.helpers({
		title: function() {	
			// if(sub.ready())	
				return proj.name;
		},
		desc: function(){
			// if(sub.ready())
				return proj.desc;
		},
		project: function(){
			// if(sub.ready())
				return proj;
		}


	});
}
