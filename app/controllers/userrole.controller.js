const db = require("../models");
const UserRole = db.userRole;
const Op = db.Sequelize.Op;

export const findAllForUser = async (req, res) => {
  const { userId } = req.params;

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
  }  catch (error) {
    console.error("Error fetching user roles:", error);
    res.status(500).json({ message: "Error fetching user roles" });
  }

};
