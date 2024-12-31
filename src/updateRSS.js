import _ from 'lodash';
import typeError from './typeError.js';

export default function updatePosts(watchedState, getData, parserRSS) {
  const promises = watchedState.urls.map((url) => getData(url)
    .then((response) => {
      const { posts } = parserRSS(response.data.contents);
      const diff = _.differenceBy(posts, watchedState.data.posts, 'link');
      const postsOld = watchedState.data.posts;
      watchedState.data.posts = [...diff, ...postsOld]; // eslint-disable-line no-param-reassign
      return watchedState;
    })
    .catch((error) => typeError(error.message)));

  return Promise.all(promises)
    .finally(() => setTimeout(() => updatePosts(
      watchedState,
      getData,
      parserRSS,
    ), 5000));
}
