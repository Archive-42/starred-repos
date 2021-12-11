const ROLES_FILE = __dirname + "/roles.txt";
const { all } = require("bluebird");
const fs = require("fs");

function checkRole(mapper, localScope, action, role) {
  for (let i of mapper) {
      console.log(i);
    if (role === i.role) {
      console.log(i);
      const { scopes } = i;
      console.log(scopes);
      if (scopes[localScope]) {
        console.log(action, scopes[localScope]);
        return scopes[localScope] && scopes[localScope].includes(action);
      }
    }
  }
  return false;
}

module.exports = (scope) => (req, res, next) => {
  const role = req.headers["x-role"];
  if (role) {
    fs.readFile(ROLES_FILE, "utf8", (err, data) => {
      if (err) {
        res.status(403).json({});
      }
      const [localScope, action] = scope.split(".");
      const mapper = JSON.parse(data.toString("utf8").replace(/^\uFEFF/, ""));
      const isAllowed = checkRole(mapper, localScope, action, role);
      if (isAllowed) {
        next();
      } else {
        res.status(403).json({});
      }
    });
  } else {
    res.status(403).json({});
  }
};
