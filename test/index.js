const func2code = require('..');
const checkList = require('./fn');

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

function isObjectEqual(obj1, obj2) {
	let o1 = obj1 instanceof Object, o2 = obj2 instanceof Object;
	if (!o1 || !o2) return obj1 === obj2;
	if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
	for (let attr in obj1) {
		let a1 = Object.prototype.toString.call(obj1[attr]) == '[object Object]',
			a2 = Object.prototype.toString.call(obj2[attr]) == '[object Object]',
			ar = Object.prototype.toString.call(obj1[attr]) == '[object Array]';
		if (a1 && a2) return isObjectEqual(obj1[attr], obj2[attr]);
		else if (ar) {
			if (obj1[attr].toString() != obj2[attr].toString()) return false;
		} else if (obj1[attr] !== obj2[attr]) return false;
	}
	return true;
};

var c = 0;
for (let [f, r, e] of checkList) {
	if (typeof f === 'object') for (const i in f) f = f[i];
	const splited = func2code.split(f);
	for (const i in R) i in r || (r[i] = R[i]);
	if (!isObjectEqual(splited, r)) {
		console.log('应', r);
		// console.log(f.toString());
		console.log('实', splited);
		console.log('\33[31m--------------------\33[39m');
		console.log(c);
		throw e;
	}
	c++;
}

require('./import');