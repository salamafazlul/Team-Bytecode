module.exports = (Sequelize, DataTypes) => {
  const Return_Product = Sequelize.define(
    "Return_Product",
    {
      Product_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

      Product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Return_Product.associate = (models) => {
    Return_Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
  };
  return Return_Product;
};
