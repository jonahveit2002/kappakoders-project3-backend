const db = require("../models");
const Experience = db.experience;
const utils = require("./utils/utils.js");

exports.getAllForUser = async (req, res) => {
  let userId = await utils.getUserId(req);
  await Experience.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error ocurred while retrieving experience for UserId:${userId}`,
      });
    });
};

exports.getForId = async (req, res) => {
  await Experience.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error ocurred while retrieving experience`,
      });
    });
};

exports.create = async (req, res) => {
  const validation = validateExperienceRequest(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  userId = await utils.getUserId(req);

  const experience = {
    employer: req.body.employer,
    position_title: req.body.position_title,
    date_start: req.body.date_start,
    date_end: req.body.date_end,
    userId: userId,
  };

  await Experience.create(experience)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while trying to create a new experience item",
      });
    });
};

exports.update = async (req, res) => {
  const validation = validateExperienceRequest(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const experience = {
    employer: req.body.employer,
    position_title: req.body.position_title,
    date_start: req.body.date_start,
    date_end: req.body.date_end,
  };

  await Experience.update(experience, { where: { id: req.params.id } })
    .then((data) => {
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated Experience with id of ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `Experience with id of ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update experience item with id of ${req.params.id}`,
      });
    });
};

exports.delete = async (req, res) => {
  await Experience.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data == 1) {
        res.send({ message: "Experience deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Experience with id=${req.params.id}. Maybe Experience was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update experience item with id of ${req.params.id}`,
      });
    });
};

const validateExperienceRequest = (data) => {
  const errors = [];

  // Check required string fields with maximum lengths
  if (
    !data.employer ||
    typeof data.employer !== "string" ||
    data.employer.length > 75
  ) {
    errors.push(
      "Employer is required and must be a string with a maximum length of 75 characters."
    );
  }

  if (
    !data.position_title ||
    typeof data.position_title !== "string" ||
    data.position_title.length > 100
  ) {
    errors.push(
      "Position title is required and must be a string with a maximum length of 100 characters."
    );
  }

  // Check required date fields in ISO format (YYYY-MM-DD)
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (
    !data.date_start ||
    typeof data.date_start !== "string" ||
    !isoDateRegex.test(data.date_start)
  ) {
    errors.push("Date start is required and must be in the format YYYY-MM-DD.");
  }

  if (
    !data.date_end ||
    typeof data.date_end !== "string" ||
    !isoDateRegex.test(data.date_end)
  ) {
    errors.push("Date end is required and must be in the format YYYY-MM-DD.");
  }

  // Return errors if validation fails
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // If no errors, return valid
  return { valid: true };
};
