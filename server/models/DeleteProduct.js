module.exports = (sequelize, DataTypes) => {
  const DeleteProduct = sequelize.define(
    "DeleteProduct",
    {
      deleteProduct_id: {
        type: DataTypes.STRING,
        allowNull: false,
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

      expiry_date: {
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: true,
      },
    },
    {
      tableName: "delete_product",
      timestamps: false,
    }
  );

  return DeleteProduct;
};
