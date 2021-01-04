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
    { value: 'c', index: 4, status: 'fulfilled' }
];

test('checking order of frstcmfrstsvd', async () => {

    const sleep = time => new Promise(resolve => setTimeout(resolve, time));

    const arr = [
        sleep(200).then(() => 'a'),
        'x',
        sleep(100).then(() => 'b'),
        'y',
        sleep(300).then(() => 'c'),
        'z',
    ];

    for await (let item of frstcmfrstsvd(arr)) {
        result.push(item);
    }
    expect(result).toEqual(expected);
});
