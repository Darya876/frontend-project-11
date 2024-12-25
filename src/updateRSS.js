import _ from 'lodash';

export default function updatePosts(state, parser, parserRSS, watchedPosts) {
  return state.formInfo.urls.map((url) => new Promise((resolve) => {
    resolve(parser(url));
  }).then((response) => {
    const startId = 0;
    console.log(response);
    const { posts } = parserRSS(response.data.contents, startId);
    const diff = _.differenceBy(posts, watchedPosts, 'link');
    console.log(posts);
    console.log(diff);
    console.log([...diff, ...watchedPosts.posts]);
    watchedPosts.posts = [...diff, ...watchedPosts.posts]; // eslint-disable-line no-param-reassign
    return watchedPosts;
  }).catch((err) => console.error(err.message)).finally(() => setTimeout(() => updatePosts(
    state,
    parser,
    parserRSS,
    watchedPosts,
  ), 5000)));
}
