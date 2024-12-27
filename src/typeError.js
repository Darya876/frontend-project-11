import i18next from 'i18next';

export default (error, state, watchedForm) => {
  const errorBox = document.querySelector('.feedback');
  switch (error.message) {
    case 'Ссылка должна быть валидным URL':
      state.formInfo.status = i18next.t('errors.expectedValidUrl'); // eslint-disable-line no-param-reassign
      watchedForm.urlValid = false; // eslint-disable-line no-param-reassign
      errorBox.textContent = state.formInfo.status; // eslint-disable-line no-param-reassign
      break;
    case 'Network Error':
      state.formInfo.status = i18next.t('errors.networkErr'); // eslint-disable-line no-param-reassign
      watchedForm.urlValid = false; // eslint-disable-line no-param-reassign
      errorBox.textContent = state.formInfo.status; // eslint-disable-line no-param-reassign
      break;
    case 'String is not RSS':
      state.formInfo.status = i18next.t('errors.nonValid'); // eslint-disable-line no-param-reassign
      watchedForm.urlValid = false; // eslint-disable-line no-param-reassign
      errorBox.textContent = state.formInfo.status; // eslint-disable-line no-param-reassign
      break;
    case 'RSS уже существует':
      state.formInfo.status = i18next.t('errors.alreadyExists'); // eslint-disable-line no-param-reassign
      watchedForm.urlValid = false; // eslint-disable-line no-param-reassign
      errorBox.textContent = state.formInfo.status; // eslint-disable-line no-param-reassign
      break;
    default:
      state.formInfo.status = error.errors; // eslint-disable-line no-param-reassign
      watchedForm.urlValid = false; // eslint-disable-line no-param-reassign
  }
};
