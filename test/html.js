/// <reference path="../global.d.ts" />
var h = '<span style="background:aqua">', k = '</span>';
function log(fn) {
	var t = func2code.split(fn), str = '';
	for (var i in t) {
		str += i + ': ' + h + (
			typeof t[i] === 'object' ? t[i].join(k + ',' + h) : t[i]
		) + k + '<br>';
	}
	con.innerHTML += str + '----<br>';
}
log(function (a, b, c) { return 1 + 6; });
log(function asd(a, sss) { return 1 + 6; });