module.exports = [[
	function () { return 1 + 6; },
	{
		params: [],
		innerCode: ' return 1 + 6; ',
		nameCode: '',
		name: '',
		isAsync: false
	},
], [
	function asd() { return 1 + 6; },
	{
		params: [],
		innerCode: ' return 1 + 6; ',
		nameCode: '"asd"',
		name: 'asd',
		isAsync: false
	},
], [
	async function asd() { return 1 + 6; },
	{
		params: [],
		innerCode: ' return 1 + 6; ',
		nameCode: '"asd"',
		name: 'asd',
		isAsync: true
	},
], [
	() => 1 + 7,
	{
		params: [],
		innerCode: 'return 1 + 7;',
		nameCode: '',
		name: '',
		isAsync: false
	},
], [
	async ({ function: a }) => { return 1 + 7; },
	{
		params: ['{ function: a }'],
		innerCode: ' return 1 + 7; ',
		nameCode: '',
		name: '',
		isAsync: true
	},
], [
	function ({ ['fun{{{ction']: a, s: [s] }) { return 1 + 8; },
	{
		params: ["{ [ 'fun{{{ction' ]: a, s: [s] }"],
		innerCode: ' return 1 + 8; ',
		nameCode: '',
		name: '',
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
		isAsync: false
	},
], [
	{
		['c\''](a, b, asd) { return 1 + 14; }
	},
	{
		params: ['a', 'b', 'asd'],
		innerCode: ' return 1 + 14; ',
		nameCode: "'c\\''",
		name: "c'",
		isAsync: false
	},
], [
	{
		async [`${{ [`${['to', 'Str'].join('') + `${"ing"}`}`]() { return 123 } }}` + '']() { return 1 + 15; }
	},
	{
		params: [],
		innerCode: ' return 1 + 15; ',
		nameCode: '`${ { [ `${ [ \'to\' , \'Str\' ].join( \'\' ) + `${ "ing" }` }` ]() { return 123 } } }` + \'\'',
		name: '123',
		isAsync: true
	},
], [
	{
		async ['d']({ a }) { return 1 + 15; }
	},
	{
		params: ['{ a }'],
		innerCode: ' return 1 + 15; ',
		nameCode: "'d'",
		name: 'd',
		isAsync: true
	},
], [
	{
		function() { return 1 + 16; }
	},
	{
		params: [],
		innerCode: ' return 1 + 16; ',
		nameCode: '',
		name: 'function',
		isAsync: false
	},
], [
	{
		async function() { return 1 + 19; }
	},
	{
		params: [],
		innerCode: ' return 1 + 19; ',
		nameCode: '',
		name: 'function',
		isAsync: true
	},
]];
