module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      buying_price: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
      },
      selling_price: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reorder_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reorder_status: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "No Status",
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product_category",
          key: "category_id",
        },
        onDelete: "no action",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "product",
      timestamps: false,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Product_Category, { foreignKey: "category_id" });
  };
  return Product;
};
