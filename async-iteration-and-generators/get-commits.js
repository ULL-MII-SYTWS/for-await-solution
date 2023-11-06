#!/Users/casianorodriguezleon/.nvm/versions/node/v20.5.0/bin/node
/* needs node >= v18 */
// Octokit.js
// https://github.com/octokit/core.js#readme
import { Octokit } from "@octokit/core";
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})

let result = await octokit.request('GET /repos/torvalds/linux/commits', {
    owner: 'torvalds',
    repo: 'linux',
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
})

console.log(result.data[0].commit.author.name);