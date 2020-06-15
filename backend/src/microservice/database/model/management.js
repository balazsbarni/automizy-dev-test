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
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'students',
        key: 'id'
      }
    },
    project_id: {
      type: INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    createdAt: {
      type: DATE,
      defaultValue: NOW
    }
  }, {
    uniqueKeys: {
        actions_unique: {
            fields: ['project_id', 'student_id']
        }
    }
  })
  return Management;
}

export default ManagementModel
