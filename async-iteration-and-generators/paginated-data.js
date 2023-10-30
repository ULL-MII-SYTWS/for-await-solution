import _  from 'lodash';

async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;
  
    while (url) {
      const response = await fetch(url, { // (1)
        headers: {
            'User-Agent': 'Our script',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }, // github needs any user-agent header
      });
  
      const body = await response.json(); // (2) response is JSON (array of commits)
  
      // (3) the URL of the next page is in the headers, extract it
      let nextPage = response.headers.get('Link')?.match(/<(.*?)>; rel="next"/);
      nextPage = nextPage?.[1];
  
      url = nextPage;
  
      for(let commit of body) { // (4) yield commits one by one, until the page ends
        yield commit;
      }
    }
  }

  (async () => {

    let someRepos = [ 'torvalds/linux', 
      'ULL-MII-SYTWS-2324/ULL-MII-SYTWS-2324.github.io',
      'javascript-tutorial/en.javascript.info', 
      'ULL-MII-SYTWS-2324/generators-marcos-barrios-lorenzo-alu0101056944']
    let count = 0;
  
    let repoName = _.sample(someRepos);
    console.log(`repoName = ${repoName}`);

    for await (const commit of fetchCommits(repoName)) {
  
      console.log(commit?.author?.login);
  
      if (++count == 100) { // let's stop at 100 commits
        break;
      }
    }
  
  })();
  