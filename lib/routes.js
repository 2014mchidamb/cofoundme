Router.configure({
	layoutTemplate:'base_template'
});

Router.route("/", {name: 'home'});
Router.route("/:school", {name: "teamproj"});
Router.route("/:school/projects", 
	{
		name: "proj",
		data: function() {
			return {schoolname: this.params.school};
		}
	}
);

Router.route("/project/mystuff", {name: "myProjects"});
Router.route("/project/new", {name: "newProj"});

Router.route("/profile/:_id/edit",
	{name: "editProfile",
		data: function(){
			return {id:this.params._id};
		}
	}
);
Router.route("/profile/:_id/home", {
	name: "homeProfile",
	data:function () {
		return {id:this.params._id};
	}

});

Router.route("/project/:_id",{
	name: "projectHome",
	template:"projectHome",
	waitOn: function(){
		return Meteor.subscribe("projectById", this.params._id);
	},
	data:function(){
		// Should only correspond one to one project per page
		return Projects.find().fetch()[0];
	}
});


Router.route("/createproject", function() {
	this.render("insertProjectForm");
});

Router.route("/:school/coders",{
	name: "coder",
	data: function() {
		return {schoolname: this.params.school};
	}
});

Router.plugin('ensureSignedIn', {
    only: ['newProj', 'editProf', 'myProjects']
});
