const db = require("../models");
const ProfessionalSummary = db.professionalSummary;
const utils = require("./utils/utils.js");

exports.getAllForUser = async (req, res) => {
  let userId = await utils.getUserId(req);
  await ProfessionalSummary.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error ocurred while retrieving Professional Summary for UserId:${userId}`,
      });
    });
};

exports.getProfessionalSummaryForResume = async (req, res) => {
  await ProfessionalSummary.findOne({
    where: { resumeId: req.params.resumeId },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({});
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error ocurred while retrieving Professional Summary for resumeId:${req.params.resumeId}`,
      });
    });
};

exports.create = async (req, res) => {
  const validation = validateProfessionalSummary(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  userId = await utils.getUserId(req);

  const professionalSummary = {
    ...req.body,
    userId: userId,
  };

  await ProfessionalSummary.create(professionalSummary)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while trying to create a new professional summary item",
      });
    });
};

exports.update = async (req, res) => {
  const validation = validateProfessionalSummary(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const professionalSummary = {
    ...req.body,
  };

  await ProfessionalSummary.update(professionalSummary, {
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated Professional Summary with id of ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `Professional Summary with id of ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update professional summary item with id of ${req.params.id}`,
      });
    });
};

exports.delete = async (req, res) => {
  await ProfessionalSummary.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data == 1) {
        res.send({ message: "Professional Summary deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Professional Summary with id=${req.params.id}. Maybe Professional Summary was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update professional summary item with id of ${req.params.id}`,
      });
    });
};

const validateProfessionalSummary = (data) => {
  const errors = [];

  // Check required string fields with maximum lengths
  if (!data.summary || typeof data.summary !== "string" || data.summary == "") {
    errors.push("Summary is required and must be a string that is not empty");
  }

  // Return errors if validation fails
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // If no errors, return valid
  return { valid: true };
};
