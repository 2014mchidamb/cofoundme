Projects = new Mongo.Collection("projects");
/*Projects.attachSchema(new SimpleSchema({
	name:{
		type: String,
		label: "Project Name",
		max: 100
	},
	school_name:{
		type: String,
		label: "School",
		max: 100
	},
	founders_name:{
		type: [String],
		label: "Founders"
	},
	description:{
		type: String,
		label: "Project Description",
		max: 1000
	},
	tech_stack:{
		type: [String],
		label: "Technologies Used",
		max: 50
	},
	skills_wanted:
	{
		type: [String],
		label: "Looking for Programmers with these skills",
		max: 50
	},
	date_created:{
		type: Date,
		label: "Date Project was Created",
		optional: false
	},
	date_last_updated:{
		type: Date,
		label: "Date Project was Last Updated",
		optional: true
	}
}));*/
//Users = new Mongo.Collection("users");

/*UserInfo.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 100
	},
	school: {
		type: String,
		label: "School",
		max: 100
	},
	desc: {
		type: String,
		label: "Experience",
		max: 1000
	}
}));*/
if(Meteor.isServer)
{
	Meteor.publish("projectsBySchool", function(schoolname){
		return Projects.find({school:schoolname}, {sort: {createdAt:-1}});
	});

	Meteor.publish("projectsByUser", function(userId){
		return Projects.find({owner:userId}, {sort:{createdAt:-1}});

	});

	// Meteor.publish("getUser", function(userId){
	// 	return Users.

	// });

	Meteor.methods({

	//TODO: Add resume
	editUser: function(name, school, skills, seeking) {
		console.log(Meteor.userId());
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