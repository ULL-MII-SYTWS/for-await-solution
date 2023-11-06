async function* frstcmfrstsvd(promises) {
  let resolver = []

  // create an array sortedByFulfillment of pending promises and 
  // make available their resolvers in the resolver array
  let sortedByFulfillment = []
  for (let i = 0; i < promises.length; i++) {
    sortedByFulfillment.push(new Promise((res, rej) => {
      resolver.push(res)
    }))
  }

  promises.forEach((p, i) => {
    Promise.resolve(p).then(r => { 
      // resolve the first pending promise on the sortedByFulfillment array 
      let res = resolver.shift()
      res({ value: r, index: i, status: 'fulfilled' })
    }, err => {
      let res = resolver.shift()
      res({ reason: err, index: i, status: 'rejected' })
    })
  })

  for await (let result of sortedByFulfillment) {
    yield result
  }
}

export default frstcmfrstsvd

