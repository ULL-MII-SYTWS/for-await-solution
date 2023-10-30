async function* generateSequence(start, end) {

    for (let i = start; i <= end; i++) {
      // Wow, can use await!
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield i;
    }
  
  }
  
  (async () => {
  
    let generator = generateSequence(1, 5);
    for await (let value of generator) {
        process.stdout.write(value+" "); // 1, then 2, then 3, then 4, then 5 (with delay between)
    }
    console.log();
  })();