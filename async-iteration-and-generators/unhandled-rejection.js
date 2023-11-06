process.on('unhandledRejection', (e) => { console.log('unhandledRejection', e.toString().substr(0,20)) });
process.on('rejectionHandled', (e) => { console.log('rejectionHandled', e.toString().substr(0,20)); });

var prm = Promise.reject(new Error('fail'));

setTimeout(() => {
    prm.catch((err) => {
        console.log(err.message);
    })
}, 2000);