module( 'SimpleSelector' );

test( 'Required globals and functions', function() {
	expect(1);
	ok( $$, '$$' );
});

test( 'Get elements by single selector', function() {
	var byId = $$( '#btn-test3' ),
		byClass = $$( '.special' ),
		byTag = $$( 'button' );

	expect(11);

	strictEqual( byId.length, 1 );
	strictEqual( byId[0], document.getElementById('btn-test3') );

	strictEqual( byClass.length, 2 );
	strictEqual( byClass[0], document.getElementById('controlClass1') );
	strictEqual( byClass[1], document.getElementById('controlClass2') );

	strictEqual( byTag.length, 5 );
	strictEqual( byTag[0], document.getElementById('btn-test1') );
	strictEqual( byTag[1], document.getElementById('btn-test2') );
	strictEqual( byTag[2], document.getElementById('btn-test3') );
	strictEqual( byTag[3], document.getElementById('btn-test4') );
	strictEqual( byTag[4], document.getElementById('btn-test5') );
});

test( 'Get elements by multiple selectors', function() {
	var byMulti = $$( '#wrap, .special, button' );

	expect(4);
	strictEqual( byMulti.length, 8 );
	strictEqual( byMulti[0], document.getElementById('wrap') );
	strictEqual( byMulti[1], document.getElementById('controlClass1') );
	strictEqual( byMulti[2], document.getElementById('controlClass2') );
});

test( 'Get elements within context (simple)', function() {
	var context1 = $$( '#wrap' ),
		withContext1 = $$( 'h1', '#wrap' ),
		withContext2 = $$( '#wrap h1' ),
		withContext3 = $$( 'h1', context1 );

	expect(6);

	strictEqual( context1.length, 1 );
	strictEqual( context1[0], document.getElementById('wrap') );

	strictEqual( withContext1.length, 1 );
	strictEqual( withContext1[0], document.getElementsByTagName('h1')[1] );

	deepEqual( withContext1, withContext2 );
	deepEqual( withContext1, withContext3 );
});

test( 'Get elements within context (complex)', function() {
	var context1 = $$( '#wrap .special' ),
		withContext1 = $$( 'span', '#wrap .special' ),
		withContext2 = $$( '#wrap .special span' ),
		withContext3 = $$( '.special span', '#wrap' ),
		withContext4 = $$( 'span', context1 );

	expect(12);

	strictEqual( context1.length, 2 );
	strictEqual( context1[0], document.getElementById('controlClass1') );
	strictEqual( context1[1], document.getElementById('controlClass2') );

	strictEqual( withContext1.length, 5 );
	ok( withContext1[0].innerHTML.indexOf( 'button 1' ) > -1 );
	ok( withContext1[1].innerHTML.indexOf( 'button 2' ) > -1 );
	ok( withContext1[2].innerHTML.indexOf( 'button 3' ) > -1 );
	ok( withContext1[3].innerHTML.indexOf( 'button 5' ) > -1 );
	ok( withContext1[4].innerHTML.indexOf( 'Lorem ipsum 7' ) > -1 );

	deepEqual( withContext1, withContext2 );
	deepEqual( withContext1, withContext3 );
	deepEqual( withContext1, withContext4 );
});

test( 'Get elements within multiple contexts', function() {
	var context1 = $$( '#wrap p, #wrap ul, #controlClass2' ),
		withContext1 = $$( 'li', '#wrap p, #wrap ul, #controlClass2' ),
		withContext2 = $$( '#wrap p li, #wrap ul li, #controlClass2 li' ),
		withContext3 = $$( 'li', context1 );

	expect(16);

	strictEqual( context1.length, 4 );
	strictEqual( context1[0].tagName, 'P' );
	strictEqual( context1[1].id, 'controlClass1' );
	strictEqual( context1[2].tagName, 'UL' );
	strictEqual( context1[3], document.getElementById('controlClass2') );

	strictEqual( withContext1.length, 8 );
	ok( withContext1[0].innerHTML.indexOf( 'Lorem ipsum 1' ) > -1 );
	ok( withContext1[1].innerHTML.indexOf( 'Lorem ipsum 2' ) > -1 );
	ok( withContext1[2].innerHTML.indexOf( 'Lorem ipsum 3' ) > -1 );
	ok( withContext1[3].innerHTML.indexOf( 'Lorem ipsum 4' ) > -1 );
	ok( withContext1[4].innerHTML.indexOf( 'Lorem ipsum 5' ) > -1 );
	ok( withContext1[5].innerHTML.indexOf( 'Lorem ipsum 6' ) > -1 );
	ok( withContext1[6].innerHTML.indexOf( 'Lorem ipsum 7' ) > -1 );
	ok( withContext1[7].innerHTML.indexOf( 'Lorem ipsum 8' ) > -1 );

	deepEqual( withContext1, withContext2 );
	deepEqual( withContext1, withContext3 );
});

test( 'Check elements appears only one time in selection', function() {
	var sel1 = $$( '.special button, #wrap button, #btn-test3, p button' );

	expect(6);
	strictEqual( sel1.length, 5 );
	ok( sel1[0].innerHTML.indexOf( 'button 1' ) > -1 );
	ok( sel1[1].innerHTML.indexOf( 'button 2' ) > -1 );
	ok( sel1[2].innerHTML.indexOf( 'button 3' ) > -1 );
	ok( sel1[3].innerHTML.indexOf( 'button 4' ) > -1 );
	ok( sel1[4].innerHTML.indexOf( 'button 5' ) > -1 );
});
