/***************************************************************************************************************************************************************
 *
 * Shopify cart module
 *
 * Ajax methods to interact with Shopify API
 *
 **************************************************************************************************************************************************************/


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Initiate cart', 'report' );

		$('.js-addbox-btn').on('click', function() {
			var $this = $(this);
			var $parent = $this.parents('.js-addbox');
			var $output = $parent.find('.js-addbox-output');
			var ID = $this.attr('data-id');
			// var quantity = parseInt( $output.text() ) > 0 ? parseInt( $output.text() ) : 0;
			var quantity = 1;

			App.cart.add( ID, quantity );
		});
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// add product to cart
	//
	// @param  id        [string]  ID of product
	// @param  quantity  [string]  Quantity to be added
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.add = function( id, quantity ) {
		App.debugging( 'cart: Adding to cart: ID: ' + id + 'quantity: ' + quantity, 'send' );

		$.post('/cart/add.js', {
			id: id,
			quantity: quantity,
		}, function( data ) {
			App.debugging( 'cart: Adding to cart: Responds received', 'receive' );

			console.log(data);
		});
	};


	App.cart = module;

}(App));