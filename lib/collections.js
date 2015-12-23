Projects = new Mongo.Collection("projects");
if(Meteor.isServer)
{
	Meteor.publish("projectsBySchool", function(schoolname){
		return Projects.find({school:schoolname}, {sort: {createdAt:-1}});
	});

	Meteor.publish("projectsByUser", function(userId){
		return Projects.find({owner:userId}, {sort:{createdAt:-1}});

	});

	Meteor.publish("projectById", function(projId){
		return Projects.find({_id:projId});
	});
	// Meteor.publish("getUser", function(userId){
	// 	return Users.

	// });

	Meteor.methods({

	//TODO: Add resume
	editUser: function(name, school, skills, seeking) {
		if(!Meteor.userId())
			throw new Meteor.Error("not-authorized");

		Meteor.users.update({_id:Meteor.user()._id},{
			$set: {
				profile:{name: name,
					school: school,
					skills: skills,
					seeking:seeking},
				},
				
			});
	},

	getProjectsBySchool: function(schoolname){
		return Projects.find({school: schoolname}, {sort: {createdAt: -1}}).fetch();

	},
	getProjectByUser: function(userID){
		return Projects.find({owner: userID}, {sort:{createdAt:-1}}).fetch();
	},
	insertProject: function(projname, url, school, cofounders, members, projdesc){
		//console.log(projname + " URL " + url + " School " + school + " Cofounders " + cofounders+ " Members " + members + " Description " + projdesc);
		if(!Meteor.userId())
			throw new Meteor.Error("not-authorized");
		Projects.insert({
			owner:Meteor.userId(),
			name:projname,
			url:url,
			school:school,
			cofounders:cofounders,
			members:members,
			desc:projdesc,
			createdAt:new Date()
		});

		// Meteor.users.update({_id:Meteor.user()._id},{
		// 	$set: {
		// 		profile.cofounder_of:
		// 	}
		// });



	}

});
}
