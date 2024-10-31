const db = require("../models");
const Education = db.education;
const utils = require("./utils/utils.js");

exports.getAllForUser = async (req, res) => {
  let userId = await utils.getUserId(req);
  await Education.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error ocurred while retrieving education for UserId:${userId}`,
      });
    });
};

exports.getForId = async (req, res) => {
  await Education.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error ocurred while retrieving education`,
      });
    });
};

exports.create = async (req, res) => {
  const validation = validateEducationRequest(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  userId = await utils.getUserId(req);

  const education = {
    institution: req.body.institution,
    credential_earned: req.body.credential_earned,
    date_from: req.body.date_from,
    date_to: req.body.date_to,
    gpa: req.body.gpa,
    coursework: req.body.coursework,
    userId: userId,
  };

  await Education.create(education)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while trying to create a new education item",
      });
    });
};

exports.update = async (req, res) => {
  const validation = validateEducationRequest(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const education = {
    institution: req.body.institution,
    credential_earned: req.body.credential_earned,
    date_from: req.body.date_from,
    date_to: req.body.date_to,
    gpa: req.body.gpa,
    coursework: req.body.coursework,
  };

  await Education.update(education, { where: { id: req.params.id } })
    .then((data) => {
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated Education with id of ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `Education with id of ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update education item with id of ${req.params.id}`,
      });
    });
};

exports.delete = async (req, res) => {
  await Education.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data == 1) {
        res.send({ message: "Education deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Education with id=${req.params.id}. Maybe Education was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update education item with id of ${req.params.id}`,
      });
    });
};

const validateEducationRequest = (data) => {
  const errors = [];

  // Check required string fields with maximum lengths
  if (
    !data.institution ||
    typeof data.institution !== "string" ||
    data.institution.length > 75
  ) {
    errors.push(
      "Institution is required and must be a string with a maximum length of 75 characters."
    );
  }

  if (
    !data.credential_earned ||
    typeof data.credential_earned !== "string" ||
    data.credential_earned.length > 100
  ) {
    errors.push(
      "Credential earned is required and must be a string with a maximum length of 100 characters."
    );
  }

  if (!data.gpa || typeof data.gpa !== "string" || data.gpa.length > 25) {
    errors.push(
      "GPA is required and must be a string with a maximum length of 25 characters."
    );
  }

  // Check required date fields in ISO format (YYYY-MM-DD)
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (
    !data.date_from ||
    typeof data.date_from !== "string" ||
    !isoDateRegex.test(data.date_from)
  ) {
    errors.push("Date from is required and must be in the format YYYY-MM-DD.");
  }

  if (
    !data.date_to ||
    typeof data.date_to !== "string" ||
    !isoDateRegex.test(data.date_to)
  ) {
    errors.push("Date to is required and must be in the format YYYY-MM-DD.");
  }

  // Check optional coursework field (string or null)
  if (
    data.coursework !== undefined &&
    data.coursework !== null &&
    typeof data.coursework !== "string"
  ) {
    errors.push("Coursework must be a string if provided.");
  }

  // Return errors if validation fails
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // If no errors, return valid
  return { valid: true };
};
