/**
 * Function to Code
 * @version 1.0.2
 */
declare module "."
/**Get the code of `fn` */
export function getCode<F extends Function>(fn: F): ReturnType<F['toString']>;
/**Parse the function */
export function split<F extends Function>(fn: F): {
	isAsync: boolean;
	name: F['name'];
	nameCode: string;
	code: ReturnType<F['toString']>;
	innerCode: string;
	params: string[];
};
/**Get the inner code of `fn` */
export function getInnerCode(fn: Function): string;
/**Get params list of `fn` */
export function getParams(fn: Function): string[];
/**Get the possible code delcarating `fn`'s name */
export function getNameCode(fn: Function): string;
/**Know if `fn` is an async function */
export function isAsync(fn: Function): boolean;
