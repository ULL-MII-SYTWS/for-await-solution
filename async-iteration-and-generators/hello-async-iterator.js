let range = {
    from: 1,
    to: 5,
  
    [Symbol.asyncIterator]() { // (1)
      return {
        current: this.from,
        last: this.to,
  
        async next() { // (2)
  
          // note: we can use "await" inside the async next:
          await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
  
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
  
  (async () => {
  
    for await (let value of range) { // (4)
      process.stdout.write(value+" "); // 1,2,3,4,5
    }
    console.log();
  })()
  
  /* 
  The structure is similar to regular iterators:
  1. To make an object asynchronously iterable, it must have a method Symbol.asyncIterator (1).
  2. This method must return the object with next() method returning a promise (2).
  3. The next() method doesn’t have to be async, it may be a regular method returning a promise, 
     but async allows us to use await, so that’s convenient. 
     Here we just delay for a second (3).
  4. To iterate, we use for await(let value of range) (4), namely add “await” after “for”. 
     It calls range[Symbol.asyncIterator]() once, and then its next() for values.
  */
 
  let g = range[Symbol.asyncIterator]();
  console.log(g.next());

try {
  console.log([ ...range ]) // Error, no Symbol.iterator
} catch (e) {
  console.log("Spread syntax won't work: That’s natural, as it expects to find Symbol.iterator, not Symbol.asyncIterator.\n", e.message)
}

try {
  for (let value of range) { // Error, no Symbol.iterator
    console.log(value)
  }
} catch (e) {
  console.log("for..of syntax won't work: That’s natural, as it expects to find Symbol.iterator, not Symbol.asyncIterator.\n", e.message)
}