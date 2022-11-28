async function* frstcmfrstsvd(promises) {
  let resolvers = []
  let proms = []
  for (let i = 0; i < promises.length; i++) {
    proms.push(new Promise((res, rej) => {
      resolvers.push(res)
    }))
  }

  promises.forEach((p, i) => {
    Promise.resolve(p).then(r => {
      let res = resolvers.shift()
      res({ value: r, index: i, status: 'fulfilled' })
    }, err => {
      let res = resolvers.shift()
      res({ reason: err, index: i, status: 'rejected' })
    })
  })

  for await (let result of proms) {
    yield result
  }
}

export default frstcmfrstsvd

