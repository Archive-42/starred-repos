exports.seed = function (knex) {
  return knex("users").insert([
    {
      user_id: "39c1471d-b4ac-4935-962d-836f01abe3d8",
      username: "Admin",
      password: "$2a$08$CxTumKQQajtAB0sJg2vrgOWnqHrXKr1WsTyODQgmgGfsxdU.qw1nm",
    },
    {
      user_id: "2f6b5812-b10f-485c-ba1b-3d6e76c52f30",
      username: "Group1",
      password: "$2a$08$Z2d4vVG7HOXiZmGXBMk2zu5G.nhBTomfbiD67/w7o1FzXLCJFsbB2",
    },
    {
      user_id: "fab6a193-3117-444a-9eb1-f8805f0ef1ea",
      username: "Daniel",
      password: "$2a$08$I71hk98htKJmy5ZoELjpZ.uTzxxbYHkysKh6zGCyvc3qzSKwLITMm",
    },
  ]);
};
