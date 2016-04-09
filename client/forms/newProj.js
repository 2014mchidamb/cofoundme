Template.newProj.events({
	"submit form": function(event) {
		event.preventDefault();
        console.log("form submitted");
		var projname = event.target.proj_name.value;
		var url = event.target.proj_link.value;
        if(url.indexOf("http") == -1)
            url = "http://" + url;
		var school = event.target.school.value;
		var projdesc = event.target.desc.value;
        var projneeds = event.target.needs.value;
        var cofounders = event.target.cofounders.value;
        var members = event.target.members.value;
        var private = event.target.private.checked;
        Meteor.call("insertProject", projname, url, school, cofounders, members, projdesc, projneeds, private, function(error, id)
            {
                if(error)
                    console.log(error);
                else
                {
                    Router.go("/project/"+id+"/home");
                }

            });
		

	}

});
