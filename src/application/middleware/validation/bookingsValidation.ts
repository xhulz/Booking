import { Joi } from "celebrate";

const post = Joi.object().keys({
  id_classes: Joi.string().required(),
  member: Joi.string().required(),
});

const put = Joi.object().keys({
  member: Joi.string().required(),
});

const getAll = Joi.object().keys({
  member: Joi.string().required(),
});

export { post, put, getAll };
