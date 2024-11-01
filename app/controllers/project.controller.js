const db = require("../models");
const Project = db.project;
const utils = require("./utils/utils.js");

exports.getAllForUser = async (req, res) => {
  let userId = await utils.getUserId(req);
  await Project.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error ocurred while retrieving project for UserId:${userId}`,
      });
    });
};

exports.getForId = async (req, res) => {
  await Project.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error ocurred while retrieving project`,
      });
    });
};

exports.create = async (req, res) => {
  const validation = validateProjectRequest(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  userId = await utils.getUserId(req);

  const project = {
    name: req.body.name,
    description: req.body.description,
    date_start: req.body.date_start,
    date_completed: req.body.date_completed,
    userId: userId,
  };

  await Project.create(project)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while trying to create a new project item",
      });
    });
};

exports.update = async (req, res) => {
  const validation = validateProjectRequest(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const project = {
    name: req.body.name,
    description: req.body.description,
    date_start: req.body.date_start,
    date_completed: req.body.date_completed,
  };

  await Project.update(project, { where: { id: req.params.id } })
    .then((data) => {
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated Project with id of ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `Project with id of ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update project item with id of ${req.params.id}`,
      });
    });
};

exports.delete = async (req, res) => {
  await Project.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data == 1) {
        res.send({ message: "Project deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Project with id=${req.params.id}. Maybe Project was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update project item with id of ${req.params.id}`,
      });
    });
};

const validateProjectRequest = (data) => {
  const errors = [];

  // Check required string fields with maximum lengths
  if (!data.name || typeof data.name !== "string" || data.name.length > 75) {
    errors.push(
      "Name is required and must be a string with a maximum length of 75 characters."
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

  // Check date fields in ISO format (YYYY-MM-DD)
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (
    data.date_start &&
    (typeof data.date_start !== "string" || !isoDateRegex.test(data.date_start))
  ) {
    errors.push("Date start must be in the format YYYY-MM-DD.");
  }

  if (
    data.date_completed &&
    (typeof data.date_completed !== "string" ||
      !isoDateRegex.test(data.date_completed))
  ) {
    errors.push("Date completed must be in the format YYYY-MM-DD.");
  }

  // Return errors if validation fails
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // If no errors, return valid
  return { valid: true };
};
