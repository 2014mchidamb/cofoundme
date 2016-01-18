if(Meteor.isClient)
{
	var proj;
	var sub;
	// TODO: add private proj permissions checking
	Template.projectHome.onCreated(function(){
		var self = this;
		self.autorun(function(){
			self.subscribe("projectById", Session.get("currentProjId"),
				function()
				{
					proj = Projects.find().fetch()[0];
				});
		});
		
	});

	Template.projectHome.helpers({
		title: function() {	
			return proj.name;
		},
		desc: function(){
			return proj.desc;
		},
		project: function(){
			return proj;
		},
		isOwner: function(){
			console.log(proj);
			if(!Meteor.user())
				return false;
			return proj.owner === Meteor.user()._id;
		}
	});
}
