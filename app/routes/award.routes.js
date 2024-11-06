module.exports = (app) => {
  const award = require("../controllers/award.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  
  var router = require("express").Router();

  // Create a new award
  router.post("/", [authenticate], award.create);

  // Retrieve all awards
  router.get("/", [authenticate], award.findAllForUser);

  // Retrieve a single award with id
  router.get("/:id", [authenticate], award.findOne);

  // Update a award with id
  router.put("/:id", [authenticate], award.update);

  // Delete a award with id
  router.delete("/:id", [authenticate], award.delete);

  app.use("/resume-t1/student/award", router);
};
