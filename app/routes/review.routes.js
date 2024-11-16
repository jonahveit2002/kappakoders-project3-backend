module.exports = (app) => {
  const review = require("../controllers/review.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/resume/:resumeId/review", [authenticate], review.getAll);

  router.get("/resume/review/:id", [authenticate], review.getForId);

  router.post("/resume/:resumeId/review", [authenticate], review.create);

  router.put("/resume/review/:id", [authenticate], review.update);

  router.delete("/resume/review/:id", [authenticate], review.destroy);

  app.use("/resume-t1/student", router);
};
