module.exports = (app) => {
    const educationItem = require("../../controllers/resumeItems/educationitem.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
  
    const router = require("express").Router();
  
    // Create a new EducationItem within a specific resume section
    router.post("/:resumeId/resumeSection/:sectionId/education-item", authenticate, educationItem.create);
  
    // Get all education items for a specific section
    router.get("/:resumeId/resumeSection/:sectionId/education-item", authenticate, educationItem.findAll);
  
    // Get education item by ID
    router.get("/:resumeId/resumeSection/:sectionId/education-item/:item_id", authenticate, educationItem.findOne);
  
    // Update a EducationItem by ID
    router.put("/:resumeId/resumeSection/:sectionId/education-item/:item_id", authenticate, educationItem.update);
  
    // Delete a EducationItem by ID
    router.delete("/:resumeId/resumeSection/:sectionId/education-item/:item_id", authenticate, educationItem.delete);
  
    app.use("/resume-t1/student/resume", router);
  };