var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name', 'desc', 'ownerName'];

Template.projects.onCreated(function(){
    var self = this;
    self.autorun(function(){
     ProjectSearch = new SearchSource('projects', fields, options);
  });
});


Template.projects.helpers({
  getProjects: function() {
    return ProjectSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "$&");
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return ProjectSearch.getStatus().loading;
  }
});

Template.projects.rendered = function() {
  ProjectSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    ProjectSearch.search(text);
  }, 200)
});
