module.exports = (app) => {
  const skill = require("../controllers/skill.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new skill
  router.post("/", [authenticate], skill.create);

  // Retrieve all skills
  router.get("/", [authenticate], skill.findAll);

  // Retrieve a single skill with id
  router.get("/:id", [authenticate], skill.findOne);

  // Update a skill with id
  router.put("/:id", [authenticate], skill.update);

  // Delete a skill with id
  router.delete("/:id", [authenticate], skill.delete);

  // Delete all skills
  router.delete("/", [authenticate], skill.deleteAll);

  app.use("/resume-t1/skill", router);
};
