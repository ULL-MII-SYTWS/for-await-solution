
Examples from the chapter [Async iteration and generators](https://javascript.info/async-iterators-generators) of the <https://javascript.info> book.

## hello-async-iterator.js

[hello-async-iterator.js](hello-async-iterator.js) - Hello async iterator

## async-generators-finally.js

For most practical applications, when we’d like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it. See: [async-generators-finally.js](async-generators-finally.js)

## fetch-commits.js and async-iterable-range.js

Regular generators can be used instead of `Symbol.iterator` to make the iteration simpler.

   Similar to that, async generators can be used instead of `Symbol.asyncIterator` to implement the asynchronous iteration.

   For instance, we can make the range object generate values asynchronously, once per second as in [async-iterable-range.js](async-iterable-range.js)

## paginated-data.js

GitHub allows us to retrieve commits using pagination:

- We should make a request to fetch in the form <https://api.github.com/repos/{repo}/commits>.
- It responds with a JSON of 30 commits, and also provides a **link to the next page in the Link header**. The `Link` header looks like:
  
  ```
  Link: <https://api.github.com/repositories/2325298/commits?page=2>; rel="next", <https://api.github.com/repositories/2325298/commits?page=40575>; rel="last"
  ```

  - See the script [async-iteration-and-generators/get-commits.sh](/async-iteration-and-generators/get-commits.sh) and [async-iteration-and-generators/get-commits-with-curl.sh](/async-iteration-and-generators/get-commits-with-curl.sh)
- We can use that link for the next request, to get more commits, and so on.
- The `response.headers` object belongs to the [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) class and has several methods. Among them the [get](https://developer.mozilla.org/en-US/docs/Web/API/Headers/get) method
    
    ```js
    let nextPage = response.headers.get('Link')?.match(/<(.*?)>; rel="next"/);
    ```
- The body  is an array of objects that looks like:
  ```json
  [
    {
      "sha": "d2f51b3516dade79269ff45eae2a7668ae711b25",
      "node_id": "C_kwDOACN7MtoAKGQyZjUxYjM1MTZkYWRlNzkyNjlmZjQ1ZWFlMmE3NjY4YWU3MTFiMjU",
      "commit": {
          "author": { "name": "Linus Torvalds", "email": "torvalds@linux-foundation.org", "date": "2023-11-06T02:49:40Z"
          },
          "committer": { "name": "Linus Torvalds", "email": "torvalds@linux-foundation.org", "date": "2023-11-06T02:49:40Z"
          },
          "message": " ...",
          "tree": { ... },
          "url": "https://api.github.com/repos/torvalds/linux/git/commits/d2f51b3516dade79269ff45eae2a7668ae711b25",
          "comment_count": 0,
          "verification": { ... }
      },
      "url": "https://api.github.com/repos/torvalds/linux/commits/d2f51b3516dade79269ff45eae2a7668ae711b25",
      "html_url": "https://github.com/torvalds/linux/commit/d2f51b3516dade79269ff45eae2a7668ae711b25",
      "comments_url": "https://api.github.com/repos/torvalds/linux/commits/d2f51b3516dade79269ff45eae2a7668ae711b25/comments",
      "author": { ... },
      "committer": { ... },
      "parents": [ ... ]
    },
    ...
  ]
  ```
  The `author` is the person who originally wrote the work, whereas the `committer` is the person who last applied the work.
- See [Using link headers](https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers) inside the chapter **Using pagination in the REST API** in the GitHub docs.
- See also <https://docs.github.com/es/rest/commits/commits?apiVersion=2022-11-28#list-commits>
- See <https://docs.github.com/en/rest/guides/using-pagination-in-the-rest-api?apiVersion=2022-11-28> for more details about GitHub pagination.

In file [fetch-commits.js](fetch-commits.js) you'll find the function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. The function cares about all pagination stuff. 

The program [paginated-data.js](paginated-data.js) uses the function `fetchCommits(repo)` to get commits for a random repository.