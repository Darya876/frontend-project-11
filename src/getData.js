import axios from 'axios';

const createProxy = (proxyBase, url) => {
  const href = new URL('/get', proxyBase);
  href.searchParams.append('disableCache', 'true');
  href.searchParams.append('url', url);
  return href;
};

const proxyBase = 'https://allorigins.hexlet.app';

export default (url) => axios.get(createProxy(proxyBase, url));
