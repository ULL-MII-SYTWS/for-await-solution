# First Promise to Come is First to be Served

Receives an array of promises (not an iterator) and returns an async generator that yields objects `{ value: promiseResult, index: promiseIndex, status: 'fulfilled' }` in the order they are fulfilled. In case of rejection yields an object `{ reason: errorMessage, index: promiseIndex, status: 'rejected' }`

## Usage

```js
import { frstcmfrstsvd } from 'frstcmfrstsvd';

for await (let result of frstcmfrstsvd(arrayOfPromises)) {
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

import { frstcmfrstsvd } from '../index.js';

// See https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously
process.on('rejectionHandled', () => { });
process.on('unhandledRejection', error => {
    console.log('unhandledRejection');
});

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const arr = [
    sleep(2000).then(() => 'a'),
    'x',
    sleep(1000).then(() => 'b'),
    'y',
    sleep(3000).then(() => 'c'),
    'z',
];

console.log(frstcmfrstsvd);

(async () => {
    for await (let item of frstcmfrstsvd(arr)) {
        console.log("item = ",item);
    }
})()
```

Output:

```
> node test/hello-frstcmfrstsvd.js

[AsyncGeneratorFunction: frstcmfrstsvd]
item =  { value: 'x', index: 1, status: 'fulfilled' }
item =  { value: 'y', index: 3, status: 'fulfilled' }
item =  { value: 'z', index: 5, status: 'fulfilled' }
item =  { value: 'b', index: 2, status: 'fulfilled' }
item =  { value: 'a', index: 0, status: 'fulfilled' }
item =  { value: 'c', index: 4, status: 'fulfilled' }
```

## Error Management Example

Here is an example of use with rejection:

```js

import { frstcmfrstsvd } from '../index.js';

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
        for await (let item of frstcmfrstsvd(arr)) {
            console.log("item = ",item);
        }
    } catch(e) {
       console.log('Catched!:\n', e);
    }

})()
```

Gives as output:

```
➜  test-racing-for-await-of git:(main) ✗ node test/reject-frstcmfrstsvd.js
item =  { value: 'x', index: 1, status: 'fulfilled' }
item =  { value: 'y', index: 3, status: 'fulfilled' }
item =  { value: 'z', index: 5, status: 'fulfilled' }
item =  { value: 'b', index: 2, status: 'fulfilled' }
item =  { value: 'a', index: 0, status: 'fulfilled' }
item =  { reason: 'Ohhh:\n', index: 4, status: 'rejected' }
 ```