module.exports = (app) => {
  const skill = require("../controllers/skill.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/skill", [authenticate], skill.getAllForUser);

  router.get("/skill/:id", [authenticate], skill.getForId);

  router.post("/skill/", [authenticate], skill.create);

  router.put("/skill/:id", [authenticate], skill.update);

  router.delete("/skill/:id", [authenticate], skill.delete);

  app.use("/resume-t1/student", router);
};
