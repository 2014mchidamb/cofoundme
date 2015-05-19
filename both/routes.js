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

