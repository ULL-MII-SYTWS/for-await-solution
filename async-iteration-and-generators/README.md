Examples from the chapter [Async iteration and generators](https://javascript.info/async-iterators-generators) of the <https://javascript.info> book.

1. [hello-async-iterator.js](hello-async-iterator.js) - Hello async iterator
2. For most practical applications, when we’d like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

    The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

    And then use `for await (...)` to iterate over it. See: [async-generators-finally.js](async-generators-finally.js)
3. Regular generators can be used instead of `Symbol.iterator` to make the iteration simpler.

   Similar to that, async generators can be used instead of `Symbol.asyncIterator` to implement the asynchronous iteration.

   For instance, we can make the range object generate values asynchronously, once per second as in [async-iterable-range.js](async-iterable-range.js)
4. GitHub allows us to retrieve commits using pagination:

    - We should make a request to fetch in the form <https://api.github.com/repos/{repo}/commits>.
    - It responds with a JSON of 30 commits, and also provides a **link to the next page in the Link header**. The `Link` header looks like:
     
      ```
      Link: <https://api.github.com/repositories/2325298/commits?page=2>; rel="next", <https://api.github.com/repositories/2325298/commits?page=40575>; rel="last"
      ```

    - We can use that link for the next request, to get more commits, and so on.
    - See [Using link headers](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers) in the GitHub docs.
    - See also <https://docs.github.com/es/rest/commits/commits?apiVersion=2022-11-28#list-commits>
    - See <https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28> for more details about GitHub pagination.

    In file [fetch-commits.js](fetch-commits.js) you'll find the function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. The function cares about all pagination stuff. 


    The program [paginated-data.js](paginated-data.js) uses the function `fetchCommits(repo)` to get commits for a random repository.