const db = require("../../models"); // Adjust the path if necessary
const AwardItem = db.awardItem;
const Award = db.award;

// Create and Save a new awardItem
exports.create = async (req, res) => {
    try {
        const { award_id } = req.body;
        const { order } = req.body;
        const { sectionId } = req.params;

        if (!award_id || !sectionId) {
            return res.status(400).send({ message: "award ID and Section ID are required!" });
        }

        const awardItem = await AwardItem.create({ award_id, order, section_id: sectionId });
        res.status(201).send(awardItem);
    } catch (err) {
        console.error("Error creating awardItem:", err);
        res.status(500).send({ message: err.message || "Some error occurred while creating the awardItem." });
    }

    const awardItem = await AwardItem.create({
      award_id,
      section_id: sectionId,
    });
    res.status(201).send(awardItem);
  } catch (err) {
    console.error("Error creating awardItem:", err);
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the awardItem.",
    });
  }
};

// Retrieve all awardItems for a specific section
exports.findAll = async (req, res) => {
  console.log("Backend find all awarditems");
  try {
    const { sectionId } = req.params;
    const awardItems = await AwardItem.findAll({
      where: { section_id: sectionId },
      include: [
        {
          model: Award,
          as: "award",
        },
      ],
    });
    res.status(200).send(awardItems);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving AwardItems.",
    });
  }
};

// Retrieve a single AwardItem by ID
exports.findOne = async (req, res) => {
  try {
    const { item_id } = req.params;
    const awardItem = await AwardItem.findByPk(item_id);

    if (!awardItem) {
      return res
        .status(404)
        .send({ message: `AwardItem with id=${item_id} not found.` });
    }

    res.status(200).send(awardItem);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error retrieving AwardItem with id=${item_id}`,
    });
  }
};

// Update a AwardItem by ID
exports.update = async (req, res) => {
    try {
        const { item_id } = req.params;
        const [updated] = await AwardItem.update(req.body, {
            where: { item_id: item_id }, // Ensure you use the correct column name
        });

    if (!updated) {
      return res
        .status(404)
        .send({ message: `awardItem with id=${item_id} not found.` });
    }

    res.status(200).send({ message: "AwardItem updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating AwardItem with id=${item_id}`,
    });
  }
};

// Delete a AwardItem by ID
exports.delete = async (req, res) => {
  try {
    const { item_id } = req.params;
    const deleted = await AwardItem.destroy({
      where: { item_id: item_id }, // Ensure you use the correct column name
    });

    if (!deleted) {
      return res
        .status(404)
        .send({ message: `AwardItem with id=${item_id} not found.` });
    }

    res.status(200).send({ message: "AwardItem deleted successfully." });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Could not delete AwardItem with id=${item_id}`,
    });
  }
};
