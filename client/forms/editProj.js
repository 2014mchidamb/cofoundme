if(Meteor.isClient)
{
	var proj;
	var sub;
	var projId;
	var cofounders_index = 0;
	var cofounders_length = 0;
	var members_index = 0;
	var members_length = 0;
	// TODO: add private proj permissions checking
	Template.editProj.onCreated(function(){
		var self = this;
		self.autorun(function(){
			projId = self.data.id;
			self.subscribe("projectById", projId, function() {
				proj = Projects.find({_id:projId}).fetch()[0];

			});
		});
		
	});

	
	Template.editProj.helpers({
		name: function() {	
			return proj.name;
		},
		desc: function(){
			return proj.desc;
		},
		needs: function() {
			return proj.needs;
		},
		url: function() {
			return proj.url;
		},
		cofounders: function(){
			return proj.cofounders;
		},
		cofounder_activate: function(){
			if(proj.cofounders)
				return "active";
			return "";
		},
		members: function(){
			return proj.members;
		},
		members_activate: function(){
			if(proj.members)
				return "active";
			return "";
		},
		project: function(){
			return proj;
		},
		isOwner: function(){
			if(!Meteor.user())
				return false;
			return proj.owner === Meteor.user()._id;
		},
		editUrl: function(){
			return '/project/'+projId+'/edit';
		},
		needs: function(){
			return proj.needs;
		}
	});
	//id, projname, url, school, cofounders, members, projdesc, needs, private
	Template.editProj.events({
		"submit form": function(event){
			event.preventDefault();
			var t = event.target;
			var name = t.name.value;
			var url = t.url.value;
			var desc = t.desc.value;
			console.log(t.desc);
			var needs = t.needs.value;
			//TODO
			//var school = t.school.value;
			var school = "University of Virginia";
			var cofounders = t.cofounders.value;
			var members = t.members.value;
			var private = t.private.value;
			Meteor.call('editProj', projId, name, url, school, cofounders, members, desc, needs, private, function(error, result){
				if(error)
					console.log(error);
				else
					Router.go("/project/"+projId+"/home");
			});

		}
	});
}
