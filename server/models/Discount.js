module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define("Discount",{
        discount_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
        discount_code:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        rate:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        startDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
    })
    return Discount
}