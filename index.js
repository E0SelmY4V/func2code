/**
 * Function to Code
 * @version 1.1.1
 * @license MIT
 * @link https://github.com/E0SelmY4V/func2code
 */
"use strict";
!function () {
	var vo = { ' ': 0, '\t': 0, '\n': 0, '\r': 0 };
	var noIdx = !'.'[0];

	/**@type {(n:string|string[])=>string} */
	var toStr = noIdx ?
		function (n) { return n.join('') }
		: function (n) { return n; };

	/**@type {(n:string,o:string[])=>string} */
	function reps(n, o) {
		for (var i = o.length - 1; i >= 0; i -= 2) n = n.split(o[i - 1]).join(o[i]);
		return n;
	}

	/**@type {(str:string|string[],find:string)=>number} */
	var lastIndexOf = ''.lastIndexOf
		? function (str, find) { return str.lastIndexOf(find); }
		: function (str, find) {
			typeof str === 'string' && (str = str.split(''));
			for (var r = [], i = str.length - 1; i >= 0; --i) r.push(str[i]);
			return str.length - r.join('').indexOf(find) - 1;
		}

	/**@type {(n:string)=>string} */
	function outSpace(n) {
		n = reps(n, ['\n', ' ', '\r', ' ', '\t', ' ']);
		while (n.indexOf('  ') !== -1) n = n.split('  ').join(' ');
		return n;
	}

	/**@type {(n:string[])=>string[]} */
	function rmvVoid(n) {
		for (var r = [], i = 0; i < n.length; ++i) n[i] && r.push(n[i]);
		return r;
	}

	/**@type {(n:string[])=>string} */
	function rsiSpace(n) {
		for (var s = true, i = 0; i < n.length; ++i) (
			s && n[i].indexOf(' ') === 0 && (n[i] = n[i].slice(1)),
			s = lastIndexOf(n[i], ' ') === n[i].length - 1
		);
		n = n.join('');
		return lastIndexOf(n, ' ') === n.length - 1 ? n.slice(0, -1) : n
	}

	/**@param {string} n */
	function repWsEle(n) { n && (this.quo = n); }
	repWsEle.prototype = {
		/**@type {false|string} */
		quo: false,
		depth: 0,
		/**是否有斜线 */
		slash: false,
		/**是否有星星 */
		star: false,
		/**是否有 `$` */
		had$: false
	};

	/**
	 * @template [T=number]
	 * @param {T[]} n
	 * @param {string|string[]|{[x:string]:any}} add
	 */
	function Stack(n, add) {
		this.ele = (this.mem = n)[this.now = n.length - 1]
		this.rslt = [];
		typeof add === 'string' || '0' in add ? this.str = add : this.c = add;
	}
	Stack.prototype = {
		/**栈
		 * @type {T[]} */
		mem: null,
		/**当前栈最高层 */
		now: 0,
		/**当前栈顶元素
		 * @type {T} */
		ele: void 0,
		flag: 0,
		str: '',
		/**@type {string[]} */
		rslt: null,
		/**栈运行时属性
		 * @type {{[x:string]:any}} */
		c: null,
		write: function (i, outside) {
			var str = toStr(this.str.slice(this.flag, this.flag = i));
			this.rslt.push(outside ? outSpace(str) : str);
		},
		end: function (i) {
			this.write(i || this.flag, true);
			return rsiSpace(rmvVoid(this.rslt));
		},
		add: function (n) {
			this.mem.push(n);
			this.ele = this.mem[++this.now];
		},
		del: function () {
			this.mem.pop();
			this.ele = this.mem[--this.now];
		}
	};

	/**@param {string|string[]} str */
	function repWs(str) {
		var stack = new Stack([new repWsEle()], str);
		for (var i = 0; i < str.length; ++i) switch (stack.ele.quo) {
			case false: switch (str[i]) { // 外面
				case "'": case "`": case '"': delete stack.ele.slash;
					stack.add(new repWsEle(str[i]));
					stack.write(i, true);
					continue;
				case '{': case '[': case '(': delete stack.ele.slash;
					++stack.ele.depth;
					continue;
				case '}': case ']': case ')': case ',': delete stack.ele.slash;
					if (stack.ele.depth === 0 && stack.now === 0) return {
						code: stack.end(i),
						index: i,
						nofin: str[i] === ','
					};
					if (str[i] !== ',') stack.ele.depth-- || (
						stack.del(),
						stack.write(i, true)
					);
					continue;
				case '/':
					stack.ele.slash ? (
						stack.add(new repWsEle('/')),
						stack.write(i - 1, true),
						delete stack.ele.slash
					) : stack.ele.slash = true;
					continue;
				case '*':
					stack.ele.slash && (
						stack.add(new repWsEle('*')),
						stack.write(i - 1, true),
						delete stack.ele.slash
					);
					continue;
				default: delete stack.ele.slash;
					continue;
			}
			case '/': switch (str[i]) {
				case '\n': case '\r': stack.del(), stack.flag = i + 1;
				default: continue;
			}
			case '*': switch (str[i]) {
				case '*':
					stack.ele.star = true;
					continue;
				case '/':
					stack.ele.star && (stack.del(), stack.flag = i + 1);
					continue;
				default: delete stack.ele.star;
					continue;
			}
			default: switch (str[i]) {
				case '$':
					stack.ele.had$ = true;
					continue;
				case stack.ele.quo: stack.del();
					stack.write(i + 1, false);
					continue;
				case '\\': delete stack.ele.had$;
					++i;
					continue;
				case '{':
					stack.ele.quo === '`' && stack.ele.had$ && (
						stack.add(new repWsEle()),
						stack.write(i + 1, false)
					);
					delete stack.ele.had$;
					continue;
				default: delete stack.ele.had$;
					continue;
			}
		}
		return {
			code: stack.end(),
			index: i,
			nofin: false
		};
	}

	/**@param {string|string[]} str */
	function splitParams(str) {
		var k;
		var rslt = [];
		var index = 0;
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

	function pack(c, code, fn) {
		return {
			params: rmvVoid(c.rslt),
			innerCode: code,
			nameCode: c.name,
			name: fn.name,
			isArrow: c.isArrow,
			isAsync: c.isAsync,
			isGenerator: c.isGenerator
		};
	}
	function voidPack(err) {
		var a = pack(
			{
				rslt: [],
				isArrow: false,
				isAsync: false,
				isGenerator: false
			},
			'',
			false
		);
		a.error = err;
		return a;
	}

	var S = {
		Orign: 30,
		Args: 31,
		Arrow: 32,
		Body: 33,
		Sign: 34,
		PName: 35,
		GoCmt: 37,
		CmtLn: 38,
		Void: 39,
		Cmt: 40,
		CmtEnd: 41
	};

	function splitOri(fn) {
		var str = noIdx ? fn.toString().split('') : fn.toString();
		var stack = new Stack(
			[S.Orign, S.Void],
			{
				name: '',
				isAsync: false,
				isArrow: false,
				isGenerator: false
			}
		);
		var t;
		for (var i = 0; i < str.length; ++i) switch (stack.ele) {
			case S.Orign: switch (str[i]) {
				case '(':
					stack.c.isArrow = true;
					stack.flag = i + 1;
					stack.del();
					stack.add(S.Arrow);
					stack.add(S.Args);
					continue;
				case '[':
					stack.flag = i + 1;
					stack.del();
					stack.add(S.PName);
					continue;
				default:
					stack.del();
					stack.add(S.Sign);
					continue;
			}
			case S.Args:
				t = splitParams(str.slice(stack.flag));
				i = t.index + stack.flag - 1;
				stack.c.rslt = t.params;
				stack.del();
				continue;
			case S.Arrow: switch (str[i]) {
				case '>':
					stack.del();
					stack.add(S.Body);
					stack.add(S.Void);
					continue;
				default: continue;
			}
			case S.Body: switch (str[i]) {
				case '{':
					return pack(
						stack.c,
						toStr(str.slice(i + 1, lastIndexOf(str, '}'))),
						fn
					);
				default:
					return pack(
						stack.c,
						'return ' + toStr(str.slice(i), 3) + ';',
						fn
					);
			}
			case S.Sign: switch (str[i]) {
				case '(':
					str[i - 1] in vo ? (
						stack.flag = i + 1,
						stack.del(),
						stack.add(S.Body),
						stack.add(S.Void),
						stack.add(S.Args)
					) : (noIdx
						? str.splice(i, 0, ' ')
						: str = str.slice(0, i) + ' ' + str.slice(i),
						--i
					);
					continue;
				case '/': case ' ': case '\t': case '\n': case '\r':
					t = toStr(str.slice(stack.flag, i), 4);
					t !== 'function*' ? t !== 'function' && (t === 'async'
						? (
							stack.del(),
							stack.add(S.Orign),
							stack.c.isAsync = true
						)
						: (t === '*'
							? stack.c.isGenerator = true
							: stack.c.name || (stack.c.name = '"' + t + '"')
						)
					) : stack.c.isGenerator = true;
					stack.add(S.Void);
					str[i] === '/' && i--;
					continue;
				default: continue;
			}
			case S.PName:
				t = repWs(str.slice(stack.flag));
				stack.c.name = t.code;
				i = t.index + stack.flag;
				stack.del();
				stack.add(S.Sign);
				continue;
			case S.Void: switch (str[i]) {
				case '/':
					stack.add(S.GoCmt);
					continue;
				case ' ': case '\t': case '\n': case '\r': continue;
				default:
					stack.del();
					stack.flag = i--;
					continue;
			}
			case S.GoCmt: switch (str[i]) {
				case '/':
					stack.del();
					stack.add(S.CmtLn);
					continue;
				case '*':
					stack.del();
					stack.add(S.Cmt);
					continue;
				default: continue;
			}
			case S.CmtLn: switch (str[i]) {
				case '\n': case '\r':
					stack.del();
					continue;
				default: continue;
			}
			case S.Cmt: switch (str[i]) {
				case '*':
					stack.del();
					stack.add(S.CmtEnd);
					continue;
				default: continue;
			}
			case S.CmtEnd: switch (str[i]) {
				case '/':
					stack.del();
					continue;
				default:
					stack.del();
					stack.add(S.Cmt);
					continue;
			}
		}
		throw Error('Not returned after parsing');
	}

	function split(fn) {
		try {
			return splitOri(fn);
		} catch (err) {
			return voidPack(err);
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
		isArrow: function (fn) {
			return split(fn).isArrow;
		},
		isGenerator: function (fn) {
			return split(fn).isGenerator;
		},
		isAsync: function (fn) {
			return split(fn).isAsync;
		}
	};

	typeof module === 'undefined'
		? window.func2code = exp
		: module.exports = exp[['defa', 'ult'].join('')] = exp;
}();