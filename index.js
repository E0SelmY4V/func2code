/**
 * Function to Code
 * @version 1.0.4
 * @license MIT
 * @link https://github.com/E0SelmY4V/func2code
 */
"use strict";
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
	function repWsEle(n) { n && (this.quo = n); }
	repWsEle.prototype = { quo: false, depth: 0, had$: false };
	function Stack(n) { this.mem = [this.ele = n] }
	Stack.prototype = {
		mem: null,
		now: 0,
		ele: void 0,
		add: function (n) { this.mem.push(n); this.ele = this.mem[++this.now]; },
		del: function () { this.mem.pop(); this.ele = this.mem[--this.now]; }
	};
	/**@param {string|string[]} str */
	function repWs(str) {
		var stack = new Stack(new repWsEle());
		var rslt = [], flag = 0, i;
		for (i = 0; i < str.length; ++i) switch (stack.ele.quo) {
			case false: switch (str[i]) {
				case "'": case "`": case '"':
					stack.add(new repWsEle(str[i]));
					rslt.push(outSpace(toStr(str.slice(flag, flag = i))));
					continue;
				case '{': case '[': case '(': ++stack.ele.depth; continue;
				case '}': case ']': case ')': case ',':
					if (stack.ele.depth === 0 && stack.now === 0) return {
						code: (rslt.push(outSpace(toStr(str.slice(flag, i)))), rmvVoid(rslt).join(' ')),
						index: i,
						nofin: str[i] === ','
					};
					if (str[i] !== ',') stack.ele.depth-- || (
						stack.del(),
						rslt.push(outSpace(toStr(str.slice(flag, flag = i))))
					);
					continue;
				default: continue;
			}
			default: switch (str[i]) {
				case '$': stack.ele.had$ = true; continue;
				case stack.ele.quo:
					stack.del();
					rslt.push(toStr(str.slice(flag, flag = i + 1)));
					continue;
				case '\\': ++i; delete stack.ele.had$; continue;
				case '{': stack.ele.quo === '`' && stack.ele.had$ && (
					stack.add(new repWsEle()),
					rslt.push(toStr(str.slice(flag, flag = i + 1)))
				); delete stack.ele.had$; continue;
				default: delete stack.ele.had$; continue;
			}
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
	function pack(r, i, n, a, s) {
		return { params: rmvVoid(r), innerCode: i, nameCode: n, name: a.name, code: a.toString(), isAsync: s };
	}
	/**@type {(fn:Function)=>string[]} */
	function split(fn) {
		var str = noIdx ? fn.toString().split('') : fn.toString(),
			stack = new Stack(0),
			rslt, name = '', flag = 0, isAsync = false,
			t;
		for (var i = 0; i < str.length; ++i) switch (stack.ele) {
			case 0: switch (str[i]) {
				case '(': flag = i + 1; stack.del(), stack.add(2), stack.add(1); continue;
				case '[': flag = i + 1; stack.del(), stack.add(6); continue;
				case ' ': case '\t': case '\n': case '\r': continue;
				default: stack.del(), stack.add(4);
			} continue;
			case 1:
				t = splitParams(str.slice(flag));
				i = t.index + flag - 1;
				rslt = t.params;
				stack.del();
				continue;
			case 2: switch (str[i]) { case '>': stack.del(), stack.add(3); } continue;
			case 3: switch (str[i]) {
				case ' ': case '\t': case '\n': case '\r': continue;
				case '{': return pack(rslt, (isAsync ? 'return await(async()=>' : 'return (()=>') + toStr(str.slice(i)) + ')();', name, fn, isAsync);
				default: return pack(rslt, 'return ' + toStr(str.slice(i)) + ';', name, fn, isAsync);
			} continue;
			case 4: switch (str[i]) {
				case '(': str[i - 1] in vo ? (
					flag = i + 1,
					stack.del(), stack.add(5), stack.add(1)
				) : (
					noIdx ? str.splice(i, 0, ' ') : str = str.slice(0, i) + ' ' + str.slice(i),
					--i
				); continue;
				case ' ': case '\t': case '\n': case '\r':
					toStr(str.slice(flag, i)) === 'function' || (
						toStr(str.slice(flag, i)) === 'async'
							? (stack.del(), stack.add(0), isAsync = true)
							: name || (name = '"' + toStr(str.slice(flag, i)) + '"')
					);
					flag = i + 1;
					continue;
				case '>':
					rslt = [name.slice(1, -1)];
					name = '';
					stack.del(), stack.add(3);
					continue;
			} continue;
			case 5: switch (str[i]) {
				case '{': return pack(rslt, toStr(str.slice(i + 1, lastIndexOf(str, '}'))), name, fn, isAsync);
			} continue;
			case 6:
				t = repWs(str.slice(flag));
				name = t.code;
				i = t.index + flag;
				stack.del(), stack.add(7);
				continue;
			case 7: switch (str[i]) {
				case '(': flag = i + 1; stack.del(), stack.add(5), stack.add(1);
			} continue;
		}
	}
	var exp = {
		getCode: function (fn) {
			return fn.toString();
		},
		split: split,
		getInnerCode: function (fn) {
			return split(fn).innerCode;
		},
		getParams: function (fn) {
			return split(fn).params;
		},
		getNameCode: function (fn) {
			return split(fn).nameCode;
		},
		isAsync: function (fn) {
			return split(fn).isAsync;
		}
	};
	typeof module === 'undefined'
		? window.func2code = exp
		: module.exports = exp[['defa', 'ult'].join('')] = exp;
}();