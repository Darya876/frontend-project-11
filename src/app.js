import i18next from 'i18next';
import { watchForm, watchPosts, watchFeeds } from './view.js';
import validate from './validate.js';
import getData from './getData.js';
import ru from './ru.js';
import parserRSS from './parserRSS.js';
import updateRSS from './updateRSS.js';
import typeError from './typeError.js';

const app = () => {
  const elements = {
    feedsBox: document.querySelector('.feeds'),
    postsBox: document.querySelector('.posts'),
    form: document.querySelector('form'),
    input: document.querySelector('#url-input'),
    errorBox: document.querySelector('.feedback'),
  };

  const state = {
    data: {
      feeds: [],
      posts: [],
      openedLinks: [],
    },
    formInfo: {
      urls: [],
      status: '',
    },
    form: {
      url: '',
      urlValid: '',
    },
  };

  const watchedForm = watchForm(state, elements.input);
  const watchedPosts = watchPosts(state, state.data);
  const watchedFeeds = watchFeeds(state.data.feeds);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = elements.input.value;
    watchedForm.url = url;

    validate(url, state)
      .then(() => getData(url))
      .then((response) => {
        state.formInfo.urls.push(url);
        if (response.status >= 200 && response.status < 300) {
          const { feed, posts } = parserRSS(response.data.contents);
          watchedFeeds.unshift(feed);
          watchedPosts.posts.unshift(...posts);
          state.formInfo.status = i18next.t('successfullyAdded');
          elements.errorBox.textContent = state.formInfo.status;
          watchedForm.urlValid = true;
        }
      })
      .catch((error) => {
        state.formInfo.status = typeError(error, state, watchedForm);
      });
  });

  elements.postsBox.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    watchedPosts.openedLinks.push(id);
  });

  updateRSS(state, getData, parserRSS, watchedPosts);
};

i18next
  .init({
    lng: 'ru',
    debug: true,
    resources: { ru },
  })
  .then(() => app());

export default app;
