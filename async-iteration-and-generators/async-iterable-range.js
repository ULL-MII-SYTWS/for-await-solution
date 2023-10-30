let range = {
    from: 1,
    to: 5,

    // this line is same as [Symbol.asyncIterator]: async function*() {
    async *[Symbol.asyncIterator]() {
        for (let value = this.from; value <= this.to; value++) {

            // make a pause between values, wait for something
            await new Promise(resolve => setTimeout(resolve, 1000));

            yield value;
        }
    },

    /* 
    Technically, we can add both Symbol.iterator and Symbol.asyncIterator to the object, 
    so it’s both synchronously (for..of) and asynchronously (for await..of) iterable.
    In practice though, that would be a weird thing to do.
    */
    [Symbol.iterator]() {
        return {
            current: this.from,
            last: this.to,

            next() {
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

    for (let value of range) {
        process.stdout.write(value + " "); // 1,2,3,4,5
    }
    console.log();

    range.from = 6; range.to = 10;
    for await (let value of range) {
        process.stdout.write(value + " "); // 6, then 7, then 8, then 9, then 10 (with delay between)
    }
    console.log();

})();