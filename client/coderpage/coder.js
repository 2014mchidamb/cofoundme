if(Meteor.isClient)
{
	var result;
	Template.coder.onCreated(function(){
		var schoolname = this.data.schoolname;
		Meteor.subscribe("publicUsersBySchool", schoolname);
		

	});
	Template.coder.helpers({
		coders: function() {
			result = Meteor.users.find().fetch();
			console.log(result);
			return result;
		}
	});
}
