module.exports = (app) => {
  const experience = require("../controllers/experience.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/user/experience", [authenticate], experience.getAllForUser);

  router.get("/user/experience/:id", [authenticate], experience.getForId);

  router.post("/user/experience/", [authenticate], experience.create);

  router.put("/user/experience/:id", [authenticate], experience.update);

  router.delete("/user/experience/:id", [authenticate], experience.delete);

  app.use("/resume-t1", router);
};
