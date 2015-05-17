Template.teamproj.events = {
    'click #proj': function(event) {
        event.preventDefault();
        Router.go(window.location.pathname+'/projects'); //change to get current url
    }
}

Meteor.startup(function () {
	console.log('got here');
    particlesJS('particles-js', {});
});
