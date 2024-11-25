const db = require("../../models"); // Adjust the path if necessary
const ExperienceItem = db.experienceItem;
const Experience = db.experience;

// Create and Save a new experienceItem
exports.create = async (req, res) => {
    try {
        const { experience_id } = req.body;
        const { order } = req.body;
        const { sectionId } = req.params;

        if (!experience_id || !sectionId) {
            return res.status(400).send({ message: "experience ID and Section ID are required!" });
        }

        const experienceItem = await ExperienceItem.create({ experience_id, order, section_id: sectionId });
        res.status(201).send(experienceItem);
    } catch (err) {
        console.error("Error creating experienceItem:", err);
        res.status(500).send({ message: err.message || "Some error occurred while creating the experienceItem." });
    }

    const experienceItem = await ExperienceItem.create({
      experience_id,
      section_id: sectionId,
    });
    res.status(201).send(experienceItem);
  } catch (err) {
    console.error("Error creating experienceItem:", err);
    res
      .status(500)
      .send({
        message:
          err.message ||
          "Some error occurred while creating the experienceItem.",
      });
  }
};

// Retrieve all experienceItems for a specific section
exports.findAll = async (req, res) => {
  console.log("Backend find all experienceitems");
  try {
    const { sectionId } = req.params;
    const experienceItems = await ExperienceItem.findAll({
      where: { section_id: sectionId },
      include: [
        {
          model: Experience,
          as: "experience",
        },
      ],
    });
    res.status(200).send(experienceItems);
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message ||
          "Some error occurred while retrieving ExperienceItems.",
      });
  }
};

// Retrieve a single ExperienceItem by ID
exports.findOne = async (req, res) => {
  try {
    const { item_id } = req.params;
    const experienceItem = await ExperienceItem.findByPk(item_id);

    if (!experienceItem) {
      return res
        .status(404)
        .send({ message: `ExperienceItem with id=${item_id} not found.` });
    }

    res.status(200).send(experienceItem);
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message || `Error retrieving ExperienceItem with id=${item_id}`,
      });
  }
};

// Update a ExperienceItem by ID
exports.update = async (req, res) => {
    try {
        const { item_id } = req.params;
        const [updated] = await ExperienceItem.update(req.body, {
            where: { item_id: item_id }, // Ensure you use the correct column name
        });

    if (!updated) {
      return res
        .status(404)
        .send({ message: `experienceItem with id=${item_id} not found.` });
    }

    res.status(200).send({ message: "ExperienceItem updated successfully." });
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message || `Error updating ExperienceItem with id=${item_id}`,
      });
  }
};

// Delete a ExperienceItem by ID
exports.delete = async (req, res) => {
  try {
    const { item_id } = req.params;
    const deleted = await ExperienceItem.destroy({
      where: { item_id: item_id }, // Ensure you use the correct column name
    });

    if (!deleted) {
      return res
        .status(404)
        .send({ message: `ExperienceItem with id=${item_id} not found.` });
    }

    res.status(200).send({ message: "ExperienceItem deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message || `Could not delete ExperienceItem with id=${item_id}`,
      });
  }
};
