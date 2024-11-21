const db = require("../../models"); // Adjust the path if necessary
const ProfessionalSummaryItem = db.professionalSummaryItem;

// Create and Save a new professionalSummaryItem
exports.create = async (req, res) => {
    try {
        const { professionalSummary_id } = req.body;
        const { sectionId } = req.params;

        if (!professionalSummary_id || !sectionId) {
            return res.status(400).send({ message: "professionalSummary ID and Section ID are required!" });
        }

        const professionalSummaryItem = await ProfessionalSummaryItem.create({ professionalSummary_id, section_id: sectionId });
        res.status(201).send(professionalSummaryItem);
    } catch (err) {
        console.error("Error creating professionalSummaryItem:", err);
        res.status(500).send({ message: err.message || "Some error occurred while creating the professionalSummaryItem." });
    }
};

// Retrieve all professionalSummaryItems for a specific section
exports.findAll = async (req, res) => {
    console.log("Backend find all professionalSummaryitems");
    try {
        const { sectionId } = req.params;
        const professionalSummaryItems = await ProfessionalSummaryItem.findAll({ where: { section_id: sectionId} });
        res.status(200).send(professionalSummaryItems);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving ProfessionalSummaryItems." });
    }
};

// Retrieve a single ProfessionalSummaryItem by ID
exports.findOne = async (req, res) => {
    try {
        const { item_id } = req.params;
        const professionalSummaryItem = await ProfessionalSummaryItem.findByPk(item_id);

        if (!professionalSummaryItem) {
            return res.status(404).send({ message: `ProfessionalSummaryItem with id=${item_id} not found.` });
        }

        res.status(200).send(professionalSummaryItem);
    } catch (err) {
        res.status(500).send({ message: err.message || `Error retrieving ProfessionalSummaryItem with id=${item_id}` });
    }
};

// Update a ProfessionalSummaryItem by ID
exports.update = async (req, res) => {
    try {
        console.log("IS this being called?");
        const { item_id } = req.params;
        const [updated] = await ProfessionalSummaryItem.update(req.body, {
            where: { id: item_id }, // Ensure you use the correct column name
        });

        if (!updated) {
            return res.status(404).send({ message: `professionalSummaryItem with id=${item_id} not found.` });
        }

        res.status(200).send({ message: "ProfessionalSummaryItem updated successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message || `Error updating ProfessionalSummaryItem with id=${item_id}` });
    }
};

// Delete a ProfessionalSummaryItem by ID
exports.delete = async (req, res) => {
    try {
        const { item_id } = req.params;
        const deleted = await ProfessionalSummaryItem.destroy({
            where: { item_id: item_id }, // Ensure you use the correct column name
        });

        if (!deleted) {
            return res.status(404).send({ message: `ProfessionalSummaryItem with id=${item_id} not found.` });
        }

        res.status(200).send({ message: "ProfessionalSummaryItem deleted successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message || `Could not delete ProfessionalSummaryItem with id=${item_id}` });
    }
};