Template.proj.helpers({
	projects: function() {
		var schoolname = window.location.pathname.split('/')[1];
		return Projects.find({school: schoolname}, {sort: {createdAt: -1}});
	}
});
