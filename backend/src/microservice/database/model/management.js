const ManagementModel = ({
  sequelize,
  DataType
}) => {
  const { INTEGER, DATE, NOW } = DataType
  const Management = sequelize.define('management', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: INTEGER,
      // allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      }
    },
    project_id: {
      type: INTEGER,
      // allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    createdAt: {
      type: DATE,
      defaultValue: NOW
    }
  })
  return Management;
}

export default ManagementModel
