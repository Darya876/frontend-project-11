import axios from 'axios';

export default (url) => axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`);
