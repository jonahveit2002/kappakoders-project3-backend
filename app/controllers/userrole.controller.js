const db = require("../models");
const UserRole = db.userRole;
const Op = db.Sequelize.Op;

exports.findAllForUser = async (req, res) => {
  const { userId } = req.params;
  await UserRole.findAllRolesForUser(userId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user roles.",
      });
    });
};
