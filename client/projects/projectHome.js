if(Meteor.isClient)
{
	var proj;
	var sub;
	// TODO: add private proj permissions checking
	Template.projectHome.onCreated(function(){
		var self = this;
		self.autorun(function(){
			var projId = self.data.id;
			self.subscribe("projectById", projId, function() {
					proj = Projects.find({_id:projId}).fetch()[0];
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
			if(!Meteor.user())
				return false;
			return proj.owner === Meteor.user()._id;
		}
	});
}
