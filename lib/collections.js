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
	Meteor.publish("publicUsersBySchool", function(schoolname){
		return Meteor.users.find({"profile.school":schoolname, "profile.seeking":true}, {sort: {createdAt: -1}});
	});

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
		var objId;
		if(!Meteor.userId())
			throw new Meteor.Error("not-authorized");
		return Projects.insert({
			owner:Meteor.userId(),
			name:projname,
			url:url,
			school:school,
			cofounders:cofounders,
			members:members,
			desc:projdesc,
			createdAt:new Date()
		}, 
		function(err, id)
		{
				if(err)
					console.log(err);
				else{
					console.log(id);
					objId = id;

				// Enter callback hell
				// Meteor.users.update({_id:Meteor.user()._id},{
				// 	$set: {
				// 		profile.cofounder_of:
				// 	}
				// });

					return id;
				}
			}
		);

	}

});
}
