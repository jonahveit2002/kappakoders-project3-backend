module.exports = (sequelize, Sequelize) => {
    const SkillItem = sequelize.define('SkillItem', {
        item_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        skill_id: {
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
    

    return SkillItem;
};
