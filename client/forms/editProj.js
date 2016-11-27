var fields = ['name'];
var options = {
	keepHistory: 1000 * 60 * 5,
	localSearch: true
};
var proj;
var projId;
var projectSub;
var data = [];
var names = [];
var cofounders_add = [];
var members_add = [];
var cofoundersDep = new Tracker.Dependency();
var membersDep = new Tracker.Dependency();
var loadedAutoComplete = false;

function addUserToArray(name, id, toAssign){
	var person = {name: name};
	if(id){
		person.id = id;
		var img = getImage(id);
		if(img)
			person.img = img;
	}
	if(toAssign === "cofounders") {
		cofounders_add.push(person);
		cofoundersDep.changed();
	}
	else {
		members_add.push(person);
		membersDep.changed();
	}

}
function getImage(id){
	for(var i = 0; i < data.length; i++){
		if(data[i]._id === id) {
			return data[i].profile.picture;
		}
	}
	return null;
}

function initializeNamesToArray(items, toAssign) {
	for (var i = 0; i < items.length; i++) {
		item = items[i];
		if (item.length !== 0) {
			// All members and cofounders arrays should store JSON, but incase some legacy (string) data slips by...
			if (typeof(item) == "object" && 'id' in item) {
				addUserToArray(item.name, item.id, toAssign);
			}
			else if ('name' in item) {
				addUserToArray(item.name, null, toAssign);
			} 
			else {
				addUserToArray(item, null, toAssign);
			}
		}
	}
}

Template.editProj.onCreated(function(){
	var self = this;
	self.autorun(function(){
		projId = self.data.id;
		projectSub = self.subscribe("projectById", projId, function() {
			proj = Projects.find({_id:projId}).fetch()[0];
			if (cofounders_add.length === 0)
				initializeNamesToArray(proj.cofounders, "cofounders");
			if (members_add.length === 0)
				initializeNamesToArray(proj.members, "members");

		});
	});
});
// TODO: add private proj permissions checking
Template.editProj.onRendered(function(){
	TalentsSearch = new SearchSource('talents', fields, options);
	var self = this;
	$(document).ready(function() {
		$('select').material_select();
	});

	self.autorun(function(){
		data = TalentsSearch.getData({
			transform: function(matchText, regExp){
				return matchText.replace(regExp, "<b>$&</b>");
			},
			sort:{isoScore: -1}
		});
   		//move names into separate array for autocomplete, use data array for full user data
   		for(var i = 0; i < data.length; i++)
   			names[i] = {label:data[i].profile.name, value: data[i].profile.name, id:data[i]._id};
   		
   		/*
		DOM for the form doesn't load until the subscription is ready, so wait for project to load and
		then on the next tracker flush to interact with DOM elements. 
		*/
		if (!loadedAutoComplete && projectSub && projectSub.ready()) {
			Tracker.afterFlush(function() {
				loadedAutoComplete = true;
				$(function(){
			        // set autocomplete
			        $("#cofounders").autocomplete({
			        	source: names,
			        	select: function(event, selected){
			        		generateChip(selected.item.value, selected.item.id, event.target.id);
			        		$(this).val("");
			        		event.preventDefault();

			        	}
			        }).data("uiAutocomplete")._renderItem = function(ul, item){
			        	var $li = $('<li>');
			        	var $img = $('<img>');
			        	var imgUrl = getImage(item.id);
			        	$li.append('<a href=#>');
			        	if(imgUrl){
			        		$img.attr({
			        			src:imgUrl,
			        			class:"profile-picture-small"
			        		});
			        		$li.find('a').append($img);
			        	}
			        	$li.attr('data-value', item.label);
			        	$li.find('a').append(item.label);
			        	return $li.appendTo(ul);
			        };

			        $("#members").autocomplete({
			        	source: names,
			        	select: function(event, selected){
			        		generateChip(selected.item.value, selected.item.id, event.target.id);
			        		$(this).val("");
			        		event.preventDefault();

			        	}
			        }).data("uiAutocomplete")._renderItem = function(ul, item){
			        	var $li = $('<li>');
			        	var $img = $('<img>');
			        	var imgUrl = getImage(item.id);
			        	$li.append('<a href=#>');
			        	if(imgUrl){
			        		$img.attr({
			        			src:imgUrl,
			        			class:"profile-picture-small"
			        		});
			        		$li.find('a').append($img);
			        	}
			        	$li.attr('data-value', item.label);
			        	$li.find('a').append(item.label);
			        	return $li.appendTo(ul);
			        };

			        // save default state 
			        var renderCofounders = $("#cofounders").autocomplete('instance')._renderMenu;
			        var renderMembers = $("#members").autocomplete('instance')._renderMenu;
			        $("#cofounders").autocomplete('instance')._renderMenu = function(ul, items) {
			        	items.push({
			        		label: "Press enter to add name",
			        		value: ""
			        	});
			        	renderCofounders.call(this, ul, items);
			        };
			        $("#members").autocomplete('instance')._renderMenu = function(ul, items) {
			        	items.push({
			        		label: "Press enter to add name",
			        		value: ""
			        	});
			        	renderMembers.call(this, ul, items);
			        };         
			    });
			});
		}

	});

});

Template.editProj.events({
	"keydown #cofounders": function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			var text = event.target.value.trim();
			addUserToArray(text, null, "cofounders");
			$(event.target).val("");
		}
	},
	"keydown #members": function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			var text = event.target.value.trim();
			addUserToArray(text, null, "members");
			$(event.target).val("");
		}
	},
	"keyup #cofounders": _.throttle(function(event){

		var text = event.target.value.trim();
		if(text)
			TalentsSearch.search(text);        
	}),
	"keyup #members":_.throttle(function(event){
		var text = event.target.value.trim();
		if(text)
			TalentsSearch.search(text);
	}),
	"click .material-icons": function(event){
        //type-id e.g cofounders-D9NXuMNxMGjPhEqp2
        var split = event.target.id.split("-");
        var arr = eval(split[0]+"_add");
        var index = -1;
        for(var i = 0; i < arr.length; i++){
        	if(arr[i].id === split[1]){
        		index = i;
        		break;
        	}
        }
        if(index > -1)
        	arr.splice(index, 1);
    },
    //id, projname, url, school, cofounders, members, projdesc, needs, private
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
		var cofounders = cofounders_add;
		var members = members_add;
		var private = t.private.value;
		Meteor.call('editProj', projId, name, url, school, cofounders, members, desc, needs, private, function(error, result){
			if(error)
				console.log(error);
			else {
				Router.go("/project/"+projId+"/home");
			}
		});

	}

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
		cofoundersDep.depend();
		return cofounders_add;
	},
	cofounder_activate: function(){
		if(cofounders_add)
			return "active";
		return "";
	},
	members: function(){
		membersDep.depend();
		return members_add;
	},
	members_activate: function(){
		if(members_add)
			return "active";
		return "";
	},
	project: function(){
		return proj;
	},
	isOwner: function(){
		if(proj){
			if(!Meteor.user())
				return false;
			return proj.owner === Meteor.user()._id;
		}
		return false;
	},
	editUrl: function(){
		return '/project/'+projId+'/edit';
	},
	private: function(){
		if(proj.private)
			return "checked";
		return;
	}
});

