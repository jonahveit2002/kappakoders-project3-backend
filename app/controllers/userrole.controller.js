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


  
  try {
    const userRoles = await db.sequelize.query(
      `SELECT
        users.id AS userId,
        users.fName AS firstName,
        users.lName AS lastName,
        users.email AS userEmail,
        users.phoneNum AS phoneNum,
        roles.type as roleId
        FROM 
          users
        JOIN
          userroles ON users.id = userroles.userId
        JOIN 
          roles ON userroles.userId = roles.id
        WHERE
          users.id = :userId;`,
          {
            replacements: {userId},
            type: db.Sequelize.QueryTypes.SELECT
          }
    );
    res.status(200).json(userRoles);
    res.send(userRoles);
  }  catch (error) {
    console.error("Error fetching user roles:", error);
    res.status(500).json({ message: "Error fetching user roles" });
  }

};

module.exports = { getAllForUser };
