module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(75),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(45),
    },
    date_start: {
      type: Sequelize.DATEONLY,
    },
    date_completed: {
      type: Sequelize.DATEONLY,
    },
  });

  return Project;
};
