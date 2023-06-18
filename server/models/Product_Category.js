module.exports = (sequelize, DataTypes) => {
  const Product_Category = sequelize.define("Product_Category", {
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      category_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
  },{
    tableName: 'product_category',
    timestamps: false
  });

  return Product_Category;
};
