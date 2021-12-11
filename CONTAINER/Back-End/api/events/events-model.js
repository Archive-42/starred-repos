const db = require("../data/db-config");

const getAll = async () => {
  const result = await db("events as e")
    .select(
      "event_date",
      "event_id",
      "event_location",
      "event_time",
      "event_name",
      "u.username as organizer"
    )
    .join("users as u", "u.user_id", "e.owner_id");

  for (let event of result) {
    const guestsList = await guests(event.event_id);
    const itemsList = await items(event.event_id);
    event.items = itemsList;
    event.guests = guestsList;
  }
  return result;
};

const getById = (event_id) => {
  return db("events as e")
    .select(
      "event_date",
      "event_id",
      "event_location",
      "event_time",
      "event_name",
      "u.username as organizer"
    )
    .join("users as u", "u.user_id", "e.owner_id")
    .where({ event_id });
};

const getByOwnerId = async (user_id) => {
  const result = await db("events as e")
    .select(
      "event_date",
      "event_id",
      "event_location",
      "event_time",
      "event_name",
      "u.username as organizer"
    )
    .join("users as u", "u.user_id", "e.owner_id")
    .where("e.owner_id", user_id);

  for (let event of result) {
    const guestsList = await guests(event.event_id);
    const itemsList = await items(event.event_id);
    event.items = itemsList;
    event.guests = guestsList;
  }
  return result;
};

const getByGuestId = async (user_id) => {
  const result = await db("events as e")
    .select(
      "event_date",
      "e.event_id",
      "event_location",
      "event_time",
      "event_name",
      "u.username as guest"
    )
    .join("event_guests as eg", "eg.event_id", "e.event_id")
    .join("users as u", "u.user_id", "eg.guest_id")
    .where("eg.guest_id", user_id);
  for (let event of result) {
    const guestsList = await guests(event.event_id);
    const itemsList = await items(event.event_id);
    event.items = itemsList;
    event.guests = guestsList;
  }
  return result;
};

const getAllEventGuests = (event_id) => {
  return db("events as e")
    .select("e.event_name", "eg.response", "u.username as guest")
    .join("event_guests as eg", "eg.event_id", "e.event_id")
    .join("users as u", "u.user_id", "eg.guest_id")
    .where("e.event_id", event_id);
};

const getBy = (filter) => {
  return db("events").where(filter);
};

const add = async (event) => {
  const [{ event_id }] = await db("events").insert(event, ["event_id"]);
  return await getById(event_id);
};

const addGuest = async (event_id, guest_id) => {
  await db("event_guests").insert({ event_id, guest_id });
  return guests(event_id);
};

const addItem = async (event_id, item) => {
  await db("event_items").insert(item);
  return items(event_id);
};

const editEvent = async (event_id, changes) => {
  await db("events").where({ event_id }).update(changes);
  return getById(event_id);
};

const editResponse = async (event_id, user) => {
  const { guest_id } = user;
  await db("event_guests").where({ event_id, guest_id }).update(user);
  return guests(event_id);
};

const editItems = async (event_id, user) => {
  const { event_item_id, item_name } = user;
  await db("event_items")
    .where({ event_id, event_item_id })
    .update({ item_name });
  return items(event_id);
};

const deleteEvent = async (event_id) => {
  const deletedEvent = await getById(event_id);
  await db("events").where({ event_id }).del();
  return deletedEvent;
};

const deleteItem = async (event_id, item) => {
  const { item_name } = item;
  await db("event_items").where({ event_id, item_name }).del();
  return items(event_id);
};

const deleteGuest = async (event_id, guest) => {
  const { guest_id } = guest;
  await db("event_guests").where({ event_id, guest_id }).del();
  const guests = await getAllEventGuests(event_id);
  return guests;
};

const items = async (event_id) => {
  const result = await db("event_items as ei")
    .select("ei.item_name", "u.username as responsible_for", "ei.event_item_id")
    .leftJoin("users as u", "ei.user_id", "u.user_id")
    .where("ei.event_id", event_id);
  // for (let object of result) {
  //   if (object.responsible_for === null) {
  //     object.responsible_for = "vacant";
  //   }
  // }
  return result;
};

const guests = (event_id) => {
  return db("event_guests as eg")
    .select("u.username", "eg.response")
    .join("users as u", "u.user_id", "eg.guest_id")
    .where("eg.event_id", event_id);
};

module.exports = {
  getAll,
  getById,
  getBy,
  getByGuestId,
  getAllEventGuests,
  getByOwnerId,
  add,
  addGuest,
  addItem,
  editEvent,
  editResponse,
  editItems,
  deleteEvent,
  deleteItem,
  deleteGuest,
};
