module.exports = (sequelize, Sequelize) => {
  const Template = sequelize.define("template", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    template_data: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  });

  return Template;
};
