import _ from 'lodash';

import { fetchCommits } from './fetch-commits.js';

(async () => {

    let someRepos = ['torvalds/linux',
        'ULL-MII-SYTWS-2324/ULL-MII-SYTWS-2324.github.io',
        'javascript-tutorial/en.javascript.info',
        'ULL-MII-SYTWS-2324/generators-marcos-barrios-lorenzo-alu0101056944']
    let count = 0;

    let repoName = _.sample(someRepos);
    console.log(`repoName = ${repoName}`);

    for await (const commit of fetchCommits(repoName)) {

        if (!commit.author) console.log(commit.commit.author.name);
        else console.log(commit?.author?.login || "no login known");

        if (++count == 100) { // let's stop at 100 commits
            break;
        }
    }

})();
