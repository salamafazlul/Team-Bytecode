module.exports = (Sequelize, DataTypes) => {
  const Category = Sequelize.define(
    "Category",
    {
      Category_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

      Category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: "CategoryId" });
  };

  return Category;
};
