module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define(
      "Discount",
      {
        product_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: "Product",
            key: "product_id",
          },
        },
        rate: {
          type: DataTypes.DECIMAL(5, 2),
          primaryKey: true,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: "discount",
        timestamps: false,
      }
    );
  
    return Discount;
  };