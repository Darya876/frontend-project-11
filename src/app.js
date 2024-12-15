import i18next from 'i18next';
// import { watchForm, watchPosts, watchFeeds } from './view.js';
import validate from './validate.js';
import parser from './parser.js';
import locales from './locales.js';

export default () => {
  i18next.init({ lng: 'ru', debug: true, resources: { locales } });

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

  // const watchedForm = watchForm(state, elements.input);
  // const watchedPosts = watchPosts(state.data, elements.postsBox);
  // const watchedFeeds = watchFeeds(state.data.feeds, elements.feedsBox);

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
        console.log(response.data);
      });
  });
};
