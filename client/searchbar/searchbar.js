var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name', 'desc', 'ownerName'];

ProjectSearch = new SearchSource('projects', fields, options);

Template.searchResult.helpers({
  getProjects: function() {
    return ProjectSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return ProjectSearch.getStatus().loading;
  }
});

Template.searchResult.rendered = function() {
  ProjectSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    ProjectSearch.search(text);
  }, 200)
});
