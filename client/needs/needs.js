var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name', 'desc', 'ownerName'];


Template.needs.onCreated(function(){
    var self = this;
    self.autorun(function(){
     NeedsSearch = new SearchSource('talents', fields, options);
  });
});


Template.needs.helpers({
  getNeeds: function() {
    return NeedsSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>");
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return NeedsSearch.getStatus().loading;
  }
});

Template.needs.rendered = function() {
  NeedsSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    NeedsSearch.search(text);
  }, 200)
});
