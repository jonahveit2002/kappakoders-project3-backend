module.exports = (app) => {
  const experience = require("../controllers/experience.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/experience", [authenticate], experience.getAllForUser);

  router.get("/experience/:id", [authenticate], experience.getForId);

  router.post("/experience/", [authenticate], experience.create);

  router.put("/experience/:id", [authenticate], experience.update);

  router.delete("/experience/:id", [authenticate], experience.delete);

  app.use("/resume-t1/student", router);
};
