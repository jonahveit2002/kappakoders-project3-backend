const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    id: req.body.id,
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all People from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ 
    where: condition,
    include: [{
      model: db.userRole,
      as: "userRole",
      required: false,
      include: [{
        model: db.role,
        as: "role",
      }]
    }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const { admin, ...userData } = req.body;

  const transaction = await db.sequelize.transaction();
  
  try {
    // Step 1: Update user data (without the admin flag)
    await User.update(userData, {
      where: { id: id },
      transaction,
    });


    // Step 2: Handle admin role assignment if 'admin' flag is present in the request
    if (typeof admin !== 'undefined') {
      // Find the admin role to get the roleId
      const role = await Role.findOne({ where: { type: 'admin' } });
      if (!role) {
        throw new Error("Admin role not found");
      }

      if (admin) {
        // Add the admin role if 'admin' is true
        await db.userRole.upsert({
          userId: id,
          roleId: role.id,
        }, { transaction });
      } else {
        // Remove the admin role if 'admin' is false
        await db.userRole.destroy({
          where: { userId: id, roleId: role.id },
          transaction,
        });
      }
    }

    // Commit transaction if all steps succeeded
    await transaction.commit();
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    // Rollback transaction if there’s an error
    await transaction.rollback();
    res.status(500).send({ message: "Error updating user", error: error.message });
  }
};



// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
