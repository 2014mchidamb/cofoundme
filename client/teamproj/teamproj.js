Template.teamproj.events = {
    'click #proj': function(event) {
        event.preventDefault();
        Router.go(window.location.pathname+'/projects'); //change to get current url
    }
}

