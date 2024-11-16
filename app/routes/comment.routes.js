module.exports = (app) => {
  const comment = require("../controllers/comment.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get(
    "/resume/review/:reviewId/comment",
    [authenticate],
    comment.getAll
  );

  router.post(
    "/resume/review/:reviewId/comment",
    [authenticate],
    comment.create
  );

  router.put("/resume/review/comment/:id", [authenticate], comment.update);

  router.delete("/resume/review/comment/:id", [authenticate], comment.destroy);

  app.use("/resume-t1/student", router);
};
