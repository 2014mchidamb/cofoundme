if(Meteor.isClient)
{
	var proj;
	var sub;
	var projId;
	// TODO: add private proj permissions checking
	Template.editProj.onCreated(function(){
		var self = this;
		self.autorun(function(){
			projId = self.data.id;
			self.subscribe("projectById", projId, function() {
				proj = Projects.find({_id:projId}).fetch()[0];
			});
		});
		
	});

	Template.editProj.onRendered(function(){
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
	});


	Template.editProj.helpers({
		name: function() {	
			return proj.name;
		},
		desc: function(){
			return proj.desc;
		},
        needs: function() {
            return proj.needs;
        },
		url: function() {
			return proj.url;
		},
		cofounders: function(){
			return proj.cofounders;
		},
		members: function(){
			return proj.members;
		},
		project: function(){
			return proj;
		},
		isOwner: function(){
			if(!Meteor.user())
				return false;
			return proj.owner === Meteor.user()._id;
		},
		editUrl: function(){
			return '/project/'+projId+'/edit';
		}
	});
	//id, projname, url, school, cofounders, members, projdesc, needs, private
	Template.editProj.events({
		"submit form": function(event){
			event.preventDefault();
			var t = event.target;
			var name = t.name.value;
			var url = t.url.value;
			var desc = t.desc.value;
            var needs = t.needs.value;
			//TODO
			//var school = t.school.value;
			var school = "University of Virginia";
			var cofounders = t.cofounders.value;
			var members = t.members.value;
			var private = t.private.value;
			Meteor.call('editProj', projId, name, url, school, cofounders, members, desc, needs, private, function(error, result){
				if(error)
					console.log(error);
				else
					Router.go("/project/"+projId+"/home");
			});

		}
	});
}
