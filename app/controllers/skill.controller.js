const db = require("../models");
const Skill = db.skill;
const utils = require("./utils/utils.js");

exports.getAllForUser = async (req, res) => {
  console.log("It got here");
  let userId = await utils.getUserId(req);
  await Skill.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error ocurred while retrieving skill for UserId:${userId}`,
      });
    });
};

exports.getForId = async (req, res) => {
  await Skill.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error ocurred while retrieving skill`,
      });
    });
};

exports.create = async (req, res) => {
  const validation = validateSkillRequest(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  userId = await utils.getUserId(req);

  const skill = {
    name: req.body.name,
    description: req.body.description,
    proficiency_level: req.body.proficiency_level,
    userId: userId,
  };

  await Skill.create(skill)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while trying to create a new skill item",
      });
    });
};

exports.update = async (req, res) => {
  const validation = validateSkillRequest(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const skill = {
    name: req.body.name,
    description: req.body.description,
    proficiency_level: req.body.proficiency_level
  };

  await Skill.update(skill, { where: { id: req.params.id } })
    .then((data) => {
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated Skill with id of ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `Skill with id of ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update skill item with id of ${req.params.id}`,
      });
    });
};

exports.delete = async (req, res) => {
  await Skill.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data == 1) {
        res.send({ message: "Skill deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Skill with id=${req.params.id}. Maybe Skill was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update skill item with id of ${req.params.id}`,
      });
    });
};

const validateSkillRequest = (data) => {
  const errors = [];

  // Check required string fields with maximum lengths
  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.length > 45
  ) {
    errors.push(
      "Name is required and must be a string with a maximum length of 45 characters."
    );
  }

  if (
    data.description &&
    (typeof data.description !== "string" || data.description.length > 45)
  ) {
    errors.push(
      "Description must be a string with a maximum length of 45 characters."
    );
  }

  if (
    data.proficiency_level !== null &&
    (typeof data.proficiency_level !== "string" ||
    data.proficiency_level.length > 100)
  ) {
    errors.push(
      "Proficiency Level must be a string with a maximum length of 100 characters."
    );
  }

  // Return errors if validation fails
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // If no errors, return valid
  return { valid: true };
};
