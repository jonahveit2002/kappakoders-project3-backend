const db = require("../../models"); // Adjust the path if necessary
const ProjectItem = db.projectItem;
const Project = db.project;

// Create and Save a new projectItem
exports.create = async (req, res) => {
  try {
    const { project_id } = req.body;
    const { order } = req.body;
    const { sectionId } = req.params;

    if (!project_id || !sectionId) {
      return res
        .status(400)
        .send({ message: "project ID and Section ID are required!" });
    }

    const projectItem = await ProjectItem.create({
      project_id,
      order,
      section_id: sectionId,
    });
    res.status(201).send(projectItem);
  } catch (err) {
    console.error("Error creating projectItem:", err);
    res
      .status(500)
      .send({
        message:
          err.message || "Some error occurred while creating the projectItem.",
      });
  }

  const projectItem = await ProjectItem.create({
    project_id,
    section_id: sectionId,
  });
  res.status(201).send(projectItem);
};

// Retrieve all projectItems for a specific section
exports.findAll = async (req, res) => {
  console.log("Backend find all projectitems");
  try {
    const { sectionId } = req.params;
    const projectItems = await ProjectItem.findAll({
      where: { section_id: sectionId },
      include: [
        {
          model: Project,
          as: "project",
        },
      ],
    });
    res.status(200).send(projectItems);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving ProjectItems.",
    });
  }
};

// Retrieve a single ProjectItem by ID
exports.findOne = async (req, res) => {
  try {
    const { item_id } = req.params;
    const projectItem = await ProjectItem.findByPk(item_id);

    if (!projectItem) {
      return res
        .status(404)
        .send({ message: `ProjectItem with id=${item_id} not found.` });
    }

    res.status(200).send(projectItem);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error retrieving ProjectItem with id=${item_id}`,
    });
  }
};

// Update a ProjectItem by ID
exports.update = async (req, res) => {
  try {
    const { item_id } = req.params;
    const [updated] = await ProjectItem.update(req.body, {
      where: { item_id: item_id }, // Ensure you use the correct column name
    });

    if (!updated) {
      return res
        .status(404)
        .send({ message: `projectItem with id=${item_id} not found.` });
    }

    res.status(200).send({ message: "ProjectItem updated successfully." });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating ProjectItem with id=${item_id}`,
    });
  }
};

// Delete a ProjectItem by ID
exports.delete = async (req, res) => {
  try {
    const { item_id } = req.params;
    const deleted = await ProjectItem.destroy({
      where: { item_id: item_id }, // Ensure you use the correct column name
    });

    if (!deleted) {
      return res
        .status(404)
        .send({ message: `ProjectItem with id=${item_id} not found.` });
    }

    res.status(200).send({ message: "ProjectItem deleted successfully." });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Could not delete ProjectItem with id=${item_id}`,
    });
  }
};
