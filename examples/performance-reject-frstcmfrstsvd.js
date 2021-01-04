
import frstcmfrstsvd from '../index.js';

// See https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously
process.on('rejectionHandled', () => { });
process.on('unhandledRejection', error => {
    console.log('unhandledRejection');
});

const sleep = time => 
   new Promise(resolve => setTimeout(resolve, time));

const arr = [
    sleep(20).then(() => 'a'),
    'x',
    sleep(10).then(() => 'b'),
    'y',
    sleep(30).then(() => { throw `Ohhh:\n` }),
    'z',
];

(async () => {
    try {
        console.time('frstcmfrstsvd');
        for await (let item of frstcmfrstsvd(arr)) {
            console.log("item = ",item);
        }
        console.timeEnd('frstcmfrstsvd')
    } catch(e) {
       console.log('Catched!:\n', e);
    }
})();

(async () => {
    try {
        console.time('allsettled');
        let results = await Promise.allSettled(arr);
        
        results.forEach( (item) => console.log(`item = ${JSON.stringify(item)}`))
        
        console.timeEnd('allsettled')
    } catch(e) {
       console.log('Catched!:\n', e);
    }

})()


