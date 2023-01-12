!function () {
	var vo = { ' ': ' ', '\t': ' ', '\n': ' ', '\r': ' ' };
	function rep(n, f, t) {
		return n.split(f).join(t);
	}
	function reps(n, o) {
		for (var i in o) n = rep(n, i, o[i]);
		return n;
	}
	function repWs(n) {
		var i = 0, f = 0, l = 0, s = [0], r = '', m = { '"': 1, "'": 2, '`': 3 },
			t = function (y) { r += y ? outSpace(reps(n.slice(f, i), vo)) : n.slice(f, i); f = i; };
		for (; i < n.length; ++i) switch (s[s.length - 1]) {
			case 0: switch (n[i]) {
				case "'": case "`": case '"': s.push(m[n[i]]); t(1); continue;
				case '{': ++l; continue;
				case '}': l ? --l : (s.pop(), t(1)); continue;
			} continue;
			case 1: switch (n[i]) {
				case '"': s.pop(); t(0); continue;
				case '\\': ++i; continue;
			} continue;
			case 2: switch (n[i]) {
				case "'": s.pop(); t(0); continue;
				case '\\': ++i; continue;
			} continue;
			case 3: switch (n[i]) {
				case "`": s.pop(), t(0); continue;
				case '\\': ++i, l = 0; continue;
				case '$': l = 1; continue;
				case '{': l === 1 && s.push(0), l = 0; t(0); continue;
				default: l = 0;
			} continue;
		}
		return t(1), r;
	}
	function outSpace(n) {
		n = ' ' + n + ' ';
		while (n.indexOf('  ') !== -1) n = n.split('  ').join(' ');
		return n.slice(1, -1);
	}
	function allRep(n) {
		for (var k = [], t, i = 0; i < n.length; ++i) t = repWs(n[i]), t && k.push(t);
		return k;
	}
	function last(l) {
		return l[l.length - 1];
	}
	function codeSplit(fn) {
		var string = outSpace(fn.toString());
		var status = [0], statNow = 0, rslt = [], name = '';
		function addStat(no) { status.push(statNow = no); }
		function delStat() { status.pop(); statNow = status[status.length - 1]; }
		for (var i = 0; i < string.length; ++i) {
			if (string[i] in vo) continue;
			console.log([string[i]], status, statNow);
			switch (statNow) {
				case NaN: return [];
				case 0: switch (string[i]) {
					case '(': {
						delStat(), addStat(2), addStat(1);
						status.paramStart = i + 1;
						status.depth = 1;
					} continue;
					case '[': addStat(NaN); continue;
					default: addStat(NaN);
				} continue;
				case 1: switch (string[i]) {
					case '(': case '{': case '[': ++status.depth; continue;
					case '"': case "'": case '`': {
						addStat(6);
						status.quo = [string[i]];
					} continue;
					case ')': case '}': case ']': if (!--status.depth) {
						delStat();
						rslt.push(string.slice(status.paramStart, i));
						delete status.paramStart, status.depth;
					}; continue;
					case ',': status.depth === 1 && (
						rslt.push(string.slice(status.paramStart, i)),
						status.paramStart = i + 1
					); continue;
				}continue;
				case 2: switch (string[i]) { case '>': delStat(), addStat(3); }continue;
				case 3: switch (string[i]) {
					case ' ': case '\t': case '\n': case '\r': continue;
					case '{': return rslt.push('return (()=>' + string.slice(i) + ')();', name), rslt;
					default: return rslt.push('return ' + string.slice(i) + ';', name), rslt;
				}
				case 6: switch (string[i]) {
					case last(status.quo): {
						delStat();
						delete status.had$;
						status.quo.pop();
						if (!status.quo.length) delete status.quo;
					} continue;
					case '\\': ++i; delete status.had$; continue;
					case '$': last(status.quo) === '`' && (status.had$ = true); continue;
					case '{': status.had$ && addStat(7); delete status.had$; continue;
					default: delete status.had$;
				} continue;
				case 7: switch (string[i]) {
					case "'": case "`": case '"': addStat(6); status.quo.push(string[i]); continue;
					case '{': status.bi ? ++status.bi : status.bi = 1; continue;
					case '}': if (status.bi) --status.bi; else {
						delStat();
						delete status.bi;
					} continue;
				} continue;
			}
		}
	}
	var exp = {
		code: function (fn) {
			return fn.toString();
		},
		codeSplit: function (fn) {
			var r = codeSplit(fn);
			return r && { name: r.pop(), code: repWs(r.pop()), params: allRep(r) };
		},
		codeInner: codeSplit
	};
	typeof module === 'undefined'
		? window.func2code = exp
		: module.exports = exp;
}();