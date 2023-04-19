import { Joi } from "celebrate";
import moment from "moment";

const post = Joi.object().keys({
  name: Joi.string().required(),
  start_date: Joi.date().min(moment().format("YYYY-MM-DD")).required(),
  end_date: Joi.date().min(Joi.ref("start_date")).required(),
  capacity: Joi.number().min(1).required(),
});

const put = Joi.object().keys({
  name: Joi.string().required(),
  class_date: Joi.date().min(moment().format("YYYY-MM-DD")).required(),
  capacity: Joi.number().min(1).required(),
});

const getAll = Joi.object().keys({
  name: Joi.string(),
  start_date: Joi.date().min(moment().format("YYYY-MM-DD")).required(),
  end_date: Joi.date().min(Joi.ref("start_date")).required(),
});

export { post, put, getAll };
