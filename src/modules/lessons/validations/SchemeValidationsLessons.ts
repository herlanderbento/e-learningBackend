import * as Yup from "yup";

export const SchemeValidateCreated = Yup.object().shape({
  title: Yup.string().required(),
  video: Yup.string().required(),
  module_id: Yup.string().required(),
});

export const SchemeValidateUpdated = Yup.object().shape({
  title: Yup.string().required(),
  module_id: Yup.string().required(),
});
