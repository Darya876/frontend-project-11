import i18next from 'i18next';
import { watchForm, watchPosts, watchFeeds } from './view.js';
import validate from './validate.js';
import parser from './parser.js';
import ru from './ru.js';
import parserRSS from './parserRSS.js';
import updateRSS from './updateRSS.js';

export default () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: { ru },
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
  const watchedPosts = watchPosts(state.data);
  const watchedFeeds = watchFeeds(state.data.feeds);

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = elements.input.value;
    watchedForm.url = url;

    if (state.formInfo.urls.length === 0) {
      updateRSS(state, parser, parserRSS, watchedPosts, watchedFeeds);
    }

    validate(url, state)
      .then(() => parser(url))
      .then((response) => {
        if (!response.data.contents.includes('</rss>')) {
          throw new Error('String is not RSS');
        }
        state.formInfo.urls.push(url);
        if (response.status >= 200 && response.status < 300) {
          console.log(response.status);
          const { feed, posts } = parserRSS(
            response.data.contents,
            state.data.posts.length,
          );
          watchedFeeds.push(feed);
          watchedPosts.posts.unshift(...posts);
          state.formInfo.status = i18next.t('successfullyAdded');
          watchedForm.urlValid = true;
          elements.input.focus();
          elements.form.reset();
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
  });
};
