var fields = ['name'];
var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
var data = [];
var names = [];
var cofounders_add = [];
var cofoundersDep = new Tracker.Dependency();
var members_add = [];
var membersDep = new Tracker.Dependency();
var school = "University of Virginia"; //change in the future

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
        if(data[i]._id === id)
            return data[i].profile.picture;
    }
    return null;
}

Template.newProj.onRendered(function(){
    TalentsSearch = new SearchSource('talents', fields, options);
    var select = document.getElementById("schools");
    var options = ["University of Virginia"]; // TODO: load a list of schools from db
    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
    $(document).ready(function() {
        $('select').material_select();
    });

    //user searching
    var self = this;
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

    });


    $(function(){
        // set autocomplete
        $("#cofounders").autocomplete({
            source: names,
            select: function(event, selected){
                addUserToArray(selected.item.value, selected.item.id, event.target.id);
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
                addUserToArray(selected.item.value, selected.item.id, event.target.id);
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

Template.newProj.events({
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
        var text = $(event.target).val().trim();
        if(text)
            TalentsSearch.search(text);        
    }),
    "keyup #members":_.throttle(function(event){
        var text = $(event.target).val().trim();
        if(text)
            TalentsSearch.search(text);
    }),
    "change #school": function(event){
        school = event.target.value;
    },
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
    "submit form": function(event) {
        event.preventDefault();
        var projname = event.target.proj_name.value;
        var url = event.target.proj_link.value;
        if(url.length > 3 && url.indexOf("http://") == -1) {
            url = "http://" + url;
        }
        var projdesc = event.target.desc.value;
        var projneeds = event.target.needs.value;
        var private = event.target.private.checked;
        Meteor.call("insertProject", projname, url, school, cofounders_add, members_add, projdesc, projneeds, private, function(error, id)
        {
            if(error)
                console.log(error);
            else
                Router.go("/project/"+id+"/home");
        });
    }

});

Template.newProj.helpers({
    'cofounders': function() {
        cofoundersDep.depend();
        return cofounders_add;
    },
    'members': function() {
        membersDep.depend();
        return members_add;
    }

});
