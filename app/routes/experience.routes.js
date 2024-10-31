module.exports = (app) => {
  const experience = require("../controllers/experience.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/student/experience", [authenticate], experience.getAllForUser);

  router.get("/student/experience/:id", [authenticate], experience.getForId);

  router.post("/student/experience/", [authenticate], experience.create);

  router.put("/student/experience/:id", [authenticate], experience.update);

  router.delete("/student/experience/:id", [authenticate], experience.delete);

  app.use("/resume-t1", router);
};
