
import frstcmfrstsvd from '../index.js';

// See https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously
process.on('rejectionHandled', () => { });
process.on('unhandledRejection', error => {
    console.log('unhandledRejection');
});

let result = [];
let expected = [
    { value: 'x', index: 1, status: 'fulfilled' },
    { value: 'y', index: 3, status: 'fulfilled' },
    { value: 'z', index: 5, status: 'fulfilled' },
    { value: 'b', index: 2, status: 'fulfilled' },
    { value: 'a', index: 0, status: 'fulfilled' },
    { reason: 'Ohhh:\n', index: 4, status: 'rejected' }

];

const sleep = time =>
    new Promise(resolve => setTimeout(resolve, time));

const arr = [
    sleep(200).then(() => 'a'),
    'x',
    sleep(100).then(() => 'b'),
    'y',
    sleep(300).then(() => { throw `Ohhh:\n` }),
    'z',
];

test('promises with reject', async () => {
    try {
        for await (let item of frstcmfrstsvd(arr)) {
            result.push(item);
        }
        expect(result).toEqual(expected);
    } catch (e) {
        console.log('Catched!:\n', e);
    }
});