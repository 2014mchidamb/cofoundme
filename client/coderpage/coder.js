Template.coder.helpers({
	coders: function() {
		var schoolname = decodeURI(window.location.pathname.split('/')[1]); // Remove %20 
		// Meteor.subscribe("users", schoolname);
		var result = Meteor.users.find({"profile.school":schoolname, "profile.seeking":true}, {sort: {createdAt: -1}}).fetch();
		console.log(result);
		return result;
	}
});
