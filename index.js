// promises is an Array not an Iterable
async function* auxIterator(promises) {
  let wrappedPromises = promises.map((p, i) => {
    return new Promise((resolve, reject) => {
      p.then(r => resolve([r,i]))
      .catch(e => reject(e))
    })
  });

  let [r, i] = await Promise.race(wrappedPromises);
  yield r;
  promises.splice(i,1);
  if (promises.length) 
    yield * auxIterator(promises)
}

async function * fffs(promises) {
  let wrappedPromises = promises.map((p, i) => {
    return new Promise((resolve, reject) => {
      Promise.resolve(p).then(r => resolve({value: r, index: i, status: 'fulfilled'}))
      .catch(e => resolve({reason: e, index: i, status: 'rejected'}))
    })
  });

  yield * await auxIterator(wrappedPromises);
}
export { fffs }

