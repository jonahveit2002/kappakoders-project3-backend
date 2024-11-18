module.exports = (sequelize, Sequelize) => {
  const Resume = sequelize.define("resume", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    metadata: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  });

  return Resume;
};
