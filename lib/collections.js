Projects = new Mongo.Collection("projects");
Resumes = new Mongo.Collection("resumes");
if(Meteor.isServer)
{
	Slingshot.fileRestrictions("resumeUploader",{
		allowedFileTypes:["application/msword", "application/pdf"],
    	maxSize:20*1024*1024 // 20 MB
	});
	Slingshot.fileRestrictions("imageUploader",{
		allowedFileTypes:["image/jpeg", "image/png", "image/tiff"],
		maxSize:20*1024*1024
	});

	Meteor.publish("projectsBySchool", function(schoolname){
		return Projects.find({school:schoolname}, {sort: {createdAt:-1}});
	});

	Meteor.publish("projectsByUser", function(userId){
		return Projects.find({owner:userId}, {sort:{createdAt:-1}});
	});

	Meteor.publish("resumeByUser", function(userId){
		return Resumes.find({owner:userId});
	});

	Meteor.publish("projectById", function(projId){
		return Projects.find({_id:projId});
	});
	Meteor.publish("userById", function(id) {
		return Meteor.users.find({_id:id});
	});
	Meteor.publish("publicUsersBySchool", function(schoolname){
		return Meteor.users.find({"profile.school":schoolname, "profile.seeking":true}, {sort: {createdAt: -1}});
	});

	Meteor.methods({

	storeUrlInDatabase: function(url, collection){
		Modules.lib.checkUrlValid(url);
		if(collection.toLowerCase() === "resumes"){
			return Resumes.insert({
				url:url, 
				owner: Meteor.userId(), 
				added:new Date()
			});
		}

	},

	editUser: function(name, school, skills, seeking, resumeUrl, pictureUrl) {
		if(!Meteor.userId())
			throw new Meteor.Error("not-authorized");
		Meteor.users.update({_id:Meteor.user()._id},{
			$set: {
				profile:{name: name,
					school: school,
					skills: skills,
					resume: resumeUrl,
					picture: pictureUrl,
					seeking:seeking},
				},
				
			});
	},
	editProj: function(id, projname, url, school, cofounders, members, projdesc, projneeds, private){
		if(!Meteor.userId()) // Add more security checks
			throw new Meteor.Error("not-authorized");
		if(!id.length || !projname.length || !school.length)
			throw new Meteor.Error("invalid input");
		else{
			var d = new Date();
			Projects.update({_id:id},{
				$set:{
					name:projname,
					url:url,
					school:school,
					cofounders:cofounders,
					members:members,
					desc:projdesc,
					needs:projneeds,
					private:private,
					updatedAt:d.getTime()
				}});
		}
	},
	deleteProj: function(proj) {
		if (Meteor.userId() !== proj.owner)
			throw new Meteor.Error("not-authorized");
		else {
			Projects.remove({_id:proj._id});
		}

	},

	getProjectsBySchool: function(schoolname){
		return Projects.find({school: schoolname}, {sort: {createdAt: -1}}).fetch();

	},
	getProjectByUser: function(userID){
		return Projects.find({owner: userID}, {sort:{createdAt:-1}}).fetch();
	},
	insertProject: function(projname, url, school, cofounders, members, projdesc, projneeds, priv){
		//console.log(projname + " URL " + url + " School " + school + " Cofounders " + cofounders+ " Members " + members + " Description " + projdesc);
		var objId;
		if(!Meteor.userId())
			throw new Meteor.Error("not-authorized");
		var user = Meteor.users.find({_id:Meteor.userId()}).fetch()[0];
		user = user.profile.name;
		return Projects.insert({
			owner:Meteor.userId(),
			ownerName: user,
			name:projname,
			url:url,
			school:school,
			cofounders:cofounders,
			members:members,
			desc:projdesc,
			needs:projneeds,
			private:priv,
			createdAt:new Date()
		}, 
		function(err, id)
		{
			if(err)
				console.log(err);
			else{
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
