import onChange from 'on-change';
// Возможно, понадобится input в параметрах renderBox, тогда и в watchForm нужно будет поменять!
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

const renderPosts = (data, postsBox) => {
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
  card.append(ul);

  // const modalOpen = document.querySelector('.modal-open');
  // const modal = document.querySelector('#modal');
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
    // или нужно в скобках a.id (ниже)
    if (data.ui.openedLinks.includes(post.id)) {
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
      a.classList.rremove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
      // или нужно в скобках a.id (ниже)
      data.ui.openedLinks.push(post.id);
    });

    button.addEventListener('click', () => {
      modalTitle.textContent = post.title;
      modalBody.textContent = post.description;
      href.setAttribute('href', post.link);
    });
  });
  postsBox.append(card);
};

const renderFeeds = (feeds, feedsBox) => {
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
  card.append(ul);

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

  feedsBox.append(card);
};

export const watchForm = (state, input) => {
  onChange(state.form, () => {
    renderErrors(state, input);
  });
};

export const watchFeeds = (feeds, feedsBox) => {
  onChange(feeds, () => {
    renderFeeds(feeds, feedsBox);
  });
};

export const watchPosts = (data, postsBox) => {
  onChange(data, () => {
    renderPosts(data, postsBox);
  });
};