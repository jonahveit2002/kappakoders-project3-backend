const db = require("../../models"); // Adjust the path if necessary
const SkillItem = db.skillItem;
const Skill = db.skill;

// Create and Save a new SkillItem
exports.create = async (req, res) => {
    try {
        const { skill_id } = req.body;
        const { order } = req.body;
        const { sectionId } = req.params;

        if (!skill_id || !sectionId) {
            return res.status(400).send({ message: "Skill ID and Section ID are required!" });
        }

        const skillItem = await SkillItem.create({ skill_id, order, section_id: sectionId });
        res.status(201).send(skillItem);
    } catch (err) {
        console.error("Error creating SkillItem:", err);
        res.status(500).send({ message: err.message || "Some error occurred while creating the SkillItem." });
    }

    const skillItem = await SkillItem.create({
      skill_id,
      section_id: sectionId,
    });
    res.status(201).send(skillItem);
  } catch (err) {
    console.error("Error creating SkillItem:", err);
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the SkillItem.",
    });
  }
};

// Retrieve all SkillItems for a specific section
exports.findAll = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const skillItems = await SkillItem.findAll({
      where: { section_id: sectionId },
      include: [
        {
          model: Skill,
          as: "skill",
        },
      ],
    });
    res.status(200).send(skillItems);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving SkillItems.",
    });
  }
};

// Retrieve a single SkillItem by ID
exports.findOne = async (req, res) => {
  try {
    const { item_id } = req.params;
    const skillItem = await SkillItem.findByPk(item_id);

    if (!skillItem) {
      return res
        .status(404)
        .send({ message: `SkillItem with id=${item_id} not found.` });
    }

    res.status(200).send(skillItem);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error retrieving SkillItem with id=${item_id}`,
    });
  }
};

// Update a SkillItem by ID
exports.update = async (req, res) => {
    try {
        const { item_id } = req.params;
        const [updated] = await SkillItem.update(req.body, {
            where: { item_id: item_id }, // Ensure you use the correct column name
        });

    if (!updated) {
      return res
        .status(404)
        .send({ message: `SkillItem with id=${item_id} not found.` });
    }

    res.status(200).send({ message: "SkillItem updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating SkillItem with id=${item_id}`,
    });
  }
};

// Delete a SkillItem by ID
exports.delete = async (req, res) => {
  try {
    const { item_id } = req.params;
    const deleted = await SkillItem.destroy({
      where: { item_id: item_id }, // Ensure you use the correct column name
    });

    if (!deleted) {
      return res
        .status(404)
        .send({ message: `SkillItem with id=${item_id} not found.` });
    }

    res.status(200).send({ message: "SkillItem deleted successfully." });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Could not delete SkillItem with id=${item_id}`,
    });
  }
};
