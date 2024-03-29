/**
 * 函数变代码
 * @version 1.2.1
 * @license MIT
 * @link https://github.com/E0SelmY4V/func2code
 */
declare module ".";

/**可以被解析的东西 */
export type Splitable = Function | { toString(...args: any[]): string; };

/**
 * 获取 {@link fn|`fn`} 的源代码。
 *
 * 实际上就是调用 {@link Function.prototype.toString|`Function#toString`}
 */
export function getCode<F extends Splitable>(fn: F): ReturnType<F['toString']>;

/**函数解析出的信息 */
export interface FuncInfo {
	/**是否是异步函数 */
	isAsync: boolean;
	/**是否是箭头函数 */
	isArrow: boolean;
	/**是否是迭代器函数 */
	isGenerator: boolean;
	/**是否是 get 访问器函数 */
	isGetter: boolean;
	/**是否是 set 访问器函数 */
	isSetter: boolean;
	/**名字 */
	name?: string;
	/**名字代码 */
	nameCode: string;
	/**内部代码 */
	innerCode: string;
	/**参数列表 */
	params: string[];
	/**导致解析失败的错误。如果此字段不为空，说明解析失败 */
	error?: Error;
}

/**解析函数 {@link fn|`fn`}  */
export function split(fn: Splitable): FuncInfo;

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
export function getInnerCode(fn: Splitable): string;

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
export function getParams(fn: Splitable): string[];

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
export function getNameCode(fn: Splitable): string;

/**判断 {@link fn|`fn`} 是否是一个箭头函数 */
export function isArrow(fn: Splitable): boolean;

/**判断 {@link fn|`fn`} 是否是一个迭代器函数 */
export function isGenerator(fn: Splitable): boolean;

/**判断 {@link fn|`fn`} 是否是一个异步函数 */
export function isAsync(fn: Splitable): boolean;

/**判断 {@link fn|`fn`} 是否是一个 get 访问器函数 */
export function isGetter(fn: Splitable): boolean;

/**判断 {@link fn|`fn`} 是否是一个 set 访问器函数 */
export function isSetter(fn: Splitable): boolean;

import * as Imp from '.';
export default Imp;
