const event_items = [
  {
    event_id: 1,
    item_name: "cake",
    user_id: "39c1471d-b4ac-4935-962d-836f01abe3d8",
  },
  {
    event_id: 1,
    item_name: "pie",
    user_id: "39c1471d-b4ac-4935-962d-836f01abe3d8",
  },
  {
    event_id: 1,
    item_name: "Fried Chicken",
    user_id: "2f6b5812-b10f-485c-ba1b-3d6e76c52f30",
  },
  {
    event_id: 1,
    item_name: "steak",
  },
  {
    event_id: 1,
    item_name: "beer",
    user_id: "fab6a193-3117-444a-9eb1-f8805f0ef1ea",
  },
  {
    event_id: 1,
    item_name: "corn",
    user_id: "fab6a193-3117-444a-9eb1-f8805f0ef1ea",
  },
  {
    event_id: 2,
    item_name: "beer",
    user_id: "39c1471d-b4ac-4935-962d-836f01abe3d8",
  },
  {
    event_id: 3,
    item_name: "beer",
    user_id: "2f6b5812-b10f-485c-ba1b-3d6e76c52f30",
  },
];

exports.seed = function (knex) {
  return knex("event_items").insert(event_items);
};
