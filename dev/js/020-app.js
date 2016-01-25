/*! Author: Dominik Wilkowski | Version: --currentVersion-- */
/***************************************************************************************************************************************************************
 *
 * App framework and settings
 *
 **************************************************************************************************************************************************************/

'use strict';


var App = (function() {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// settings
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	return {
		DEBUG: true, //debugging infos


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Initiate app
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		init: function() {
			if( App.DEBUG ) console.log('%cDEBUGGING INFORMATION', 'font-size: 25px;');
			App.debugging('Initiating app', 'report');

			//remove fallback HTML
			$('.js-body').removeClass('no-js');

			App.nav.init();

			if( $('.js-gallery').length ) {
				App.debugging('Found gallery instance', 'report');

				App.gallery.init();
			}
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// throttle function
		//
		// @param   func       [function]  Function to be executed
		// @param   wait       [integer]   Run as much as possible without ever going more than once per [n in milliseconds] duration
		//
		// @return  [function]
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		throttle: function Throttle(func, wait) {
			App.debugging( 'Base: Throttle called', 'report' );

			wait || (wait = 250);
			var last;
			var deferTimer;

			return function() {
				var context = this;
				var now = +new Date;
				var args = arguments;

				if(last && now < last + wait) {
					clearTimeout(deferTimer);

					deferTimer = setTimeout(function() {
						App.debugging( 'Base: Throttle executed (1)', 'report' );

						last = now;
						func.apply(context, args);
					}, wait);
				}
				else {
					App.debugging( 'Base: Throttle executed (2)', 'report' );

					last = now;
					func.apply(context, args);
				}
			};
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// debugging prettiness
		//
		// text  string   Text to be printed to debugger
		// code  keyword  What kind of urgency: report,error,interaction
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		debugging: function( text, code ) {

			if( code === 'report' ) {
				if( App.DEBUG ) console.log('%c\u2611 ', 'color: green; font-size: 18px;', text);
			}

			else if( code === 'error' ) {
				if( App.DEBUG ) console.log('%c\u2612 ', 'color: red; font-size: 18px;', text);
			}

			else if( code === 'interaction' ) {
				if( App.DEBUG ) console.log('%c\u261C ', 'color: blue; font-size: 18px;', text);
			}

		}

	}

}());