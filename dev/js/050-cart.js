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
			var operation = $this.attr('data-value');

			if( operation === 'add' ) {
				var quantity = 1;

				App.cart.add( ID, quantity, $parent );
			}
			else {
				var quantity = $parent.attr('data-quantity') - 1;

				App.cart.sub( ID, quantity, $parent );
			}
		});

		$(document).on('cart.requestComplete', function(event, cart) {
			App.debugging( 'cart: Update: Cart count: ' + cart.item_count, 'report' );

			$('.js-cart').text('(' + cart.item_count + ')');
		});
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// add product to cart
	//
	// @param  id        [string]         ID of product
	// @param  quantity  [string]         Quantity to be added
	// @param  $el       [jQuery object]  Element to mark as loading/not loading
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.add = function( id, quantity, $el ) {
		App.debugging( 'cart: Adding to cart: ID: ' + id + ' quantity: ' + quantity, 'send' );

		App.cart.loading( true, id );

		CartJS.addItem(id, quantity, {}, {
			"success": function(data, textStatus, jqXHR) {
				App.debugging( 'cart: Adding to cart: Responds received', 'receive' );

				var quantity = data.quantity;
				App.cart.update( quantity, id );
				App.cart.loading( false, id );
			},

			"error": function(jqXHR, textStatus, errorThrown) {
				App.debugging( 'cart: Adding to cart: Error', 'error' );

				App.cart.loading( false, id );
			}
		});
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// substract product from cart
	//
	// @param  id        [string]         ID of product
	// @param  quantity  [string]         Quantity to be added
	// @param  $el       [jQuery object]  Element to mark as loading/not loading
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.sub = function( id, quantity, $el ) {
		App.debugging( 'cart: Substrating from cart: ID: ' + id + ' quantity: ' + quantity, 'send' );

		App.cart.loading( true, id );

		CartJS.updateItemById(id, quantity, {}, {
			"success": function(data, textStatus, jqXHR) {
				App.debugging( 'cart: Substrating from cart: Responds received', 'receive' );

				var quantity = 0;

				$.each( data.items, function( index, item ) {
					if( id == item.id ) {
						quantity = item.quantity;
					}
				});

				App.cart.update( quantity, id );
				App.cart.loading( false, id );
			},

			"error": function(jqXHR, textStatus, errorThrown) {
				App.debugging( 'cart: Substrating from cart: Error', 'error' );

				App.cart.loading( false, id );
			}
		});
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// loading indicator
	//
	// @param  loading  [boolean]  Whether loading is on or off
	// @param  id       [string]   Element ID to mark as loading/not loading
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.loading = function( loading, id ) {
		App.debugging( 'cart: Loading: ' + loading, 'report' );

		var $parent = $('.js-addbox[data-id="' + id + '"]');
		var $buttons = $parent.find('.js-addbox-btn');

		if( loading ) {
			$parent.addClass('is-loading');
			$buttons.prop('disabled', true);
		}
		else {
			$parent.removeClass('is-loading');
			$buttons.prop('disabled', false);
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// update product quantity
	//
	// @param  count  [string]  Count for current cart count
	// @param  id     [string]  Variant ID
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.update = function( count, id ) {
		App.debugging( 'cart: Update: Count: ' + count + ' ID: ' + id, 'report' );

		var $parent = $('.js-addbox[data-id="' + id + '"]');

		$parent.attr('data-quantity', count);
		$parent.find('.js-addbox-output').text( count );
	};


	App.cart = module;

}(App));