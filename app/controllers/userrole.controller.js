const db = require("../models");
const UserRole = db.userRole;
const Role = db.role;

exports.findAllForUser = async (req, res) => {
  const { userId } = req.params;
  await UserRole.findAll({
    where: { userId: userId },
    include: [
      {
        model: Role,
        required: true,
        as: "role",
      },
    ],
  })
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
