var fields = ['name'];
var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
var data = [];
var names = [];
var cofounders_add = [];
var members_add = [];
var school = "";

function generateChip(name, id, linked, toAppend){
    $("#"+toAppend+"-chips").append(function(){
        var $div = $("<div>").addClass("chip").html(name);
        var $icon = $("<i>").addClass("material-icons").html("close").attr('id', toAppend+"-"+id);
        if(linked){
            var imgUrl = getImage(id);
            if(imgUrl){
                var $img = $("<img>").attr({
                    src: imgUrl
                });
                $div.append($img);
            }
        }
        return $div.append($icon);
    });

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
        $("#cofounders, #members").autocomplete({
            source: names,
            select: function(event, selected){
                generateChip(selected.item.value, selected.item.id, true, event.target.id);
                if(event.target.id === "cofounders")
                    cofounders_add.push({name:selected.item.value, id:selected.item.id});
                else if(event.target.id === "members")
                    members_add.push({name:selected.item.value, id:selected.item.id});
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


    });

});

Template.newProj.events({
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
        if(url.length > 3 && url.indexOf("http") == -1)
            url = "http://" + url;
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
