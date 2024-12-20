import i18next from 'i18next';
import { watchForm, watchPosts, watchFeeds } from './view.js';
import validate from './validate.js';
import parser from './parser.js';
import locales from './locales.js';
import parserRSS from './parserRSS.js';

export default () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: locales,
  });

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
      ui: {
        openedLinks: [],
      },
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
  const watchedPosts = watchPosts(state.data);
  const watchedFeeds = watchFeeds(state.data.feeds);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = elements.input.value;
    state.form.url = url;

    validate(url, state)
      .then(() => parser(url))
      .then((response) => {
        if (!response.data.contents.includes('</rss>')) {
          throw new Error('String is not RSS');
        }
        state.formInfo.urls.push(url);
        // console.log(state);
        if (response.status >= 200 && response.status < 300) {
          console.log(response.status);
          // state.form.urlValid = true;
          console.log(state);
          const { feed, posts } = parserRSS(
            response.data.contents,
            state.data.posts.length,
          );
          console.log({ feed });
          console.log({ posts });
          // console.log(watchedPosts);
          watchedFeeds.push(feed);
          watchedPosts.posts.push(...posts);
          state.formInfo.status = i18next.t('successfullyAdded');
          console.log(state.formInfo.status);
          watchedForm.urlValid = true;
          console.log(state);
        }
      })
      .catch((error) => {
        state.form.urlValid = '';
        switch (error.message) {
          case 'Network Error':
            state.formInfo.status = 'Ошибка сети';
            watchedForm.urlValid = false;
            console.log('Ошибка сети');
            break;
          case 'String is not RSS':
            state.formInfo.status = 'Ресурс не содержит валидный RSS';
            watchedForm.urlValid = false;
            console.log('Ресурс не содержит валидный RSS');
            break;
          default:
            state.formInfo.status = error.errors;
            watchedForm.urlValid = false;
            console.log('default');
        }
      });

    elements.input.focus();
    elements.form.reset();
  });
};
