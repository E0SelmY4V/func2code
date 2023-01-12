const func2code = require('.');

const o = {
	a() { return 1 + 2; },
	b({ a }) { return 1 + 2; },
	['c\'']() { return 1 + 2; },
	['d']({ a }) { return 1 + 2; },
	function(){
		return 1 + 1;
	}
}
function log(fn) {
	console.log(func2code.codeSplit(fn));
}
// log(function () { return 1 + 2; });
// log(() => { return 1 + 2; });
log(
	() =>  1 + 2
);
console.log(new Function('()=>1+1').toString())
// log(function ({ ['fun{}{}{ction']: a, s: [s] }) { return 1 + 2; });
// log(({ function: a }) => { return 1 + 2; });
// log(({ ['(a\'((""\"()']: a }) => 1 + 2);
// log(function () { return 1 + 2; });
// log(function () { return 1 + 2; });
// log(function () { return 1 + 2; });
// log(function () { return 1 + 2; });
// log(function () { return 1 + 2; });