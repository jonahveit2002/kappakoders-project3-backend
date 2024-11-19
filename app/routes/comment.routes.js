module.exports = (app) => {
  const comment = require("../controllers/comment.controller.js");
  const {
    authenticate,
    isAdmin,
  } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get(
    "/resume/review/:reviewId/comment",
    [authenticate, isAdmin],
    comment.getAll
  );

  router.post(
    "/resume/review/:reviewId/comment",
    [authenticate, isAdmin],
    comment.create
  );

  router.put(
    "/resume/review/comment/:id",
    [authenticate, isAdmin],
    comment.update
  );

  router.delete(
    "/resume/review/comment/:id",
    [authenticate, isAdmin],
    comment.destroy
  );

  app.use("/resume-t1/student", router);
};
