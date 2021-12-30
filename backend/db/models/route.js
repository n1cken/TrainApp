module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('route', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  Route.associate = (models) => {
    Route.hasMany(models.timetable)
  }

  return Route;
}

