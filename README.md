# Function to Code

*func2code* can get the code, the name of params and the inner code of function.

## Import

### ESM

```ts
import func2code from 'func2code';
```

### CJS

```js
const func2code = require('func2code');
```

### Browser

```html
<script src="func2code/index.js"></script>
<script>
  /// <reference path="func2code/browser.d.ts" />
  console.log(func2code);
</script>
```

## Usage

- Input

  ```js
  func2code.split(async function abc(
    a, k,
    {[`${[1,2,3].join('')}`]: b},
    [c, d]
  ) {
    return 1 + 2;
  });
  ```

  Output

  ```js
  {
    params: [ 'a', 'k', "{[ `${ [1,2,3].join( '' ) }` ]: b}", '[c, d]' ],
    innerCode: '\n  return 1 + 2;\n',
    nameCode: '"abc"',
    name: 'abc',
    isArrow: false,
    isAsync: true,
    isGenerator: false
  }
  ```

- Input

  ```js
  func2code.getInnerCode(()=>1+1);
  ```

  Output

  ```js
  'return 1+1;'
  ```

- Input

  ```js
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
  ```

  Output

  ```js
  "'n' + `${ (()=>1+1)[[ 'to' , 'St' , 'ri' , 'ng' , ].join( '' )]() }` +123"
  ```
