# First to be Fulfilled is First to be Served

Returns an async generator that receives an array of promises (not an iterator) and yields the values in the order they are fulfilled

## Usage

```js
import { fffs } from 'fffs';

for await (let result of fffs(arrayOfPromises)) {
   ... // First promise to fulfill is processed first 
}
```

## Introduction

If you use for-await-of on an array of promises, you iterate over it in the specified order, doesn't matter if the next promise in the given array is resolved before the previous one:

```javascript
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

(async function () {
    const arr = [
        sleep(2000).then(() => 'a'),
        'x',
        sleep(1000).then(() => 'b'),
        'y',
        sleep(3000).then(() => 'c'),
        'z',
    ];

    for await (const item of arr) {
        console.log(item);
    }
}());
```

Output:

```
➜  test-racing-for-await-of git:(master) ✗ node test/for-await-simple.js
a
x
b
y
c
z
```

But sometimes you want to process the results as soon as the promises yield them. To achieve it, import the current module and use it as in this example:

```javascript
import { fffs } from '../index.js';

process.on('rejectionHandled', () => { });
process.on('unhandledRejection', error => {
    console.log('unhandledRejection');
});

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const arr = [
    sleep(2000).then(() => 'a'),
    Promise.resolve('x'),
    sleep(1000).then(() => 'b'),
    Promise.resolve('y'),
    sleep(3000).then(() => 'c'),
    Promise.resolve('z'),
];

console.log(fffs);

(async () => {
    for await (let item of fffs(arr)) {
        console.log("item = ",item);
    }
})()
```

Output:

```
➜  test-racing-for-await-of git:(master) ✗ node test/hello-fffs.js
[AsyncGeneratorFunction: fffs]
item =  { result: 'x', index: 1 }
item =  { result: 'y', index: 3 }
item =  { result: 'z', index: 5 }
item =  { result: 'b', index: 2 }
item =  { result: 'a', index: 0 }
item =  { result: 'c', index: 4 }
```

## Error Management Example

Here is an example of use with rejection:

```js

import { fffs } from '../index.js';

// See https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously
process.on('rejectionHandled', () => { });
process.on('unhandledRejection', error => {
    console.log('unhandledRejection');
});

const sleep = time => 
   new Promise(resolve => setTimeout(resolve, time));

const arr = [
    sleep(2000).then(() => 'a'),
    'x',
    sleep(1000).then(() => 'b'),
    'y',
    sleep(3000).then(() => { throw `Ohhh:\n` }),
    'z',
];

(async () => {
    try {
        for await (let item of fffs(arr)) {
            console.log("item = ",item);
        }
    } catch(e) {
       console.log('Catched!:\n', e);
    }

})()
```

Gives as output:

```
➜  test-racing-for-await-of git:(main) node test/reject-fffs.js 
item =  { result: 'x', index: 1 }
item =  { result: 'y', index: 3 }
item =  { result: 'z', index: 5 }
item =  { result: 'b', index: 2 }
item =  { result: 'a', index: 0 }
Catched!:
 { error: 'Ohhh:\n', index: 4 }
 ```