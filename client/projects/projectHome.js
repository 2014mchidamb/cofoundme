if(Meteor.isClient)
{
	var proj;
	var sub;
	var projId;
	// TODO: add private proj permissions checking
	Template.projectHome.onCreated(function(){
		var self = this;
		self.autorun(function(){
			projId = self.data.id;
			self.subscribe("projectById", projId, function() {
					proj = Projects.find({_id:projId}).fetch()[0];
				});
		});
		
	});

	Template.projectHome.events = {
		'click #edit_project': function(event) {
			event.preventDefault();
			Router.go('/project/'+projId+'/edit');
		},
		'click #delete_project': function(event) {
			$('#modal_delete').openModal();
		},
		'click #confirm_delete_project': function(event) {
			Meteor.call("deleteProj", proj, function(err) {
				if (err)
					console.log(err);
				else {
					Router.go('/'+Meteor.user().profile.school);
				}
			});
		}
	};


	Template.projectHome.helpers({
		title: function() {	
			return proj.name;
		},
		desc: function(){
			return proj.desc;
		},
		url:function(){
			return proj.url;
		},
        needs: function() {
            return proj.needs;
        },
		project: function(){
			return proj;
		},
		cofounders: function() {
			return proj.cofounders;
		},
		members: function() {
			return proj.members;
		},
		isOwner: function(){
			if(!Meteor.user())
				return false;
			return proj.owner === Meteor.user()._id;
		}
	});
}
