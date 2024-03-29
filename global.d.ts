/**
 * 函数变代码 - 全局类型定义
 * @license MIT
 * @link https://github.com/E0SelmY4V/func2code
 */
declare module './global';
declare global {
	namespace globalThis {
		export import func2code = f2c;
	}
}

import * as f2c from '.';
