export default function updatePosts(state, parser, parserRSS, watchedPosts) {
  const promises = state.formInfo.urls.map((url) => parser(url));
  return Promise.all(promises)
    .then((response) => {
      if (response !== undefined) {
        const id = 1;
        for (let i = 0; i < response.length; i += 1) {
          const { feed, posts } = parserRSS(response[i].data.contents, id);
          console.log({ feed, posts });
          watchedPosts.posts = []; // eslint-disable-line no-param-reassign
          watchedPosts.posts.push(...posts);
          console.log(watchedPosts);
        }
      }
    })
    .catch((err) => console.error(err.message))
    .finally(() => setTimeout(() => updatePosts(
      state,
      parser,
      parserRSS,
      watchedPosts,
    ), 5000));
}
