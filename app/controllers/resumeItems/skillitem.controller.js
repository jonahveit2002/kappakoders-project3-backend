const db = require("../models"); // Adjust the path if necessary
const SkillItem = db.SkillItem;

// Create and Save a new SkillItem
exports.create = async (req, res) => {
    try {
        const { skill_id, section_id } = req.body;

        // Validate request
        if (!skill_id || !section_id) {
            return res.status(400).send({ message: "Content cannot be empty!" });
        }

        // Create and save the SkillItem
        const skillItem = await SkillItem.create({ skill_id, section_id });
        res.status(201).send(skillItem);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while creating the SkillItem." });
    }
};

// Retrieve all SkillItems
exports.findAll = async (req, res) => {
    try {
        const skillItems = await SkillItem.findAll();
        res.status(200).send(skillItems);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving SkillItems." });
    }
};

// Retrieve a single SkillItem by ID
exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const skillItem = await SkillItem.findByPk(id);

        if (!skillItem) {
            return res.status(404).send({ message: `SkillItem with id=${id} not found.` });
        }

        res.status(200).send(skillItem);
    } catch (err) {
        res.status(500).send({ message: err.message || `Error retrieving SkillItem with id=${id}` });
    }
};

// Update a SkillItem by ID
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await SkillItem.update(req.body, {
            where: { item_id: id },
        });

        if (!updated) {
            return res.status(404).send({ message: `SkillItem with id=${id} not found.` });
        }

        res.status(200).send({ message: "SkillItem updated successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message || `Error updating SkillItem with id=${id}` });
    }
};

// Delete a SkillItem by ID
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await SkillItem.destroy({
            where: { item_id: id },
        });

        if (!deleted) {
            return res.status(404).send({ message: `SkillItem with id=${id} not found.` });
        }

        res.status(200).send({ message: "SkillItem deleted successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message || `Could not delete SkillItem with id=${id}` });
    }
};
