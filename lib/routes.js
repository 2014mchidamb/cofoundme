Router.configure({
	layoutTemplate:'base_template'
});

Router.route("/", {name: 'home'});

Router.route("/:school/coders", {
	data:function(){
		return {schoolname:this.params.school};
	},
	template: "search_template",
	yieldTemplates:{
		'talents':{to:'searchResult'},
		'talentsHeader':{to:'searchHeader'}
	}
});

Router.route("/:school", {name: "teamproj"});
Router.route("/:school/projects", {
	name: "projects",
	data: function() {
		return {schoolname: this.params.school};
	},
	template: "search_template",
	yieldTemplates:{
		'projects':{to:'searchResult'},
		'projectsHeader':{to:'searchHeader'}
	}
});
Router.route("/:school/needs", {
    name: "needs",
    data: function() {
        return {schoolname: this.params.school};
    },
    template: "search_template",
    yieldTemplates:{
        'needs':{to:'searchResult'},
        'needsHeader':{to:'searchHeader'}
    }
});

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
		//Session.set("userid", this.params._id);
		return {id:this.params._id};
	}

});

Router.route("/project/:_id/home",{
	name: "projectHome",
	data:function(){
		// Should only correspond one to one project per page
		//Session.set("currentProjId", this.params._id);
		return {id:this.params._id};
	}
});


Router.route("/project/:_id/edit",{
	name: "editProj",
	data: function(){
		return {id:this.params._id};
	}	

});

// Router.route("/:school/coders",{
// 	name: "coder",
// 	data: function() {
// 		return {schoolname: this.params.school};
// 	}
// });

Router.plugin('ensureSignedIn', {
	only: ['newProj', 'editProf', 'myProjects']
});
