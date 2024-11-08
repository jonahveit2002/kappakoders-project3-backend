const db = require("../models");
const UserRole = db.userRole;
const Op = db.Sequelize.Op;

exports.findAllForUser = async (req, res) => {
  const { userId } = req.params;
  //UserRole findAll where userId is x
  // Join Role based on Id
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
