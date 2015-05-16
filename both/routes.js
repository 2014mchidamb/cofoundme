Router.map(function() {
	this.route('home', {path: '/'});
	this.route('teamproj', {path: '/:school'});
	this.route('proj', {
		path: '/:school/projects',
		data: function() {
			return {schoolname: this.params.school};
		}
	});
});
