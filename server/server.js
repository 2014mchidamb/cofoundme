if(Meteor.isServer)
{
  Slingshot.createDirective("resumeUploader", Slingshot.S3Storage,{
    bucket: "projectyle-resumes",
    acl:"public-read",
    // TODO
    authorize:function(){
      if(!this.userId){
        throw new Meteor.Error("Please login first");
      }
      return true;
    },

    key: function(file){
      var user = Meteor.users.findOne(this.userId);
      return user.emails[0].address + "/" + file.name;

    }

  });

  Slingshot.createDirective("imageUploader", Slingshot.S3Storage,{
    bucket:"projectyle-images",
    acl:"public-read",
    authorize:function(){
      if(!this.userId){
        throw new Meteor.Error("Please login first");
      }
      return true;
    },
    key: function(file){
      var user = Meteor.users.findOne(this.userId);
      return user.emails[0].address+"/"+file.name;
    }

  });

  SearchSource.defineSource('talents', function(searchText, options){
    var options = {sort: {isoScore: -1}, limit: 20};
    if(searchText){
      var regExp = buildRegExp(searchText);
      var selector = {$or: [
        {"profile.name":regExp}
        ]};

        return Meteor.users.find(selector, options).fetch();
      } else
      return Meteor.users.find({}, options).fetch();
    });


  SearchSource.defineSource('projects', function(searchText, options) {
    var options = {sort: {isoScore: -1}, limit: 20};

    if(searchText) {
      var regExp = buildRegExp(searchText);
      var selector = {$or: [
        {name: regExp},
        {desc: regExp},
        {username: regExp},
        {ownerName: regExp}
        ]};

        return Projects.find(selector, options).fetch();
      } else {
        return Projects.find({}, options).fetch();
      }
    });

  SearchSource.defineSource('needs', function(searchText, options) {
    var options = {sort: {isoScore: -1}, limit: 20};

    if(searchText) {
      var regExp = buildRegExp(searchText);
      var selector = {$or: [
        {name: regExp},
        {desc: regExp},
        {needs: regExp},
        {username: regExp},
        {ownerName: regExp}
        ]};

        return Projects.find(selector, options).fetch();
      } else {
        return Projects.find({}, options).fetch();
      }
    });


  function buildRegExp(searchText) {
    // this is a dumb implementation
    var parts = searchText.trim().split(/[ \-\:]+/);
    return new RegExp("(" + parts.join('|') + ")", "ig");
}

Accounts.onCreateUser(function(option, user)
{
  if(option.profile){
   user.profile = option.profile;
   user.profile.owner_of = [];
   user.profile.cofounder_of = [];
   user.profile.member_of = [];
 }
 return user;
});
}
