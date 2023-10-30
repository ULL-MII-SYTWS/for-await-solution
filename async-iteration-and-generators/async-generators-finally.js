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
    process.stdout.write(value + " "); // 1, then 2, then 3, then 4, then 5 (with delay between)
  }
  console.log();

  /* Manually iterate over async generator */
  generator = generateSequence(6, 10);
  while (true) {
    let next = await generator.next(); // In a regular generator we’d use result = generator.next(). In an async generator, we should add await 
    if (next.done) break;
    process.stdout.write(next.value + " "); // 6, then 7, then 8, then 9, then 10 (with delay between)
  }
  console.log();
})();