var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name', 'desc', 'ownerName'];


Template.talents.onCreated(function(){
    var self = this;
    self.autorun(function(){
     TalentsSearch = new SearchSource('talents', fields, options);
  });
});


Template.talents.helpers({
  getTalents: function() {
    return TalentsSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>");
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return TalentsSearch.getStatus().loading;
  }
});

Template.talents.rendered = function() {
  TalentsSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    TalentsSearch.search(text);
  }, 200)
});
