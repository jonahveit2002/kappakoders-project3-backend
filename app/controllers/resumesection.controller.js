const db = require("../models");
const ResumeSection = db.resumesection;

exports.getAllForResumeId = async (req, res) => {
  await ResumeSection.findAll({ where: { resumeId: req.params.resumeId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while trying to find ResumeSections with id of ${req.params.resumeId}`,
      });
    });
};

exports.create = async (req, res) => {
  const validation = validateResumeSection(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const resumeSection = {
    ...req.body,
  };

  await ResumeSection.create(resumeSection)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Something went wrong will trying to create a Resume Section",
      });
    });
};

exports.update = async (req, res) => {
  const validation = validateResumeSection(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const resumeSection = {
    ...req.body,
  };

  await ResumeSection.update(resumeSection, { where: { id: req.params.id } })
    .then((data) => {
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated ResumeSection with id of ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `ResumeSection with id of ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        message:
          err.message ||
          "Something went wrong will trying to update a Resume Section",
      })
    );
};

exports.delete = async (req, res) => {
  await ResumeSection.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data == 1) {
        res.send({ message: "ResumeSection deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete ResumeSection with id=${req.params.id}. Maybe ResumeSection was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to delete ResumeSection with id of ${req.params.id}`,
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

  // Validate section_id (required and must be a positive integer)
  if (
    typeof data.section_id !== "number" ||
    data.section_id <= 0 ||
    !Number.isInteger(data.section_id)
  ) {
    errors.push("Section ID is required and must be a positive integer.");
  }

  // Validate section_title (required and must be a string with a max length of 75)
  if (
    !data.section_title ||
    typeof data.section_title !== "string" ||
    data.section_title.length > 75
  ) {
    errors.push(
      "Section title is required and must be a string with a maximum length of 75 characters."
    );
  }

  // Return errors if validation fails
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // If no errors, return valid
  return { valid: true };
};
