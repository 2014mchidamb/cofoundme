if(Meteor.isServer)
{
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
