module.exports = (sequelize, Sequelize) => {
  const ProfessionalSummary = sequelize.define("professionalsummary", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    summary: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
  });

  return ProfessionalSummary;
};
