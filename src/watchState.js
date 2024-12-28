import onChange from 'on-change';
import {
  changeForm, changeFeeds, changePosts,
} from './view.js';

export default (state) => onChange(state, (path) => {
  switch (path) {
    case 'form':
      changeForm(state);
      break;
    case 'data.feeds':
      changeFeeds(state);
      break;
    case 'data.posts':
      changePosts(state);
      break;
    default:
      break;
  }
});
