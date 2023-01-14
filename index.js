!function () {
	var vo = { ' ': 0, '\t': 0, '\n': 0, '\r': 0 };
	function reps(n, o) {
		for (var i = o.length - 1; i >= 0; i -= 2) n = n.split(o[i - 1]).join(o[i]);
		return n;
	}
	function outSpace(n) {
		n = ' ' + reps(n, ['\n', ' ', '\r', ' ', '\t', ' ']) + ' ';
		while (n.indexOf('  ') !== -1) n = n.split('  ').join(' ');
		return n.slice(1, -1);
	}
	function rmvVoid(n) {
		for (var r = [], i = 0; i < n.length; ++i) n[i] && r.push(n[i]);
		return r;
	}
	function repWsEle(n) { n && (this.quo = n); }
	repWsEle.prototype = { depth: 0, had$: false };
	function repWs(str) {
		var stack = [new repWsEle()], now = 0, eleNow = stack[now], isInquo = false;
		var rslt = [], flag = 0, i;
		for (i = 0; i < str.length; ++i)
			if (isInquo) switch (str[i]) {
				case '$': eleNow.had$ = true; continue;
				case eleNow.quo:
					stack.pop(), eleNow = stack[--now], isInquo = false;
					rslt.push(str.slice(flag, flag = i + 1));
					continue;
				case '\\': ++i; delete eleNow.had$; continue;
				case '{': eleNow.quo === '`' && eleNow.had$ && (
					stack.push(new repWsEle()), eleNow = stack[++now], isInquo = false,
					rslt.push(str.slice(flag, flag = i + 1))
				); delete eleNow.had$; continue;
				default: delete eleNow.had$; continue;
			}
			else switch (str[i]) {
				case "'": case "`": case '"':
					stack.push(new repWsEle(str[i])), eleNow = stack[++now], isInquo = true;
					rslt.push(outSpace(str.slice(flag, flag = i)));
					continue;
				case '{': case '[': case '(': ++eleNow.depth; continue;
				case '}': case ']': case ')': case ',':
					if (eleNow.depth === 0 && now === 0) return {
						code: (rslt.push(outSpace(str.slice(flag, i))), rmvVoid(rslt).join(' ')),
						index: i,
						nofin: str[i] === ','
					};
					if (str[i] !== ',') eleNow.depth-- || (
						stack.pop(), eleNow = stack[--now], isInquo = true,
						rslt.push(outSpace(str.slice(flag, flag = i)))
					);
					continue;
				default: continue;
			}
		rslt.push(outSpace(str.slice(flag)));
		return {
			code: rmvVoid(rslt).join(' '),
			index: i,
			nofin: false
		}
	}
	function lastIndexOf(str, find) {
		for (var i = str.length - 1; i >= 0; --i) if (find === str[i]) return i;
		return -1;
	}
	function splitParams(str) {
		var k, rslt = [];
		while (
			k = repWs(str),
			rslt.push(k.code),
			str = str.slice(k.index + 1),
			k.nofin
		);
		return {
			params: rslt,
			code: str
		};
	}
	console.log(splitParams('a, {[`${a  \n\n  s}asd \n \t` + 123]: a}, c) => 123'))
	function allRep(n) {
		for (var k = [], t, i = 0; i < n.length; ++i) t = repWs(n[i]), t && k.push(t);
		return k;
	}
	function last(l) {
		return l[l.length - 1];
	}
	function codeSplitEle(n) { this.stat = n; }
	codeSplitEle.prototype = { stat: NaN };
	function codeSplit(fn) {
		var str = outSpace(fn.toString());
		var stack = [new codeSplitEle(0)], now = 0, eleNow = stack[now], rslt = [], name = '';
		function add(n) { stack.push(new repWsEle(n)), eleNow = stack[++now]; }
		function del() { stack.pop(), eleNow = stack[--now]; }
		for (var i = 0; i < str.length; ++i) {
			if (str[i] in vo) continue;
			// console.log([string[i]], status, statNow);
			switch (eleNow.stat) {
				case NaN: return [];
				case 0: switch (str[i]) {
					case '(': {
						stack.push(new repWsEle(1)), eleNow = stack[++now];
						stack.push(new repWsEle(1)), eleNow = stack[++now];
					} continue;
					case '[': addStat(NaN); continue;
					default: addStat(NaN);
				} continue;
				case 1: {
					splitParams(str)
				} continue;
				case 2: switch (str[i]) { case '>': delStat(), addStat(3); }continue;
				case 3: switch (str[i]) {
					case ' ': case '\t': case '\n': case '\r': continue;
					case '{': return rslt.push('return (()=>' + str.slice(i) + ')();', name), rslt;
					default: return rslt.push('return ' + str.slice(i) + ';', name), rslt;
				}
				case 6: switch (str[i]) {
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
				case 7: switch (str[i]) {
					case "'": case "`": case '"': addStat(6); status.quo.push(str[i]); continue;
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
			return r ? {
				// name: r.pop(),
				nameCode: r.pop(),
				code: r.pop(),
				params: allRep(r)
			} : {};
		},
		codeInner: codeSplit
	};
	typeof module === 'undefined'
		? window.func2code = exp
		: module.exports = exp;
}();