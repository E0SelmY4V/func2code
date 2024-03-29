# Function to Code

[![github action](https://github.com/E0SelmY4V/func2code/actions/workflows/test.yml/badge.svg)](https://github.com/E0SelmY4V/func2code/actions)
[![codecov](https://codecov.io/gh/E0SelmY4V/func2code/branch/master/graph/badge.svg?token=LAZE5B30HX)](https://codecov.io/gh/E0SelmY4V/func2code)

*func2code*'s main usage is to get the inner code of a function.

As a by-product, *func2code* can also get various information of the function, like params, name and name-code.

## Import

### ESM

```ts
import func2code from 'func2code';
```

### CJS

```js
const func2code = require('func2code');
```

### HTML

```html
<script src="func2code/index.js"></script>
<script>
  /// <reference path="func2code/global.d.ts" />
  console.log(func2code);
</script>
```

## Usage

```js
// Input
func2code.getInnerCode(()=>1+1);

// Output
'return 1+1;'
```

```js
// Input
func2code.split(async function abc(
  a, k,
  {[`${[1,2,3].join('')}`]: b},
  [c, d]
) {
  return 1 + 2;
});

// Output
{
  params: [
    'a',
    'k',
    "{[`${[1,2,3].join('')}`]: b}",
    '[c, d]'
  ],
  innerCode: '\n  return 1 + 2;\n',
  nameCode: '"abc"',
  name: 'abc',
  isArrow: false,
  isAsync: true,
  isGetter: false,
  isSetter: false,
  isGenerator: false
}
```

```js
// Input
func2code.getNameCode({
  ['n'+`${(()=>1+1)[[
    'to',
    'St',
    'ri',
    'ng',
  ].join('')]()}`+123](n) {
    return n + 1;
  }
}['n()=>1+1123'])

// Output
"'n'+`${(()=>1+1)[[ 'to', 'St', 'ri', 'ng', ].join('')]()}`+123"
```

[See all the test cases](https://github.com/E0SelmY4V/func2code/blob/master/test/fn.js)
