import i18next from 'i18next';
import { setLocale } from 'yup';
import _ from 'lodash';
import watchState from './view.js';
import validate from './validate.js';
import getData from './getData.js';
import ru from './ru.js';
import parserRSS from './parserRSS.js';
import updateRSS from './updateRSS.js';
import typeError from './typeError.js';

const app = () => {
  i18next
    .init({
      lng: 'ru',
      debug: true,
      resources: { ru },
    })
    .then(setLocale({
      mixed: {
        notOneOf: i18next.t('errors.alreadyExists'),
      },
      string: {
        matches: i18next.t('errors.nonValid'),
        url: i18next.t('errors.expectedValidUrl'),
      },
    }))
    .then(() => {
      const elements = {
        feedsBox: document.querySelector('.feeds'),
        postsBox: document.querySelector('.posts'),
        form: document.querySelector('.rss-form'),
        input: document.querySelector('#url-input'),
        errorBox: document.querySelector('.feedback'),
      };

      const state = {
        data: {
          feeds: [],
          posts: [],
          openedLinks: [],
          modalId: null,
        },
        form: {
          url: '',
          urlValid: null,
          status: '',
        },
        urls: [],
      };

      const watchedState = watchState(state);

      elements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        const url = elements.input.value;
        watchedState.form.url = url;

        validate(url, state)
          .then(() => getData(url))
          .then((response) => {
            watchedState.urls.push(url);
            if (response.status >= 200 && response.status < 300) {
              watchedState.form.urlValid = true;
              const { feed, posts } = parserRSS(response.data.contents);
              posts.forEach((post) => {
                post.id = _.uniqueId(); // eslint-disable-line no-param-reassign
              });
              watchedState.data.feeds.unshift(feed);
              watchedState.data.posts.unshift(...posts);
              watchedState.form.status = i18next.t('successfullyAdded');
              elements.errorBox.textContent = watchedState.form.status;
            }
          })
          .catch((error) => {
            watchedState.form.urlValid = false;
            watchedState.form.status = typeError(error, watchedState);
          });
      });

      elements.postsBox.addEventListener('click', (e) => {
        const { id } = e.target.dataset;
        watchedState.data.openedLinks.push(id);
        watchedState.data.modalId = id;
      });

      updateRSS(watchedState, getData, parserRSS);
    });
};

export default app;
