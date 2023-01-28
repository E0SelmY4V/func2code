/**Get the code of `fn` */
export function getCode<F extends Function>(fn: F): ReturnType<F['toString']>;
/**Parse the function */
export function split<F extends Function>(fn: F): {
	isAsync: boolean;
	isArrow: boolean;
	isGenerator: boolean;
	name: F['name'];
	nameCode: string;
	innerCode: string;
	params: string[];
};
/**Get the inner code of `fn` */
export function getInnerCode(fn: Function): string;
/**Get params list of `fn` */
export function getParams(fn: Function): string[];
/**Get the possible code delcarating `fn`'s name */
export function getNameCode(fn: Function): string;
/**Know if `fn` is an arrow function */
export function isArrow(fn: Function): boolean;
/**Know if `fn` is an generator function */
export function isGenerator(fn: Function): boolean;
/**Know if `fn` is an async function */
export function isAsync(fn: Function): boolean;
/**
 * Function to Code
 * @version 1.1.1
 * @license MIT
 * @link https://github.com/E0SelmY4V/func2code
 */
declare const func2code: typeof import('.');
export default func2code
