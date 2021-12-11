const event_guests = [
  {
    event_id: 1,
    guest_id: "2f6b5812-b10f-485c-ba1b-3d6e76c52f30",
  },
  {
    event_id: 1,
    guest_id: "fab6a193-3117-444a-9eb1-f8805f0ef1ea",
  },
  {
    event_id: 2,
    guest_id: "2f6b5812-b10f-485c-ba1b-3d6e76c52f30",
  },
  {
    event_id: 2,
    guest_id: "fab6a193-3117-444a-9eb1-f8805f0ef1ea",
  },
  {
    event_id: 3,
    guest_id: "2f6b5812-b10f-485c-ba1b-3d6e76c52f30",
  },
  {
    event_id: 3,
    guest_id: "fab6a193-3117-444a-9eb1-f8805f0ef1ea",
  },
];

exports.seed = function (knex) {
  return knex("event_guests").insert(event_guests);
};
