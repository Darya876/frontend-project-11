import i18next from 'i18next';

export default (error) => {
  switch (error.message) {
    case 'Ссылка должна быть валидным URL':
      return i18next.t('errors.expectedValidUrl');
    case 'Network Error':
      return i18next.t('errors.networkErr');
    case 'String is not RSS':
      return i18next.t('errors.nonValid');
    case 'RSS уже существует':
      return i18next.t('errors.alreadyExists');
    default:
      return error.errors;
  }
};
