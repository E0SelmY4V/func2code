module.exports = [[
	function () { return 1 + 6; },
	{
		innerCode: ' return 1 + 6; ',
	},
	Error()
], [
	function asd() { return 1 + 6; },
	{
		innerCode: ' return 1 + 6; ',
		nameCode: '"asd"',
		name: 'asd',
	},
	Error()
], [
	async function asd() { return 1 + 6; },
	{
		innerCode: ' return 1 + 6; ',
		nameCode: '"asd"',
		name: 'asd',
		isAsync: true
	},
	Error()
], [
	() => 1 + 7,
	{
		innerCode: 'return 1 + 7;',
		isArrow: true,
	},
	Error()
], [
	async ({ function: a }) => { return 1 + 7; },
	{
		params: ['{ function: a }'],
		innerCode: ' return 1 + 7; ',
		isArrow: true,
		isAsync: true
	},
	Error()
], [
	function* iuy(abc) { return 1 + 7; },
	{
		params: ['abc'],
		innerCode: ' return 1 + 7; ',
		nameCode: '"iuy"',
		name: 'iuy',
		isGenerator: true,
	},
	Error()
], [
	function* iuy(abc) { return 1 + 7; },
	{
		params: ['abc'],
		innerCode: ' return 1 + 7; ',
		nameCode: '"iuy"',
		name: 'iuy',
		isGenerator: true,
	},
	Error()
], [
	function ({ ['fun{{{ction']: a, s: [s] }) { return 1 + 8; },
	{
		params: ["{ ['fun{{{ction']: a, s: [s] }"],
		innerCode: ' return 1 + 8; ',
	},
	Error()
], [
	function (// asds/// / /  * */* /*{}{{{{{$$$``$`
	/**]]]}}** //*}}} */asd) { return 1 + 8; },
	{
		params: ["asd"],
		innerCode: ' return 1 + 8; ',
	},
	Error()
], [
	function// asds/// / /  * */* /*{}{{{{{$$$``$`
	/**]]]}}** //*}}} */ abc(a, { b: asd}) { return 1 + 8; },
	{
		params: ["a", "{ b: asd}"],
		innerCode: ' return 1 + 8; ',
		nameCode: '"abc"',
		name: 'abc',
	},
	Error()
], [
	function //asdsa
		abc(a, {b: asd     }   ) { return 1 + 8; },
	{
		params: ["a", "{b: asd }"],
		innerCode: ' return 1 + 8; ',
		nameCode: '"abc"',
		name: 'abc',
	},
	Error()
], [
	({ ['(a\'((""\"()' + `as ${`${'a' * 23 + 'da'}`}`]: a }) => 1 + 10,
	{
		params: [
			'{ [\'(a\\\'((""\\\"()\' + `as ${`${\'a\' * 23 + \'da\'}`}`]: a }'
		],
		innerCode: 'return 1 + 10;',
		isArrow: true,
	},
	Error()
], [
	{
		a() { return 1 + 12; }
	},
	{
		innerCode: ' return 1 + 12; ',
		nameCode: '"a"',
		name: 'a',
	},
	Error()
], [
	{
		['c\''](a, b, asd)  /**asd */ { return 1 + 14; }
	},
	{
		params: ['a', 'b', 'asd'],
		innerCode: ' return 1 + 14; ',
		nameCode: "'c\\''",
		name: "c'",
	},
	Error()
], [
	{
		async/**asda */[`${{ [`${['to', 'Str'].join('') + `${"ing"}`}`]() { return 123 } }}` + '']() { return 1 + 15; }
	},
	{
		innerCode: ' return 1 + 15; ',
		nameCode: '`${{ [`${[\'to\', \'Str\'].join(\'\') + `${"ing"}`}`]() { return 123 } }}` + \'\'',
		name: '123',
		isAsync: true
	},
	Error()
], [
	{
		async    [    'd       '    ]({ a }) //asd
		{ return 1 + 15; }
	},
	{
		params: ['{ a }'],
		innerCode: ' return 1 + 15; ',
		nameCode: "'d       '",
		name: 'd       ',
		isAsync: true
	},
	Error()
], [
	{
		function      ()    { return 1 + 16; }
	},
	{
		innerCode: ' return 1 + 16; ',
		name: 'function',
		isAsync: false
	},
	Error()
], [
	{
		   async      function        ()    { return 1 + 19; }
	},
	{
		innerCode: ' return 1 + 19; ',
		nameCode: '',
		name: 'function',
		isAsync: true
	},
	Error()
], [
	{
		async d() { }
	},
	{
		nameCode: '"d"',
		name: 'd',
		isAsync: true
	},
	Error()
], [
	Object.getOwnPropertyDescriptor({
		get a() { }
	}, 'a')['get'],
	{
		nameCode: '"a"',
		name: 'get a',
		isGetter: true
	},
	Error()
], [
	{
		async        ()    { return 1 +1; }
	},
	{
		nameCode: '"async"',
		name: 'async',
		innerCode: ' return 1 +1; ',
	},
	Error()
], [
	{
		set(){ return 2 + 1; }
	},
	{
		nameCode: '"set"',
		name: 'set',
		innerCode: ' return 2 + 1; ',
	},
	Error()
]];
