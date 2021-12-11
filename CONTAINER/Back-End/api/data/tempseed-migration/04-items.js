const items = [
  {
    item_name: "cake",
  },
  {
    item_name: "balloons",
  },
  {
    item_name: "pie",
  },
  {
    item_name: "chicken",
  },
  {
    item_name: "beer",
  },
  {
    item_name: "liquor",
  },
  {
    item_name: "steak",
  },
];

exports.seed = function (knex) {
  return knex("items").insert(items);
};
