const db = require("../../models"); // Adjust the path if necessary
const LinkItem = db.linkItem;
const Link = db.link;

// Create and Save a new linkItem
exports.create = async (req, res) => {
  try {
    const { link_id } = req.body;
    const { order } = req.body;
    const { sectionId } = req.params;

    if (!link_id || !sectionId) {
      return res
        .status(400)
        .send({ message: "link ID and Section ID are required!" });
    }

    const linkItem = await LinkItem.create({
      link_id,
      order,
      section_id: sectionId,
    });
    res.status(201).send(linkItem);
  } catch (err) {
    console.error("Error creating linkItem:", err);
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the linkItem.",
    });
  }
};

// Retrieve all linkItems for a specific section
exports.findAll = async (req, res) => {
  console.log("Backend find all linkitems");
  try {
    const { sectionId } = req.params;
    const linkItems = await LinkItem.findAll({
      where: { section_id: sectionId },
      include: [
        {
          model: Link,
          as: "link",
        },
      ],
    });
    res.status(200).send(linkItems);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving LinkItems.",
    });
  }
};

// Retrieve a single LinkItem by ID
exports.findOne = async (req, res) => {
  try {
    const { item_id } = req.params;
    const linkItem = await LinkItem.findByPk(item_id);

    if (!linkItem) {
      return res
        .status(404)
        .send({ message: `LinkItem with id=${item_id} not found.` });
    }

    res.status(200).send(linkItem);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error retrieving LinkItem with id=${item_id}`,
    });
  }
};

// Update a LinkItem by ID
exports.update = async (req, res) => {
  try {
    const { item_id } = req.params;
    const [updated] = await LinkItem.update(req.body, {
      where: { item_id: item_id }, // Ensure you use the correct column name
    });

    if (!updated) {
      return res
        .status(404)
        .send({ message: `linkItem with id=${item_id} not found.` });
    }

    res.status(200).send({ message: "LinkItem updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating LinkItem with id=${item_id}`,
    });
  }
};

// Delete a LinkItem by ID
exports.delete = async (req, res) => {
  try {
    const { item_id } = req.params;
    const deleted = await LinkItem.destroy({
      where: { item_id: item_id }, // Ensure you use the correct column name
    });

    if (!deleted) {
      return res
        .status(404)
        .send({ message: `LinkItem with id=${item_id} not found.` });
    }

    res.status(200).send({ message: "LinkItem deleted successfully." });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Could not delete LinkItem with id=${item_id}`,
    });
  }
};
