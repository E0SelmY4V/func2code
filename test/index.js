const func2code = require('..');
const checkList = require('./fn');
const test = require('tape');

const R = {
	params: [],
	innerCode: ' ',
	nameCode: '',
	name: '',
	isArrow: false,
	isAsync: false,
	isSetter: false,
	isGetter: false,
	isGenerator: false
};

var c = 0;
for (let [f, r, e] of checkList) {
	if (typeof f === 'object') for (const i in f) f = f[i];
	const splited = func2code.split(f);
	for (const i in R) i in r || (r[i] = R[i]);
	test(`fn${c}`, t => {
		t.deepEqual(splited, r, e.stack);
		t.end();
	});
	c++;
}

//require('./import');
