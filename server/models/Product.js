module.exports = (Sequelize, DataTypes) => {
  const Product = Sequelize.define(
    "Product",
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

      Buying_price: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Selling_price: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Min_stock_level: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
  };
  return Product;
};
