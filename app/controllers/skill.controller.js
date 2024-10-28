const db = require("../models");
const Skill = db.skill;
const Op = db.Sequelize.Op;
// Create and Save a new skill
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Skill
  const skill = {
    user_Id: req.body.user_Id,
    name: req.body.name,
    description: req.body.description,
    proficiency_level: req.body.proficiency_level
  };
  // Save skill in the database
  Skill.create(skill)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the skill.",
      });
    });
};
// Retrieve all skills from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Skill.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving skills.",
      });
    });
};

// Find a single skills with an id
exports.findAllForUser = (req, res) => {
  const user_Id = req.params.user_Id;
  Skill.findAll({ where: { user_Id: user_Id } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find skills for user with id=${user_Id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving skills for user with id=" + user_Id,
      });
    });
};
// Find a single skill with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Skill.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find skill with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving skill with id=" + id,
      });
    });
};
// Update a skill by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Skill.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "skill was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Skill with id=${id}. Maybe skill was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating skill with id=" + id,
      });
    });
};
// Delete a Skill with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Skill.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "skill was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete skill with id=${id}. Maybe skill was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete skill with id=" + id,
      });
    });
};
// Delete all Skills from the database.
exports.deleteAll = (req, res) => {
  Skill.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} skills were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all skills.",
      });
    });
};