import onChange from 'on-change';
import {
  changeForm, changeFeeds, changePosts, changeModal,
} from './view.js';

export default (state) => onChange(state, (path) => {
  switch (path) {
    case 'form.urlValid':
      changeForm(state);
      break;
    case 'form.url':
      changeForm(state);
      break;
    case 'form.status':
      changeForm(state);
      break;
    case 'data.modalId':
      changeModal(state);
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
