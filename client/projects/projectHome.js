if(Meteor.isClient)
{
	var proj;
	var sub;
	Template.projectHome.created = function(){
		sub = Meteor.subscribe("projectById", this.data, function() {
					proj = Projects.find().fetch()[0];
			});

	};
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