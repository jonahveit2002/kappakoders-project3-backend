const db = require("../../models"); // Adjust the path if necessary
const EducationItem = db.educationItem;

// Create and Save a new educationItem
exports.create = async (req, res) => {
    try {
        const { education_id } = req.body;
        const { order } = req.body;
        const { sectionId } = req.params;

        if (!education_id || !sectionId) {
            return res.status(400).send({ message: "education ID and Section ID are required!" });
        }

        const educationItem = await EducationItem.create({ education_id, order, section_id: sectionId });
        res.status(201).send(educationItem);
    } catch (err) {
        console.error("Error creating educationItem:", err);
        res.status(500).send({ message: err.message || "Some error occurred while creating the educationItem." });
    }
};

// Retrieve all educationItems for a specific section
exports.findAll = async (req, res) => {
    console.log("Backend find all educationitems");
    try {
        const { sectionId } = req.params;
        const educationItems = await EducationItem.findAll({ where: { section_id: sectionId} });
        res.status(200).send(educationItems);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving EducationItems." });
    }
};

// Retrieve a single EducationItem by ID
exports.findOne = async (req, res) => {
    try {
        const { item_id } = req.params;
        const educationItem = await EducationItem.findByPk(item_id);

        if (!educationItem) {
            return res.status(404).send({ message: `EducationItem with id=${item_id} not found.` });
        }

        res.status(200).send(educationItem);
    } catch (err) {
        res.status(500).send({ message: err.message || `Error retrieving EducationItem with id=${item_id}` });
    }
};

// Update a EducationItem by ID
exports.update = async (req, res) => {
    try {
        const { item_id } = req.params;
        const [updated] = await EducationItem.update(req.body, {
            where: { item_id: item_id }, // Ensure you use the correct column name
        });

        if (!updated) {
            return res.status(404).send({ message: `educationItem with id=${item_id} not found.` });
        }

        res.status(200).send({ message: "EducationItem updated successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message || `Error updating EducationItem with id=${item_id}` });
    }
};

// Delete a EducationItem by ID
exports.delete = async (req, res) => {
    try {
        const { item_id } = req.params;
        const deleted = await EducationItem.destroy({
            where: { item_id: item_id }, // Ensure you use the correct column name
        });

        if (!deleted) {
            return res.status(404).send({ message: `EducationItem with id=${item_id} not found.` });
        }

        res.status(200).send({ message: "EducationItem deleted successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message || `Could not delete EducationItem with id=${item_id}` });
    }
};