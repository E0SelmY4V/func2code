/// <reference path="./global.d.ts" />

/**
 * 函数变代码
 * @version 1.2.0
 * @license MIT
 * @link https://github.com/E0SelmY4V/func2code
 */
declare module ".";

import getCode = func2code.getCode;
import FuncInfo = func2code.FuncInfo;
import split = func2code.split;
import getInnerCode = func2code.getInnerCode;
import getParams = func2code.getParams;
import getNameCode = func2code.getNameCode;
import isArrow = func2code.isArrow;
import isGenerator = func2code.isGenerator;
import isAsync = func2code.isAsync;
import isGetter = func2code.isGetter;
import isSetter = func2code.isSetter;

import * as def from ".";
export default def;
export {
	getCode,
	FuncInfo,
	split,
	getInnerCode,
	getParams,
	getNameCode,
	isArrow,
	isGenerator,
	isAsync,
	isGetter,
	isSetter,
};
