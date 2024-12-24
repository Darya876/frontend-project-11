import _ from 'lodash';

export default function updatePosts(state, parser, parserRSS, watchedPosts) {
  const promises = state.formInfo.urls.map((url) => parser(url));
  return Promise.all(promises)
    .then((response) => {
      if (response !== undefined) {
        const startId = 0;
        response.forEach((data) => {
          const { posts } = parserRSS(data.data.contents, startId);
          const diff = _.difference(posts, watchedPosts);
          watchedPosts.posts = diff; // eslint-disable-line no-param-reassign
        });
      }
    })
    .then((postsAll) => console.log(postsAll))
    .catch((err) => console.error(err.message))
    .finally(() => setTimeout(() => updatePosts(
      state,
      parser,
      parserRSS,
      watchedPosts,
    ), 5000));
}
