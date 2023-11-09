async function* frstcmfrstsvd(iterable) {
  const promises = [];
  const values = [];

  for (let i = 0; i < iterable.length; i++) {
    const item = Promise.resolve(iterable[i]);
      const promise = item
        .then((result) => {
          let r = {value: result, index: i, status: "fulfilled"};
          values.push(r);
          return r;
        })
        .catch((error) => {
          let reason = {reason: error, index: i, status: "rejected"};
          values.push(reason); // Agregar un valor marcado para identificar el error
          return reason;
        });
      promises.push(promise);
  }

  for (const promise of promises) {
    await promise;
    yield values.shift();
  }

}

export default frstcmfrstsvd;
