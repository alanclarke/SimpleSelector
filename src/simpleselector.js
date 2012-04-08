/**
 * SimpleSelector ($$)
 *
* @fileOverview
 *    SimpleSelector is a small DOM selector object with support for the
 *    most used selectors, like:
 *     - By id:        $$('#wrap')
 *     - By class:     $$('.special')
 *     - By tag:       $$('p')
 *     - Mulitple:     $$('#id, .cls')
 *     - Give context: $$('a', '#wrap') or $$('#wrap a')
 *    Released under MIT license.
 * @version 1.1.0
 * @author Victor Villaverde Laan
 * @link http://www.freelancephp.net/simple-css-selector-function/
 * @link https://github.com/freelancephp/SimpleSelector
 */
(function (window) {

var SimpleSelector = window.SimpleSelector = {

	/**
	 * Selector function
	 * @param {String} selector
	 * @param {String|DOMElement|DOMElement[]} [context=window.document]
	 * @return {DOMElement[]}
	 */
	select: function (selector, context) {
		var s = selector,
			c = context,
			els = [];

		// prepare selector
		s = s.split(',');

		// prepare context
		c = isObjType(c, 'String') ? $$(c) : c && c.length ? c : window.document;

		// make array
		if (!isObjType(c, 'Array'))
			c = [c];

		// loop through given contexts
		for (var i in c) {
			// loop through given selectors
			for ( var j in s) {
				var strim = s[j].replace(/\s+/g, ''),
					sp = s[j].split(' '),
					op = strim.substr(0, 1),
					name = strim.substr(1),
					tels = [],
					nextContext;

				if (sp.length > 1) {
				// make recursive call to handle f.e. "body div p strong"
					nextContext = $$(sp[0], c[i]);
					tels = $$(sp.slice(1).join(' '), nextContext);
					els = els.concat(tels);
				} else if (op == '#') {
				// by id
					tels[0] = c[i].getElementById ? c[i].getElementById(name) : window.document.getElementById(name);

					// check if founded array is part of context
					if (tels[0] && SimpleSelector.isDescendant(tels[0], c[i]))
						els.push(tels[0]);
				} else if (op == '.') {
				// by className
					var expr = new RegExp('(^|\\s)'+ name +'(\\s|$)'),
						all = c[i].getElementsByTagName('*');

						// filter all elements that contain the given className
						for (var v = 0, w = all.length; v < w; v++) {
							if (expr.test(all[v].className))
								els.push(all[v]);
						}
				} else {
				// by tagName
					tels = c[i].getElementsByTagName(strim);

					// add all founded elements
					for (var y = 0, z = tels.length; y < z; y++)
						els.push(tels[y]);
				}
			}
		}

		// return array of elements
		return SimpleSelector.clearDuplicates(els);
	},

	/**
	 * Check if node is part of root element
	 * @param {DOMElement} descendant
	 * @param {DOMElement} ancestor
	 * @return {Boolean}
	 */
	isDescendant: function (descendant, ancestor) {
		return descendant.parentNode == ancestor || descendant.tagName.toUpperCase() != 'HTML' && SimpleSelector.isDescendant(descendant.parentNode, ancestor);
	},

	/**
	 * Check if item exists in array
	 * @param {Array} arr
	 * @param {Mixed} item
	 * @return {Boolean}
	 */
	itemExists: function (arr, item) {
		for (var j = 0, max = arr.length; j < max; j++) {
			if (arr[j] === item)
				return true;
		}

		return false;
	},

	/**
	 * Clear duplicate items out of array
	 * @param {Array} arr
	 * @return {Array} Cleared array
	 */
	clearDuplicates: function (arr) {
		var a = [];

		for (var i = 0, max = arr.length; i < max; i++) {
			if (!SimpleSelector.itemExists(a, arr[i]))
				a.push(arr[i]);
		}

		return a;
	}

};

/**
 * @private
 */
function isObjType (o, type) {
	return Object.prototype.toString.call(o) === '[object '+ type +']';
};

if (!window.$$) {
	/**
	* Add short name for SimpleSelector method
	* @function
	*/
	window.$$ = SimpleSelector.select;
}

})(window);