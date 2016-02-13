/***************************************************************************************************************************************************************
 *
 * Toggle module
 *
 **************************************************************************************************************************************************************/


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Initiate toggle', 'report' );

		if(window.location.hash == '#recover') {
			App.toggle.go('#RecoverPasswordForm', '#CustomerLoginForm');
		}

		$('.js-toggle').on('click', function(e) {
			App.debugging( 'Toggle: clicked', 'interaction' );

			e.preventDefault();
			var $this = $(this);
			var target = $this.attr('href');
			var hiding = $this.attr('data-toggle');

			App.toggle.go(target, hiding);
		});
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module toggle method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.go = function(target, hiding) {
		App.debugging( 'Toggle: Called go method with "' + target + '" and "' + hiding + '"', 'report' );

		var $target = $( target );
		var $hiding = $( hiding );

		$target.removeClass('toggle-hidden');
		$hiding.addClass('toggle-hidden');
	};


	App.toggle = module;

}(App));