/**
 * 函数变代码
 * @version 1.1.1
 * @license MIT
 * @link https://github.com/E0SelmY4V/func2code
 */
declare namespace func2code {
	/**
	 * 获取 {@link fn|`fn`} 的源代码。
	 *
	 * 实际上就是调用 {@link Function.prototype.toString|`Function#toString`}
	 */
	function getCode<F extends Function>(fn: F): ReturnType<F['toString']>;

	/**函数解析出的信息 */
	interface FuncInfo {
		/**是否是异步函数 */
		isAsync: boolean;
		/**是否是箭头函数 */
		isArrow: boolean;
		/**是否是迭代器函数 */
		isGenerator: boolean;
		/**名字 */
		name?: string;
		/**名字代码 */
		nameCode: string;
		/**内部代码 */
		innerCode: string;
		/**参数列表 */
		params: string[];
	}

	/**解析函数 {@link fn|`fn`}  */
	function split(fn: Function): FuncInfo;

	/**
	 * 获取 {@link fn|`fn`} 的内部代码
	 * @example
	 * function fn() {
	 *   return 1 + 2;
	 * }
	 * const code = getInnerCode(fn);
	 *
	 * console.log(code); // '\n  return 1 + 2;\n'
	 * @example
	 * const fn = () => 1 + 2;
	 * const code = getInnerCode(fn);
	 *
	 * console.log(code); // 'return 1 + 2;'
	 */
	function getInnerCode(fn: Function): string;

	/**
	 * 获取 {@link fn|`fn`} 的参数列表
	 * @example
	 * function fn(a, { b = NaN, x: c } = { x: 0 }, [d]=[4]) {
	 *   return a + b + c + d;
	 * }
	 * const params = getParams(fn);
	 *
	 * console.log(params);
	 * // [ 'a', '{ b = NaN, x: c } = { x: 0 }', '[d]=[4]' ]
	 */
	function getParams(fn: Function): string[];

	/**
	 * 获取 {@link fn|`fn`} 的名字代码
	 * @example
	 * const obj = {
	 *   ['a' + 'bc']() { return 0; }
	 * };
	 * const nameCode = getNameCode(obj.abc);
	 *
	 * console.log(nameCode); // 'a' + 'bc'
	 */
	function getNameCode(fn: Function): string;

	/**判断 {@link fn|`fn`} 是否是一个箭头函数 */
	function isArrow(fn: Function): boolean;

	/**判断 {@link fn|`fn`} 是否是一个迭代器函数 */
	function isGenerator(fn: Function): boolean;

	/**判断 {@link fn|`fn`} 是否是一个异步函数 */
	function isAsync(fn: Function): boolean;
}