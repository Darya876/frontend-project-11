export const changeForm = (state) => {
  const errorBox = document.querySelector('.feedback');
  const input = document.querySelector('#url-input');
  const form = document.querySelector('form');

  if (state.form.urlValid === true) {
    errorBox.classList.replace('text-danger', 'text-success');
    input.classList.remove('is-invalid');
    input.focus();
    form.reset();
  }
  if (state.form.urlValid === false) {
    errorBox.classList.replace('text-success', 'text-danger');
    input.classList.add('is-invalid');
    input.focus();
    input.value = state.form.url;
  }
};

export const changePosts = (state) => {
  const postsBox = document.querySelector('.posts');
  postsBox.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Посты';
  cardBody.append(cardTitle);
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  state.data.posts.forEach((post) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', post.link);
    a.setAttribute('data-id', post.id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    if (state.data.openedLinks.includes(post.id)) {
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
  });

  card.append(ul);
  postsBox.append(card);
};

export const changeFeeds = (state) => {
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

  state.data.feeds.forEach((feed) => {
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

export const changeModal = (state) => {
  const postToFind = state.data.posts.find((post) => post.id === state.data.modalId);
  const postsBox = document.querySelector('.posts');

  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const href = document.querySelector('.full-article');

  modalTitle.textContent = postToFind.title;
  modalBody.textContent = postToFind.description;
  href.setAttribute('href', postToFind.link);

  const currentPost = postsBox.querySelector(`a[data-id="${postToFind.id}"]`);
  if (state.data.openedLinks.includes(postToFind.id)) {
    currentPost.classList.remove('fw-bold');
    currentPost.classList.add('fw-normal', 'link-secondary');
  }
};
