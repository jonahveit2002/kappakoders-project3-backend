module.exports = (sequelize, Sequelize) => {
    const ProfessionalSummaryItem = sequelize.define('ProfessionalSummaryItem', {
        item_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        professionalSummary_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        section_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
    

    return ProfessionalSummaryItem;
};
