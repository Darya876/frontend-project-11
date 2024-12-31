import * as yup from 'yup';

export default (url, state) => {
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
