const db = require("../models");
const Template = db.template;

exports.getForId = async (req, res) => {
  await Template.findOne({
    where: { id: req.params.id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error occured while trying to retrieve template with id of ${req.params.id}`,
      });
    });
};
