Template.coder.helpers({
	coders: function() {
		var schoolname = window.location.pathname.split('/')[1];
		return Meteor.users.find({'profile.school': schoolname}, {sort: {createdAt: -1}});
	}
});

Meteor.startup(function () {
	console.log('got here');
	particlesJS('particles-js', {});
});
