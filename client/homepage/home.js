Template.home.onRendered(function(){
	var select = document.getElementById("schools");
	var options = ["University of Virginia"]; // TODO: load a list of schools from db
	for(var i = 0; i < options.length; i++) {
		var opt = options[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select.appendChild(el);
	}
	 $(document).ready(function() {
        $('select').material_select();
    });

	

});

Template.home.events = {
	"change #schools": function(event) {
		Router.go('/'+event.target.value);
	}
};
