Examples from the chapter [Async iteration and generators](https://javascript.info/async-iterators-generators) of the <https://javascript.info> book.

1. [hello-async-iterator.js](hello-async-iterator.js) - Hello async iterator
2. For most practical applications, when we’d like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it. See: [async-generators-finally.js](async-generators-finally.js)
