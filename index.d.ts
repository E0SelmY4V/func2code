/**
 * Function to Code
 * @version 0.9.0
 */
declare module "."
/**Get the code of `fn` */
export function getCode<F extends Function>(fn: F): ReturnType<F['toString']>;
/**Parse the function */
export function split<F extends Function>(fn: F): {
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
