if(Meteor.isClient)
{
	Template.projectHome.helpers({
		title: function() {		
			return this.name;
		}
	});
}