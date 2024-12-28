import i18next from 'i18next';
import watchState from './watchState.js';
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
    .then(() => {
      const elements = {
        feedsBox: document.querySelector('.feeds'),
        postsBox: document.querySelector('.posts'),
        form: document.querySelector('form'),
        input: document.querySelector('#url-input'),
        errorBox: document.querySelector('.feedback'),
        modalTitle: document.querySelector('.modal-title'),
        modalBody: document.querySelector('.modal-body'),
        href: document.querySelector('.full-article'),
      };

      const state = {
        data: {
          feeds: [],
          posts: [],
          openedLinks: [],
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
              console.log(watchedState);
              const { feed, posts } = parserRSS(response.data.contents);
              watchedState.data.feeds.unshift(feed);
              watchedState.data.posts.unshift(...posts);
              watchedState.form.status = i18next.t('successfullyAdded');
              elements.errorBox.textContent = watchedState.form.status;
            }
          })
          .catch((error) => {
            watchedState.form.status = typeError(error, watchedState);
          });
      });

      elements.postsBox.addEventListener('click', (e) => {
        const { id } = e.target.dataset;
        watchedState.data.openedLinks.push(id);

        const postToFind = watchedState.data.posts.find((post) => post.id === id);
        elements.modalTitle.textContent = postToFind.title;
        elements.modalBody.textContent = postToFind.description;
        elements.href.setAttribute('href', postToFind.link);

        const currentPost = elements.postsBox.querySelector(`a[data-id="${postToFind.id}"]`);
        if (watchedState.data.openedLinks.includes(postToFind.id)) {
          currentPost.classList.remove('fw-bold');
          currentPost.classList.add('fw-normal', 'link-secondary');
        }
      });

      updateRSS(watchedState, getData, parserRSS);
    });
};

export default app;
