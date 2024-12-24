export default (rssResponse, id) => {
  const doc = new DOMParser().parseFromString(rssResponse, 'text/xml').documentElement;
  const channel = doc.querySelector('channel');

  const feed = {
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  };

  const items = channel.querySelectorAll('item');
  const posts = Array.from(items);
  const newPosts = [];
  posts.forEach((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    id += 1; // eslint-disable-line no-param-reassign
    const post = {
      title, link, description, id,
    };
    newPosts.push(post);
  });

  return { feed, posts: newPosts };
};
