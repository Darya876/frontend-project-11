export default (rssResponse, id) => {
  const doc = new DOMParser().parseFromString(rssResponse, 'text/html').documentElement;
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
    const post = {
      title, link, description, id: `${id} + 1`,
    };
    newPosts.push(post);
  });

  return { feed, posts };
};
