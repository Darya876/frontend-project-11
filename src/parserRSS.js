export default (rssResponse) => {
  const document = new DOMParser().parseFromString(rssResponse, 'text/xml');
  const doc = document.documentElement;
  const channel = doc.querySelector('channel');

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    throw new Error('String is not RSS');
  }

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
      title, link, description,
    };
    newPosts.push(post);
  });

  return { feed, posts: newPosts };
};
