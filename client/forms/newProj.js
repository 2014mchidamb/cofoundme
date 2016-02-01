var cofounders_index = 1;
var members_index = 1;
Template.newProj.rendered = function(){
    $("#addname_cofounders").click(function() {
        var intId = $("#cofounders-set div").length + 1;
        var fieldWrapper = $("<div class=\"fieldwrapper\" id=\"field" + intId + "\"/>");
        var fName = $("<input type=\"text\" name=\"cofounders[]\" class=\"cofounders\" id=\"cofounders" + cofounders_index++ + "\" />");
        var fType = $("<select class=\"fieldtype\"><option value=\"checkbox\">Checked</option><option value=\"textbox\">Text</option><option value=\"textarea\">Paragraph</option></select>");
        var removeButton = $("<input type=\"button\" class=\"waves-effect waves-light btn\" value=\"Remove\" />");
        removeButton.click(function() {
            $(this).parent().remove();
            cofounders_index--;
        });
        fieldWrapper.append(fName);
        fieldWrapper.append(fType);
        fieldWrapper.append(removeButton);
        $("#cofounders-set").append(fieldWrapper);
        // $("body").append(fieldSet);
    });
    $("#addname_members").click(function() {
        var intId = $("#memberss-set div").length + 1;
        var fieldWrapper = $("<div class=\"fieldwrapper\" id=\"field" + intId + "\"/>");
        var fName = $("<input type=\"text\" name=\"members[]\" class=\"members\" id=\"members" + members_index++ + "\" />");
        var fType = $("<select class=\"fieldtype\"><option value=\"checkbox\">Checked</option><option value=\"textbox\">Text</option><option value=\"textarea\">Paragraph</option></select>");
        var removeButton = $("<input type=\"button\" class=\"waves-effect waves-light btn\" value=\"Remove\" />");
        removeButton.click(function() {
            $(this).parent().remove();
            members_index--;
        });
        fieldWrapper.append(fName);
        fieldWrapper.append(fType);
        fieldWrapper.append(removeButton);
        $("#members-set").append(fieldWrapper);
        // $("body").append(fieldSet);
    });



};

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
        var cofounders_values = [];

        for(var cindex = 0; cindex< cofounders_index; cindex++)
        {
            var key = "cofounders"+cindex;
            cofounders_values.push(event.target[key].value);
        }

        var members_values = [];
        for(var mindex = 0; mindex < members_index; mindex++)
        {
            var key = "members"+mindex;
            members_values.push(event.target[key].value);
        }
        var priv = event.target.private.checked;
        Meteor.call("insertProject", projname, url, school, cofounders_values, members_values, projdesc, priv, function(error, id)
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
