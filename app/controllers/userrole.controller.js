const db = require("../models");
const UserRole = db.userRole;
const Role = db.role;

const getAllForUser = async (req, res) => {
  const { userId } = req.params;


  const user = await Users.findOne({
    attributes: [
      ['id', 'userId'],
      ['fName', 'firstName'],
      ['lName', 'lastName'],
      ['email', 'userEmail'],
      ['phoneNum', 'phoneNum'],
    ],
    include: [
      {
        model: UserRoles,
        attributes: [],
        include: [
          {
            model: Roles,
            attributes: [['type', 'roleId']],
          },
        ],
      },
    ],
    where: {
      id: userId,
    },
    raw: true,
  });

};

module.exports = { getAllForUser };
