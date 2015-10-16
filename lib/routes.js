// Router.map(function() {
// 	this.route('home', {path: '/'});
// 	this.route('teamproj', {path: '/:school'});
// 	this.route('proj', {
// 		path: '/:school/projects',
// 		data: function() {
// 			return {schoolname: this.params.school};
// 		}
// 	});
// });
Router.configure({
	layoutTemplate:'base_template'
});

Router.route("/", {name: 'home'});
Router.route("/:school", {name: "teamproj"});
Router.route("/:school/projects", 
	{name: "proj",
		data: function() {
			return {schoolname: this.params.school};
		}});

Router.route("/project/mystuff", {name: "myProjects"});
Router.route("/project/new", {name: "newProj"});
Router.route("/profile/edit", {name: "editProfile"});
Router.route("/profile/home", {name: "homeProfile"});
// Router.route("/createproject", function(){
// 	this.render("insertProjectForm");
// });

Router.route("/:school/coders",
	{name: "coder",
		data: function() {
			return {schoolname: this.params.school};
		}});

Router.plugin('ensureSignedIn', {
    only: ['newProj', 'editProf', 'myProjects']
});
