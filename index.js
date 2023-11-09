async function* frstcmfrstsvd(promises) {
  const wPromises = []; // wrapped promises
  const values = [];

  for (let i = 0; i < promises.length; i++) {
    const p = Promise.resolve(promises[i]);
    const wPromise = p
      .then((result) => {
        let r = { value: result, index: i, status: "fulfilled" };
        values.push(r);
        return r;
      })
      .catch((error) => {
        let reason = { reason: error, index: i, status: "rejected" };
        values.push(reason); // Agregar un valor marcado para identificar el error
        return reason;
      });
    wPromises.push(wPromise);
  }

  for (const wPromise of wPromises) {
    await wPromise;
    yield values.shift();
  }
  return values;
}

export default frstcmfrstsvd;
