module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    "Discount",
    {
      discount_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Product",
          key: "product_id",
          onDelete: "no action",
          onUpdate: "no action",
        },
      },
      rate_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "discount",
      timestamps: false,
    }
  );

  Discount.associate = (models) => {
    Discount.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return Discount;
};