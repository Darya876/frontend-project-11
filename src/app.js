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

    validate(url, state)
      .then(() => parser(url))
      .then((response) => {
        if (!response.data.contents.includes('</rss>')) {
          throw new Error('String is not RSS');
        }

        state.formInfo.urls.push(url);
        if (response.status >= 200 && response.status < 300) {
          const { feed, posts } = parserRSS(
            response.data.contents,
          );
          watchedFeeds.unshift(feed);
          watchedPosts.posts.unshift(...posts);
          state.formInfo.status = i18next.t('successfullyAdded');
          elements.errorBox.textContent = state.formInfo.status;
          watchedForm.urlValid = true;
          elements.input.focus();
          elements.form.reset();
        }
      })
      .then(() => setTimeout(() => updateRSS(state, parser, parserRSS, watchedPosts), 5000))
      .catch((error) => {
        // state.form.urlValid = '';
        console.log(error.message);
        switch (error.message) {
          case 'Ссылка должна быть валидным URL':
            state.formInfo.status = 'Ссылка должна быть валидным URL';
            watchForm.urlValid = false;
            elements.errorBox.textContent = state.formInfo.status;
            break;
          case 'Network Error':
            state.formInfo.status = 'Ошибка сети';
            watchedForm.urlValid = false;
            elements.errorBox.textContent = state.formInfo.status;
            break;
          case 'String is not RSS':
            state.formInfo.status = 'Ресурс не содержит валидный RSS';
            watchedForm.urlValid = false;
            elements.errorBox.textContent = state.formInfo.status;
            break;
          default:
            state.formInfo.status = error.errors;
            watchedForm.urlValid = false;
        }
      });
  });
};
