async function* frstcmfrstsvd(iterable) {
  const promises = [];
  const values = [];

  for (let i = 0; i < iterable.length; i++) {
    const item = Promise.resolve(iterable[i]);
      const promise = item
        .then((result) => {
          return values.push({value: result, index: i, status: "fulfilled"});
        })
        .catch((error) => {
          //console.error("Promise rejection:", error);
          return values.push({reason: error, index: i, status: 'rejected'}); // Agregar un valor marcado para identificar el error
        });
      promises.push(promise);
  }

  for (const promise of promises) {
    await promise;
    yield values.shift();
  }

}

export default frstcmfrstsvd;
