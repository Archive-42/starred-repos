const yup = require("yup");

const authSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(5, "username must be at least 5 chars")
    .max(40, "username is too long")
    .required("username is required"),
  password: yup.string().trim().required("password is required"),
});
const loginSchema = yup.object({
  username: yup.string().trim().required("username is required"),
  password: yup.string().trim().required("password is required"),
});

const eventSchema = yup.object({
  event_name: yup.string().required("missing event name"),
  event_date: yup.string().required("missing event date"),
  event_time: yup.string().required("missing event time"),
  event_location: yup.string().required("missing event location"),
  owner_id: yup.string().required("missing owner_id"),
});

const itemSchema = yup.object({
  item_name: yup.string().required("item_name required"),
  user_id: yup.string(),
});

const guestSchema = yup.object({
  guest_id: yup.string().required("guest_id required"),
  response: yup.string(),
});

module.exports = {
  authSchema,
  eventSchema,
  loginSchema,
  itemSchema,
  guestSchema,
};
