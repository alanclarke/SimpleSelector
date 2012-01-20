/**
 * $imple$elector ($$)
 *
* @fileOverview
 *    SimpleSelector is a small DOM selector object with support for the
 *    most used selectors, like:
 *     - By id:        $$( '#wrap' )
 *     - By class:     $$( '.special' )
 *     - By tag:       $$( 'p' )
 *     - Mulitple:     $$( '#id, .cls' )
 *     - Give context: $$( 'a', '#wrap' ) or $$( '#wrap a' )
 *    Released under MIT license.
 * @version 1.0.0
 * @author Victor Villaverde Laan
 * @link http://www.freelancephp.net/simple-css-selector-function/
 * @link https://github.com/freelancephp/SimpleSelector
 */

/**
 * Selector function
 * @function
 * @param {String} selector
 * @param {String|DOMNode|DOMNode[]} [context=window.document]
 * @return {DOMNode[]}
 */
var $$ = function () {

	/**
	 * @private
	 */
	function isObjType ( o, type ) {
		return Object.prototype.toString.call( o ) === '[object '+ type +']';
	};

	/**
	 * Check if node d is part of root a
	 * @private
	 */
	function isDesc ( d, a ) {
		return d.parentNode == a || d.tagName.toUpperCase() != 'HTML' && isDesc( d.parentNode, a );
	};

	/**
	 * @private
	 */
	function itemExists( arr, item ) {
		for ( var j = 0, max = arr.length; j < max; j++ ) {
			if ( arr[j] === item )
				return true;
		}

		return false;
	}

	/**
	 * @private
	 */
	function clearDuplicates( arr ) {
		var a = [];

		for ( var i = 0, max = arr.length; i < max; i++ ) {
			if ( ! itemExists( a, arr[i] ) )
				a.push( arr[i] );
		}

		return a;
	}

	return function ( selector, context ) {
		var s = selector,
			c = context,
			els = [];

		// prepare selector
		s = s.split( ',' );

		// prepare context
		c = isObjType( c, 'String' ) ? $$( c ) : c && c.length ? c : document;

		// make array
		if ( ! isObjType( c, 'Array' ) )
			c = [ c ];

		// loop through given contexts
		for ( var i in c ) {
			// loop through given selectors
			for ( var j in s ) {
				var strim = s[ j ].replace( /\s+/g, '' ),
					sp = s[ j ].split( ' ' ),
					op = strim.substr( 0, 1 ),
					name = strim.substr( 1 ),
					tels = [],
					nextContext;

				if ( sp.length > 1 ) {
				// make recursive call to handle f.e. "body div p strong"
					nextContext = $$( sp[ 0 ], c[ i ] );
					tels = $$( sp.slice( 1 ).join( ' ' ), nextContext );
					els = els.concat( tels );
				} else if ( op == '#' ) {
				// by id
					tels[ 0 ] = c[ i ].getElementById ? c[ i ].getElementById( name ) : document.getElementById( name );

					// check if founded array is part of context
					if ( tels[0] && isDesc( tels[0], c[ i ] ) )
						els.push( tels[0] );
				} else if ( op == '.' ) {
				// by className
					var expr = new RegExp( '(^|\\s)'+ name +'(\\s|$)' ),
						all = c[ i ].getElementsByTagName( '*' );

						// filter all elements that contain the given className
						for ( var v = 0, w = all.length; v < w; v++ ) {
							if ( expr.test( all[ v ].className ) )
								els.push( all[ v ] );
						}
				} else {
				// by tagName
					tels = c[ i ].getElementsByTagName( strim );

					// add all founded elements
					for ( var y = 0, z = tels.length; y < z; y++ )
						els.push( tels[ y ] );
				}
			}
		}

		// return array of elements
		return clearDuplicates( els );
	};

}();
