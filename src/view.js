import onChange from 'on-change';

const renderErrors = (state, input) => {
  const feedback = state.formInfo.status;
  const errorBox = document.querySelector('.feedback');

  if (state.form.urlValid === true) {
    errorBox.classList.replace('text-danger', 'text-success');
    input.classList.remove('is-invalid');
  } else if (state.form.urlValid === false) {
    errorBox.classList.replace('text-success', 'text-danger');
    input.classList.add('is-invalid');
  }

  errorBox.textContent = feedback;
};

const renderPosts = (data) => {
  const postsBox = document.querySelector('.posts');
  postsBox.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4'); // h2 or h4???
  cardTitle.textContent = 'Посты';
  cardBody.append(cardTitle);
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const modalOpen = document.querySelector('body');
  const modal = document.querySelector('#modal');
  const btnSec = document.querySelector('.btn-secondary');
  const btnClose = document.querySelector('.btn-close');
  const btnPrim = document.querySelector('.btn-primary');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const href = document.querySelector('.full-article');

  data.posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', post.link);
    a.setAttribute('data-id', post.id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    if (data.ui.openedLinks.includes(a.id)) {
      a.classList.add('fw-normal', 'link-secondary');
    } else {
      a.classList.add('fw-bold');
    }

    a.textContent = post.title;

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', post.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.textContent = 'Просмотр';
    li.append(a);
    li.append(button);

    ul.append(li);

    a.addEventListener('click', () => {
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
      data.ui.openedLinks.push(a.id);
      window.open(post.link); // не открывается ссылка (так как в post.link ничего не добавляется)
    });

    button.addEventListener('click', () => {
      modalTitle.textContent = post.title;
      modalBody.textContent = post.description;
      console.log(post);
      href.setAttribute('href', post.link);

      modalOpen.classList.add('modal-open');
      modalOpen.setAttribute('style', 'overflow: hidden; padding-right: 15px;');

      modal.setAttribute('role', 'dialog');
      modal.classList.add('show');
      modal.removeAttribute('aria-hidden');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('style', 'display: block;');

      btnSec.addEventListener('click', () => {
        modalOpen.classList.remove('modal-open');
        modalOpen.setAttribute('style', '');
        modal.removeAttribute('role');
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.setAttribute('style', 'display: none;');
      });

      btnClose.addEventListener('click', () => {
        modalOpen.classList.remove('modal-open');
        modalOpen.setAttribute('style', '');
        modal.removeAttribute('role');
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.setAttribute('style', 'display: none;');
      })

      btnPrim.addEventListener('click', () => {
        window.open(post.link)
      })

      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
    });
  });

  card.append(ul);
  postsBox.append(card);
};

const renderFeeds = (feeds) => {
  const feedsBox = document.querySelector('.feeds');
  feedsBox.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Фиды';
  cardBody.append(cardTitle);
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feed.title;
    li.append(h3);
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feed.description;
    li.append(p);

    ul.append(li);
  });

  card.append(ul);
  feedsBox.append(card);
};

export const watchForm = (state, input) => onChange(state.form, () => renderErrors(state, input));

export const watchFeeds = (feeds, feedsBox) => onChange(feeds, () => renderFeeds(feeds, feedsBox));

export const watchPosts = (data) => onChange(data, () => renderPosts(data));
