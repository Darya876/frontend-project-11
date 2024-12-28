import i18next from 'i18next';

export default (error, watchedState) => {
  const errorBox = document.querySelector('.feedback');
  switch (error.message) {
    case 'Ссылка должна быть валидным URL':
      watchedState.form.status = i18next.t('errors.expectedValidUrl'); // eslint-disable-line no-param-reassign
      watchedState.form.urlValid = false; // eslint-disable-line no-param-reassign
      errorBox.textContent = watchedState.form.status; // eslint-disable-line no-param-reassign
      break;
    case 'Network Error':
      watchedState.form.status = i18next.t('errors.networkErr'); // eslint-disable-line no-param-reassign
      watchedState.form.urlValid = false; // eslint-disable-line no-param-reassign
      errorBox.textContent = watchedState.form.status; // eslint-disable-line no-param-reassign
      break;
    case 'String is not RSS':
      watchedState.form.status = i18next.t('errors.nonValid'); // eslint-disable-line no-param-reassign
      watchedState.form.urlValid = false; // eslint-disable-line no-param-reassign
      errorBox.textContent = watchedState.form.status; // eslint-disable-line no-param-reassign
      break;
    case 'RSS уже существует':
      watchedState.form.status = i18next.t('errors.alreadyExists'); // eslint-disable-line no-param-reassign
      watchedState.form.urlValid = false; // eslint-disable-line no-param-reassign
      errorBox.textContent = watchedState.form.status; // eslint-disable-line no-param-reassign
      break;
    default:
      watchedState.form.status = error.errors; // eslint-disable-line no-param-reassign
      watchedState.form.urlValid = false; // eslint-disable-line no-param-reassign
  }
};
