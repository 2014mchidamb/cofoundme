var fields = ['name'];
var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
var data = [];
var names = [];
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
            names[i] = data[i].profile.name;
    });

    $(function(){
        $("#cofounders").autocomplete({
            source: names
        }).data("uiAutocomplete")._renderItem = function(ul, item){
            var $li = $('<li>');
            var $img = $('<img>');
            var imgUrl;
            for(var i = 0; i < data.length; i++){
                if(data[i].profile.name === item.label)
                    imgUrl = data[i].profile.picture;

            }
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
        $(function(){
        $("#members").autocomplete({
            source: names
        }).data("uiAutocomplete")._renderItem = function(ul, item){
            var $li = $('<li>');
            var $img = $('<img>');
            var imgUrl;
            for(var i = 0; i < data.length; i++){
                if(data[i].profile.name === item.label)
                    imgUrl = data[i].profile.picture;

            }
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
        {
            TalentsSearch.search(text);

        }
    }),
    "keyup #members":_.throttle(function(event){
        var text = $(event.target).val().trim();
        if(text)
        {
            TalentsSearch.search(text);

        }
    }),
    "submit form": function(event) {
      event.preventDefault();
      console.log("form submitted");
      var projname = event.target.proj_name.value;
      var url = event.target.proj_link.value;
      if(url && url.indexOf("http") == -1)
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
