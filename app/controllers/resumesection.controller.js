const db = require("../models");
const ResumeSection = db.resumesection;
const utils = require("./utils/utils.js");

exports.getAllForUser = async (req, res) => {
  const userId = await utils.getUserId(req);

  await ResumeSection.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error occurred while retrieving resume sections for userId: ${userId}`,
      });
    });
};

exports.getForId = async (req, res) => {
  await ResumeSection.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `An error occurred while retrieving the resume section.`,
      });
    });
};

exports.create = async (req, res) => {
  const validation = validateResumeSection(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const userId = await utils.getUserId(req);
  console.log("You made it here");
  console.log(userId);

  const resumeSection = {
    section_type: req.body.section_type,
    section_id: req.body.section_id,
    section_title: req.body.section_title,
    userId: userId,
  };

  await ResumeSection.create(resumeSection)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error occurred while trying to create a new resume section.`,
      });
    });
};

exports.update = async (req, res) => {
  const validation = validateResumeSection(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const resumeSection = {
    section_type: req.body.section_type,
    section_id: req.body.section_id,
    section_title: req.body.section_title,
  };

  await ResumeSection.update(resumeSection, { where: { id: req.params.id } })
    .then((data) => {
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated resume section with id ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `Resume section with id ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error occurred while trying to update the resume section with id ${req.params.id}.`,
      });
    });
};

exports.delete = async (req, res) => {
  await ResumeSection.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data == 1) {
        res.send({ message: "Resume section deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete resume section with id=${req.params.id}. Maybe it was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error occurred while trying to delete the resume section with id ${req.params.id}.`,
      });
    });
};

const validateResumeSection = (data) => {
  const errors = [];

  // Validate section_type
  const validSectionTypes = [
    "education",
    "experience",
    "project",
    "skill",
    "award",
  ];
  if (!data.section_type || !validSectionTypes.includes(data.section_type)) {
    errors.push(
      "Section type is required and must be one of: education, experience, project, skill, award."
    );
  }

  // Validate section_id
  if (
    typeof data.section_id !== "number" ||
    data.section_id <= 0 ||
    !Number.isInteger(data.section_id)
  ) {
    errors.push("Section ID is required and must be a positive integer.");
  }

  // Validate section_title
  if (
    !data.section_title ||
    typeof data.section_title !== "string" ||
    data.section_title.length > 75
  ) {
    errors.push(
      "Section title is required and must be a string with a maximum length of 75 characters."
    );
  }

  // Return validation result
  return errors.length > 0 ? { valid: false, errors } : { valid: true };
};
