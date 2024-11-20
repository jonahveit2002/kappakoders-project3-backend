module.exports = (app) => {
  const skillItem = require("../../controllers/resumeItems/skillitem.controller.js");
  const { authenticate } = require("../../authorization/authorization.js");

  const router = require("express").Router();

  // Create a new SkillItem within a specific resume section
  router.post("/:resumeId/resumeSection/:sectionId/skill-item", authenticate, skillItem.create);

  // Get all skill items for a specific section
  router.get("/:resumeId/resumeSection/:sectionId/skill-item", authenticate, skillItem.findAll);

  // Get skill item by ID
  router.get("/:resumeId/resumeSection/:sectionId/skill-item/:item_id", authenticate, skillItem.findOne);

  // Update a SkillItem by ID
  router.put("/:resumeId/resumeSection/:sectionId/skill-item/:item_id", authenticate, skillItem.update);

  // Delete a SkillItem by ID
  router.delete("/:resumeId/resumeSection/:sectionId/skill-item/:item_id", authenticate, skillItem.delete);

  app.use("/resume-t1/student/resume", router);
};