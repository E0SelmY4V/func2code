module.exports = [[
	function () { return 1 + 6; },
	{
		params: [],
		innerCode: ' return 1 + 6; ',
		nameCode: '',
		name: '',
		code: 'function () { return 1 + 6; }',
		isAsync: false
	},
], [
	function asd() { return 1 + 6; },
	{
		params: [],
		innerCode: ' return 1 + 6; ',
		nameCode: '"asd"',
		name: 'asd',
		code: 'function asd() { return 1 + 6; }',
		isAsync: false
	},
], [
	async function asd() { return 1 + 6; },
	{
		params: [],
		innerCode: ' return 1 + 6; ',
		nameCode: '"asd"',
		name: 'asd',
		code: 'async function asd() { return 1 + 6; }',
		isAsync: true
	},
], [
	() => { return 1 + 7; },
	{
		params: [],
		innerCode: 'return (()=>{ return 1 + 7; })();',
		nameCode: '',
		name: '',
		code: '() => { return 1 + 7; }',
		isAsync: false
	},
], [
	async () => { return 1 + 7; },
	{
		params: [],
		innerCode: 'return await(async()=>{ return 1 + 7; })();',
		nameCode: '',
		name: '',
		code: 'async () => { return 1 + 7; }',
		isAsync: true
	},
], [
	a => { return 1 + 7; },
	{
		params: ['a'],
		innerCode: 'return (()=>{ return 1 + 7; })();',
		nameCode: '',
		name: '',
		code: 'a => { return 1 + 7; }',
		isAsync: false
	},
], [
	async a => { return 1 + 7; },
	{
		params: ['a'],
		innerCode: 'return await(async()=>{ return 1 + 7; })();',
		nameCode: '',
		name: '',
		code: 'async a => { return 1 + 7; }',
		isAsync: true
	},
], [
	function ({ ['fun{{{ction']: a, s: [s] }) { return 1 + 8; },
	{
		params: ["{ [ 'fun{{{ction' ]: a, s: [s] }"],
		innerCode: ' return 1 + 8; ',
		nameCode: '',
		name: '',
		code: "function ({ ['fun{{{ction']: a, s: [s] }) { return 1 + 8; }",
		isAsync: false
	},
], [
	({ function: a }) => { return 1 + 9; },
	{
		params: ['{ function: a }'],
		innerCode: 'return (()=>{ return 1 + 9; })();',
		nameCode: '',
		name: '',
		code: '({ function: a }) => { return 1 + 9; }',
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
		code: '({ [\'(a\\\'((""\\"()\' + `as ${`${\'a\' * 23 + \'da\'}`}`]: a }) => 1 + 10',
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
		code: 'a() { return 1 + 12; }',
		isAsync: false
	},
], [
	{
		b({ a }) { return 1 + 13; }
	},
	{
		params: ['{ a }'],
		innerCode: ' return 1 + 13; ',
		nameCode: '"b"',
		name: 'b',
		code: 'b({ a }) { return 1 + 13; }',
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
		code: "['c\\''](a, b, asd) { return 1 + 14; }",
		isAsync: false
	},
], [
	{
		[`${{ [`${['to', 'Str'].join('') + `${"ing"}`}`]() { return 123 } }}` + '']() { return 1 + 15; }
	},
	{
		params: [],
		innerCode: ' return 1 + 15; ',
		nameCode: '`${ { [ `${ [ \'to\' , \'Str\' ].join( \'\' ) + `${ "ing" }` }` ]() { return 123 } } }` + \'\'',
		name: '123',
		code: '[`${{ [`${[\'to\', \'Str\'].join(\'\') + `${"ing"}`}`]() { return 123 } }}` + \'\']() { return 1 + 15; }',
		isAsync: false
	},
], [
	{
		['d']({ a }) { return 1 + 15; }
	},
	{
		params: ['{ a }'],
		innerCode: ' return 1 + 15; ',
		nameCode: "'d'",
		name: 'd',
		code: "['d']({ a }) { return 1 + 15; }",
		isAsync: false
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
		code: "async ['d']({ a }) { return 1 + 15; }",
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
		code: 'function() { return 1 + 16; }',
		isAsync: false
	},
]];
