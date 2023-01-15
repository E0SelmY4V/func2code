!function () {
	var vo = { ' ': 0, '\t': 0, '\n': 0, '\r': 0 },
		noIdx = !'.'[0];
	/**@type {(n:string|string[])=>string} */
	var toStr = noIdx ? function (n) { return n.join('') } : function (n) { return n; }
	/**@type {(n:string,o:string[])=>string} */
	function reps(n, o) {
		for (var i = o.length - 1; i >= 0; i -= 2) n = n.split(o[i - 1]).join(o[i]);
		return n;
	}
	/**@type {(n:string)=>string} */
	function outSpace(n) {
		n = ' ' + reps(n, ['\n', ' ', '\r', ' ', '\t', ' ']) + ' ';
		while (n.indexOf('  ') !== -1) n = n.split('  ').join(' ');
		return n.slice(1, -1);
	}
	/**@type {(n:string[])=>string[]} */
	function rmvVoid(n) {
		for (var r = [], i = 0; i < n.length; ++i) n[i] && r.push(n[i]);
		return r;
	}
	/**@param {string} n */
	function repWsEle(n) { this.quo = n; }
	repWsEle.prototype = { quo: '', depth: 0, had$: false };
	/**@param {string|string[]} str */
	function repWs(str) {
		var stack = [new repWsEle()], now = 0, eleNow = stack[now], isInquo = false;
		var rslt = [], flag = 0, i;
		for (i = 0; i < str.length; ++i)
			if (isInquo) switch (str[i]) {
				case '$': eleNow.had$ = true; continue;
				case eleNow.quo:
					stack.pop(), eleNow = stack[--now], isInquo = false;
					rslt.push(toStr(str.slice(flag, flag = i + 1)));
					continue;
				case '\\': ++i; delete eleNow.had$; continue;
				case '{': eleNow.quo === '`' && eleNow.had$ && (
					stack.push(new repWsEle()), eleNow = stack[++now], isInquo = false,
					rslt.push(toStr(str.slice(flag, flag = i + 1)))
				); delete eleNow.had$; continue;
				default: delete eleNow.had$; continue;
			}
			else switch (str[i]) {
				case "'": case "`": case '"':
					stack.push(new repWsEle(str[i])), eleNow = stack[++now], isInquo = true;
					rslt.push(outSpace(toStr(str.slice(flag, flag = i))));
					continue;
				case '{': case '[': case '(': ++eleNow.depth; continue;
				case '}': case ']': case ')': case ',':
					if (eleNow.depth === 0 && now === 0) return {
						code: (rslt.push(outSpace(toStr(str.slice(flag, i)))), rmvVoid(rslt).join(' ')),
						index: i,
						nofin: str[i] === ','
					};
					if (str[i] !== ',') eleNow.depth-- || (
						stack.pop(), eleNow = stack[--now], isInquo = true,
						rslt.push(outSpace(toStr(str.slice(flag, flag = i))))
					);
					continue;
				default: continue;
			}
		rslt.push(outSpace(toStr(str.slice(flag))));
		return {
			code: rmvVoid(rslt).join(' '),
			index: i,
			nofin: false
		}
	}
	/**@type {(str:string|string[],find:string)=>number} */
	function lastIndexOf(str, find) {
		for (var i = str.length - 1; i >= 0; --i) if (find === str[i]) return i;
		return -1;
	}
	/**@param {string|string[]} str */
	function splitParams(str) {
		var k, rslt = [], index = 0;
		while (
			k = repWs(str),
			rslt.push(k.code),
			str = str.slice(k.index + 1),
			index += k.index + 1,
			k.nofin
		);
		return {
			params: rslt,
			index: index
		};
	}
	/**@type {(fn:Function)=>string[]} */
	function split(fn) {
		var str = noIdx ? fn.toString().split('') : fn.toString(),
			stack = [0], now = 0, eleNow = stack[now],
			rslt, name = '', flag = 0, isAsync = false,
			t;
		function add(n) { stack.push(n), eleNow = stack[++now]; }
		function del() { stack.pop(), eleNow = stack[--now]; }
		for (var i = 0; i < str.length; ++i) switch (eleNow) {
			case 0: switch (str[i]) {
				case '(': flag = i + 1; del(), add(2), add(1); continue;
				case '[': flag = i + 1; del(), add(6); continue;
				case ' ': case '\t': case '\n': case '\r': continue;
				default: del(), add(4);
			} continue;
			case 1:
				t = splitParams(str.slice(flag));
				i = t.index + flag - 1;
				rslt = t.params;
				del();
				continue;
			case 2: switch (str[i]) { case '>': del(), add(3); } continue;
			case 3: switch (str[i]) {
				case ' ': case '\t': case '\n': case '\r': continue;
				case '{': return rslt.push((isAsync ? 'return await(async()=>' : 'return (()=>') + toStr(str.slice(i)) + ')();', name, fn.name, isAsync), rslt;
				default: return rslt.push('return ' + toStr(str.slice(i)) + ';', name, fn.name, isAsync), rslt;
			} continue;
			case 4: switch (str[i]) {
				case '(': str[i - 1] in vo ? (
					flag = i + 1,
					del(), add(5), add(1)
				) : (
					noIdx ? str.splice(i, 0, ' ') : str = str.slice(0, i) + ' ' + str.slice(i),
					--i
				); continue;
				case ' ': case '\t': case '\n': case '\r':
					toStr(str.slice(flag, i)) === 'function' || (
						toStr(str.slice(flag, i)) === 'async'
							? (del(), add(0), isAsync = true)
							: name || (name = '"' + toStr(str.slice(flag, i)) + '"')
					);
					flag = i + 1;
					continue;
			} continue;
			case 5: switch (str[i]) {
				case '{': return rslt.push(toStr(str.slice(i + 1, lastIndexOf(str, '}'))), name, fn.name, isAsync), rslt;
			} continue;
			case 6:
				t = repWs(str.slice(flag));
				name = t.code;
				i = t.index + flag;
				del(), add(7);
				continue;
			case 7: switch (str[i]) {
				case '(': flag = i + 1; del(), add(5), add(1);
			} continue;
		}
	}
	var exp = {
		getCode: function (fn) {
			return fn.toString();
		},
		split: function (fn) {
			var r = split(fn);
			return {
				isAsync: r.pop(),
				name: r.pop(),
				nameCode: r.pop(),
				code: fn.toString(),
				innerCode: r.pop(),
				params: r
			};
		},
		getInnerCode: function (fn) {
			var r = split(fn);
			return r[r.length - 3];
		},
		getParams: function (fn) {
			var r = split(fn);
			return r.pop(), r.pop(), r.pop(), r;
		},
		getNameCode: function (fn) {
			var r = split(fn);
			return r.pop(), r.pop();
		},
		isAsync: function (fn) {
			return split(fn).isAsync;
		}
	};
	typeof module === 'undefined'
		? window.func2code = exp
		: module.exports = exp;
}();