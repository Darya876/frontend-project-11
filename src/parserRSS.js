import _ from 'lodash';

export default (rssResponse) => {
  const document = new DOMParser().parseFromString(rssResponse, 'text/xml');
  const doc = document.documentElement;
  const channel = doc.querySelector('channel');

  const feed = {
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  };

  const items = channel.querySelectorAll('item');
  const posts = Array.from(items);
  const newPosts = [];
  posts.forEach((item) => {
    const id = _.uniqueId();
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    const post = {
      title, link, description, id,
    };
    newPosts.push(post);
  });

  return { feed, posts: newPosts };
};
