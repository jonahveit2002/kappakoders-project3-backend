module.exports = (sequelize, Sequelize) => {
    const SkillItem = sequelize.define("skillItem", {
        item_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true, 
            primaryKey: true, 
        },
        skill_id: {
            type: Sequelize.INTEGER,
            allowNull: false, 
            references: {
                model: 'skills', 
                key: 'skill_id',
            },
        },
        section_id: {
            type: Sequelize.INTEGER,
            allowNull: false, 
            references: {
                model: 'resumeSections', 
                key: 'id',
            },
        },
    });

    return SkillItem;
};
