import _ from 'lodash';

export default function updatePosts(state, getData, parserRSS, watchedPosts) {
  const promises = state.formInfo.urls.map((url) => getData(url).then((response) => {
    const { posts } = parserRSS(response.data.contents);
    const diff = _.differenceBy(posts, watchedPosts.posts, 'link');
    watchedPosts.posts = [...diff, ...watchedPosts.posts]; // eslint-disable-line no-param-reassign
    console.log(watchedPosts.openedLinks);
    return watchedPosts;
  }).catch((err) => console.error(err.message)));

  return Promise.all(promises)
    .finally(() => setTimeout(() => updatePosts(
      state,
      getData,
      parserRSS,
      watchedPosts,
    ), 5000));
}
