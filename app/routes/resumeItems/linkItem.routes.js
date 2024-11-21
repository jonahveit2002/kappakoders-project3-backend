module.exports = (app) => {
    const linkItem = require("../../controllers/resumeItems/linkitem.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
  
    const router = require("express").Router();
  
    // Create a new LinkItem within a specific resume section
    router.post("/:resumeId/resumeSection/:sectionId/link-item", authenticate, linkItem.create);
  
    // Get all link items for a specific section
    router.get("/:resumeId/resumeSection/:sectionId/link-item", authenticate, linkItem.findAll);
  
    // Get link item by ID
    router.get("/:resumeId/resumeSection/:sectionId/link-item/:item_id", authenticate, linkItem.findOne);
  
    // Update a LinkItem by ID
    router.put("/:resumeId/resumeSection/:sectionId/link-item/:item_id", authenticate, linkItem.update);
  
    // Delete a LinkItem by ID
    router.delete("/:resumeId/resumeSection/:sectionId/link-item/:item_id", authenticate, linkItem.delete);
  
    app.use("/resume-t1/student/resume", router);
  };