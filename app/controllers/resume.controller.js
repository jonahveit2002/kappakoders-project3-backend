const db = require("../models");
const Resume = db.resume;
const ResumeSection = db.resumesection;
const Template = db.template;
const utils = require("./utils/utils.js");

exports.create = async (req, res) => {
  const validation = validateResume(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  userId = await utils.getUserId(req);

  const resume = {
    ...req.body,
    userId,
  };

  await Resume.create(resume)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while trying to create a new resume",
      });
    });
};

exports.update = async (req, res) => {
  const validation = validateResume(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  userId = await utils.getUserId(req);

  console.log("testing");

  const resume = {
    ...req.body,
  };

  await Resume.update(resume, { where: { id: req.params.id } })
    .then((data) => {
      console.log("Testing");
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated Resume with id of ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `Resume with id of ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update resume with id of ${req.params.id}`,
      });
    });
};

exports.delete = async (req, res) => {
  await Resume.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data == 1) {
        res.send({ message: "Resume deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Resume with id=${req.params.id}. Maybe Resume was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to delete resume with id of ${req.params.id}`,
      });
    });
};

exports.getForId = async (req, res) => {
  try {
    console.log("Fetching resume with ID:", req.params.id);

    const data = await Resume.findOne({
      where: { id: req.params.id },
      include: [
        { model: ResumeSection, as: "resumeSection" },
        { model: Template, required: true, as: "template" },
      ],
    });

    if (!data) {
      console.log("No resume found");
      return res.status(404).send({ message: "Resume not found" });
    }

    console.log("Resume Data:", data);
    res.json(data); // Ensure you're sending JSON response
  } catch (err) {
    console.error("Error fetching resume:", err);
    res.status(500).send({
      message: err.message || `An error occurred retrieving the resume.`,
    });
  }
};


exports.getAllForUser = async (req, res) => {
  const userId = await utils.getUserId(req);

  await Resume.findAll({
    where: { userId: userId },
  })
    .then((data) => {
      // Return the data as is, including metadata
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error occurred while trying to retrieve resumes for user with id ${userId}`,
      });
    });
};

exports.getSectionsForResume = async (req, res) => {
  const resumeId = req.params.resumeId;

  try {
    const sections = await ResumeSection.findAll({ where: { resumeId } });

    // Send an empty array if no sections are found
    res.status(200).send(sections || []);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error retrieving sections for resumeId ${resumeId}.`,
    });
  }
};


const validateResume = (data) => {
  const errors = [];

  // Check if meta_data is provided and is an object
  if (!data.metadata || typeof data.metadata !== "object") {
    errors.push("metadata is required and must be an object.");
  } else {
    // Check render_fields inside metadata
    if (!Array.isArray(data.metadata.render_fields)) {
      errors.push("metadata.render_fields must be an array of strings.");
    } else {
      const validFields = [
        "award",
        "education",
        "project",
        "skill",
        "experience",
        "link"
      ];
      const invalidFields = data.metadata.render_fields.filter(
        (field) => !validFields.includes(field)
      );
      if (invalidFields.length > 0) {
        errors.push(
          `metadata.render_fields contains invalid fields: ${invalidFields.join(
            ", "
          )}. Allowed fields are: ${validFields.join(", ")}.`
        );
      }
    }

    // Check section_dividers inside metadata
    if (typeof data.metadata.section_dividers !== "boolean") {
      errors.push("metadata.section_dividers must be a boolean.");
    }
  }

  // Return errors if validation fails
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // If no errors, return valid
  return { valid: true };
};
