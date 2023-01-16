const func2code = require('.');

function log(fn) {
	console.log(func2code.split(fn));
}
log(function () { return 1 + 6; });
log(function asd() { return 1 + 6; });
log(async function asd() { return 1 + 6; });
log(() => { return 1 + 7; });
log(async () => { return 1 + 7; });
log(a => { return 1 + 7; });
log(async a => { return 1 + 7; });
log(function ({ ['fun{{{ction']: a, s: [s] }) { return 1 + 8; });
log(({ function: a }) => { return 1 + 9; });
log(({ ['(a\'((""\"()' + `as ${`${'a' * 23 + 'da'}`}`]: a }) => 1 + 10);
const o = {
	a() { return 1 + 12; },
	b({ a }) { return 1 + 13; },
	['c\''](a, b, asd) { return 1 + 14; },
	[`${{ [`${['to', 'Str'].join('') + `${"ing"}`}`]() { return 123 } }}` + '']() { return 1 + 15; },
	['d']({ a }) { return 1 + 15; },
	async ['d']({ a }) { return 1 + 15; },
	function() { return 1 + 16; }
}
for (var i in o) log(o[i]);

require('export-tester')(
	{
		sign: 'f2c',
		pack: 'func2code',
		// req: ['ts'],
	},
	{
		import() {
			console.log(f2c);
		}
	}
)