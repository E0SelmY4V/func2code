module.exports = [[
	function () { return 1 + 6; },
	{
		params: [],
		innerCode: ' return 1 + 6; ',
		nameCode: '',
		name: '',
		isAsync: false,
		isArrow: false,
	},
], [
	function asd() { return 1 + 6; },
	{
		params: [],
		innerCode: ' return 1 + 6; ',
		nameCode: '"asd"',
		name: 'asd',
		isArrow: false,
		isAsync: false
	},
], [
	async function asd() { return 1 + 6; },
	{
		params: [],
		innerCode: ' return 1 + 6; ',
		nameCode: '"asd"',
		name: 'asd',
		isArrow: false,
		isAsync: true
	},
], [
	() => 1 + 7,
	{
		params: [],
		innerCode: 'return 1 + 7;',
		nameCode: '',
		name: '',
		isArrow: true,
		isAsync: false
	},
], [
	async ({ function: a }) => { return 1 + 7; },
	{
		params: ['{ function: a }'],
		innerCode: ' return 1 + 7; ',
		nameCode: '',
		name: '',
		isArrow: true,
		isAsync: true
	},
], [
	function*   iuy(abc) { return 1 + 7; },
	{
		params: ['abc'],
		innerCode: ' return 1 + 7; ',
		nameCode: '"iuy"',
		name: 'iuy',
		isGenerator: true,
	},
], [
	function   *   iuy(abc) { return 1 + 7; },
	{
		params: ['abc'],
		innerCode: ' return 1 + 7; ',
		nameCode: '"iuy"',
		name: 'iuy',
		isGenerator: true,
	},
], [
	function ({ ['fun{{{ction']: a, s: [s] }) { return 1 + 8; },
	{
		params: ["{ [ 'fun{{{ction' ]: a, s: [s] }"],
		innerCode: ' return 1 + 8; ',
		nameCode: '',
		name: '',
		isArrow: false,
		isAsync: false
	},
], [
	function (// asds/// / /  * */* /*{}{{{{{$$$``$`
	/**]]]}}** //*}}} */asd) { return 1 + 8; },
	{
		params: ["asd"],
		innerCode: ' return 1 + 8; ',
		nameCode: '',
		name: '',
		isArrow: false,
		isAsync: false
	},
], [
	function// asds/// / /  * */* /*{}{{{{{$$$``$`
	/**]]]}}** //*}}} */ abc(a, {b: asd}) { return 1 + 8; },
	{
		params: ["a", "{b: asd}"],
		innerCode: ' return 1 + 8; ',
		nameCode: '"abc"',
		name: 'abc',
		isArrow: false,
		isAsync: false
	},
], [
	function //asdsa
     abc(a, {b: asd}) { return 1 + 8; },
	{
		params: ["a", "{b: asd}"],
		innerCode: ' return 1 + 8; ',
		nameCode: '"abc"',
		name: 'abc',
		isArrow: false,
		isAsync: false
	},
], [
	({ ['(a\'((""\"()' + `as ${`${'a' * 23 + 'da'}`}`]: a }) => 1 + 10,
	{
		params: [
			'{ [ \'(a\\\'((""\\"()\' + `as ${ `${ \'a\' * 23 + \'da\' }` }` ]: a }'
		],
		innerCode: 'return 1 + 10;',
		nameCode: '',
		name: '',
		isArrow: true,
		isAsync: false
	},
], [
	{
		a() { return 1 + 12; }
	},
	{
		params: [],
		innerCode: ' return 1 + 12; ',
		nameCode: '"a"',
		name: 'a',
		isArrow: false,
		isAsync: false
	},
], [
	{
		['c\'']   (a, b, asd)  /**asd */    { return 1 + 14; }
	},
	{
		params: ['a', 'b', 'asd'],
		innerCode: ' return 1 + 14; ',
		nameCode: "'c\\''",
		name: "c'",
		isArrow: false,
		isAsync: false
	},
], [
	{
		async/**asda */[`${{ [`${['to', 'Str'].join('') + `${"ing"}`}`]() { return 123 } }}` + '']() { return 1 + 15; }
	},
	{
		params: [],
		innerCode: ' return 1 + 15; ',
		nameCode: '`${ { [ `${ [ \'to\' , \'Str\' ].join( \'\' ) + `${ "ing" }` }` ]() { return 123 } } }` + \'\'',
		name: '123',
		isArrow: false,
		isAsync: true
	},
], [
	{
		async    ['d']({ a }) //asd
		{ return 1 + 15; }
	},
	{
		params: ['{ a }'],
		innerCode: ' return 1 + 15; ',
		nameCode: "'d'",
		name: 'd',
		isArrow: false,
		isAsync: true
	},
], [
	{
		function   ()  { return 1 + 16; }
	},
	{
		params: [],
		innerCode: ' return 1 + 16; ',
		nameCode: '',
		name: 'function',
		isArrow: false,
		isAsync: false
	},
], [
	{
		async   function()  { return 1 + 19; }
	},
	{
		params: [],
		innerCode: ' return 1 + 19; ',
		nameCode: '',
		name: 'function',
		isArrow: false,
		isAsync: true
	},
]];
