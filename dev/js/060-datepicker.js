/***************************************************************************************************************************************************************
 *
 * Datepicker module
 *
 **************************************************************************************************************************************************************/


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.change = function() {
		App.debugging( 'Datepicker changed', 'interaction' );

		var date = $('.js-datepicker').val();
		var _isSaturday = false;

		if( date.length > 3 ) {
			$('.js-cartbottom').addClass('has-delivery');
		}
		else {
			$('.js-cartbottom').removeClass('has-delivery');
		}

		if( date.substring(0, 3) === 'Sat' ) {
			_isSaturday = true;
		}

		CartJS.setAttribute('Delivery date', date);

		$('.js-datepicker').prop('disabled', true);
		$('.js-datepicker').parent().addClass('is-loading');

		if( _isSaturday ) {
			CartJS.addItem(16285494083, 1, {}, {
				"success": function(data, textStatus, jqXHR) {
					App.debugging( 'Datepicker: Adding to cart: Responds received', 'receive' );

					window.location.reload( false );
				},

				"error": function(jqXHR, textStatus, errorThrown) {
					App.debugging( 'Datepicker: Adding to cart: Error', 'error' );

					$('.js-datepicker').prop('disabled', false);
				}
			});
		}
		else {
			CartJS.updateItemById(16285494083, 0, {}, {
				"success": function(data, textStatus, jqXHR) {
					App.debugging( 'Datepicker: Substrating from cart: Responds received', 'receive' );

					window.location.reload( false );
				},

				"error": function(jqXHR, textStatus, errorThrown) {
					App.debugging( 'Datepicker: Substrating from cart: Error', 'error' );

					$('.js-datepicker').prop('disabled', false);
				}
			});
		}
	};


	App.datepicker = module;

}(App));