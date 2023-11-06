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
        // It has a special format Link: <https://api.github.com/repositories/93253246/commits?page=2>; rel="next".
        let header = response.headers.get('Link');
       
        let nextPage = header?.match(/<(.*?)>; rel="next"/);
        nextPage = nextPage?.[1];
        // See https://docs.github.com/es/rest/commits/commits?apiVersion=2022-11-28#list-commits
        // and https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28

        url = nextPage;

        for (let commit of body) { // (4) yield commits one by one, until the page ends
            yield commit;
        }
    }
}

export { fetchCommits };
