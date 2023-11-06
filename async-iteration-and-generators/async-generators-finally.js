async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {
    let square = await new Promise(resolve => setTimeout(() => resolve(i*i), 1000));
    yield square;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    process.stdout.write(value + " "); // 1, then 4, then 9, then 16, then 25
  }
  console.log();

  /* Manually iterate over async generator */
  generator = generateSequence(6, 10);
  while (true) {
    let next = await generator.next(); // In a regular generator we’d use result = generator.next(). In an async generator, we should add await 
    if (next.done) break;
    process.stdout.write(next.value + " "); // 36, then 49, then 64, then 81, then 100
  }
  console.log();
})();