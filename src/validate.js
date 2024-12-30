import * as yup from 'yup';
import i18next from 'i18next';

export default (url, state) => {
  yup.setLocale({
    mixed: {
      notOneOf: i18next.t('errors.alreadyExists'),
    },
    string: {
      matches: i18next.t('errors.nonValid'),
      url: i18next.t('errors.expectedValidUrl'),
    },
  });

  const schema = yup.object({
    url: yup
      .string()
      .notOneOf(state.urls)
      .url()
      .required()
      .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/),
  });

  return schema.validate({ url });
};
