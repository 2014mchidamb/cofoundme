// Template.homeProfile.helpers = {
// 	'seeking':function(){
// 		return this.seeking;
// 	}

// };
Template.homeProfile.events = {
    'click #edit_profile': function(event) {
        event.preventDefault();
        Router.go('/profile/edit');
    }
};
