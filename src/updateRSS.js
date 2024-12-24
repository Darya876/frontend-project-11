export default (state, parser, parserRSS, watchedPosts, watchedFeeds) => {
  setTimeout(function tick() {
    const promises = state.formInfo.urls.map((url) => parser(url));
    console.log(state);
    Promise.all(promises)
      .then((response) => {
        if (response !== undefined) {
          const id = 1;
          for (let i = 0; i < response.length; i += 1) {
            const { feed, posts } = parserRSS(response[i].data.contents, id);
            console.log({ feed, posts });
            watchedPosts.posts = []; // eslint-disable-line no-param-reassign
            watchedPosts.posts.push(...posts);
            // watchedFeeds.push(feed);
            console.log(watchedFeeds);
            console.log(watchedPosts);
          }
        }
      });
    setTimeout(tick, 5000);
  }, 5000);
};
