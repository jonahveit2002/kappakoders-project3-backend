const db = require("../models");
const ResumeSection = db.resumesection;
const utils = require("./utils/utils.js");

exports.getAllForResume = async (req, res) => {
  const userId = await utils.getUserId(req);
  console.log("I got here");

  try {
    const data = await ResumeSection.findAll({ where: { resumeId:  req.params.resumeId} });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || `An error occurred while retrieving resume sections for userId: ${userId}`,
    });
  }
};

exports.getForId = async (req, res) => {
  try {
    const data = await ResumeSection.findOne({ where: { section_id: req.params.sectionId } });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Resume section with id ${req.params.section_id} not found.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `An error occurred while retrieving the resume section.`,
    });
  }
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

  // Add resumeId to the data before creating the section
  const resumeSection = {
    section_type: req.body.section_type,
    section_title: req.body.section_title,
    resumeId: req.body.resumeId, // Include resumeId here
    userId: userId,
  };

  try {
    const data = await ResumeSection.create(resumeSection); // Sequelize auto-generates section_id
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || `An error occurred while creating the resume section.`,
    });
  }
};

exports.update = async (req, res) => {
  const validation = validateResumeSection(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  // Include resumeId in case it's needed for updates (you can skip this if not necessary)
  const resumeSection = {
    section_type: req.body.section_type,
    section_title: req.body.section_title,
    resumeId: req.body.resumeId, // Include resumeId here if you want to update it
  };

  try {
    const [updatedRows] = await ResumeSection.update(resumeSection, { where: { section_id: req.params.sectionId } });
    if (updatedRows > 0) {
      res.send({
        message: `Successfully updated resume section with id ${req.params.sectionId}!`,
      });
    } else {
      res.status(404).send({
        message: `Resume section with id ${req.params.sectionId} doesn't exist!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `An error occurred while trying to update the resume section with id ${req.params.id}.`,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedRows = await ResumeSection.destroy({ where: { section_id: req.params.section_id } });
    if (deletedRows === 1) {
      res.send({ message: "Resume section deleted successfully!" });
    } else {
      res.status(404).send({
        message: `Cannot delete resume section with id=${req.params.section_id}. Maybe it was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `An error occurred while trying to delete the resume section with id ${req.params.section_id}.`,
    });
  }
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
    "link",
    "professional_summary",
  ];
  if (!data.section_type || !validSectionTypes.includes(data.section_type)) {
    errors.push(
      "Section type is required and must be one of: education, experience, project, skill, award, link, or professional_summary"
    );
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
