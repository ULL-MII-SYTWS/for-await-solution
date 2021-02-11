
import frstcmfrstsvd from '../index.js';

// See https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously
process.on('rejectionHandled', () => { });
process.on('unhandledRejection', error => {
    console.log('unhandledRejection');
});

const sleep = time =>
    new Promise(resolve => setTimeout(resolve, time));


const Times = 10;

const createPromises = () => [ // Recreate the promises each time
    sleep(20).then(() => 'a'),
    'x',
    sleep(10).then(() => 'b'),
    'y',
    sleep(30).then(() => { throw `Ohhh:\n` }),
    'z',
];

async function checkPerformance() {
    await (async () => {
        try {
            console.time('frstcmfrstsvd');
            for (let i = 0; i < Times; i++) {
                const arr = createPromises();
                for await (let item of frstcmfrstsvd(arr)) { }
            }
            console.timeEnd('frstcmfrstsvd')
        } catch (e) {
            console.log('Catched!:\n', e);
        }
    })();

    await (async () => {
        try {
            console.time('allsettled');
            for (let i = 0; i < Times; i++) {
                const arr = createPromises();
                await Promise.allSettled(arr);
            }
            console.timeEnd('allsettled')
        } catch (e) {
            console.log('Catched!:\n', e);
        }
    })()
}

checkPerformance();
