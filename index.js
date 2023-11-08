function frstcmfrstsvd(promises) {
  let resolver = []

  // create an array sortedByFulfillment of pending promises and 
  // make available their resolvers in the resolver array
  let sortedByFulfillment = []
  for (let i = 0; i < promises.length; i++) {
    sortedByFulfillment.push(new Promise((res, _) => {
      resolver.push(res)
    }))
  }

  promises.forEach(async (p, i) => {
    try {
      let r = await p;
      let res = resolver.shift()
      res({ value: r, index: i, status: 'fulfilled' })  
    }
    catch(err) {
      let res = resolver.shift()
      res({ reason: err, index: i, status: 'rejected' })
    }
  })

  return sortedByFulfillment

}

export default frstcmfrstsvd

