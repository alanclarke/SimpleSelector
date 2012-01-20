[SimpleSelector ($$)](http://www.freelancephp.net/simple-css-selector-function/) - JavaScript Object
=====================================================================================================

SimpleSelector is a very small javascript DOM selector function with cross browser support for the most commonly used selectors.


How To Use?
-----------

The $$() function returns an array with DOM elements (or an empty array). Supported DOM queries are:

* Get elements by id: `$$( '#wrap' )`
* Get elements by class: `$$( '.special' )`
* Get elements by tag: `$$( 'p' )`
* Get elements by multiple selectors: `$$( '#id, .cls' )`
* Get elements only in a certain context: `$$( 'a', '#wrap' )` or `$$( '#wrap a' )`

This function is not optimized for speed, memory usage etc. When you need to use a lot of DOM queries, you are probably better off using a more advanced selector engine, like [Sizzle](https://github.com/jquery/sizzle).


API
---

* `$$( selector, [ context ] )`


Browser Support
---------------

Tested on IE6+, FF, Opera, Chrome and Safari (for Windows).


License
-------

Released under MIT license.


Questions?
----------

If you have any questions, please ask them by using [this contactform](http://www.freelancephp.net/contact).
