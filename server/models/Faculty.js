module.exports = function(sequelize, DataType) {
  var Faculty = sequelize.define("Faculty",
    {
      facultyID: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z]-[0-9]{3}$/,
        }
      },
      facultyName: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z. ]+$/,
          notEmpty: true
        }
      },
      designation: {
        type: DataType.STRING,
        defaultValue: null
      },
      qualification: {
        type: DataType.STRING,
        defaultValue: null
      },
      role: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      contact: {
        type: DataType.STRING,
        defaultValue: ' ',
        validate: {
          is: /^[0-9]{10,11}$/
        }
      }
    },
    {
      instanceMethods: {
        retrieveById: function(faculty_id, onSuccess, onError) {
          Faculty.find({where: {id: faculty_id}}, {raw: true})
          .success(onSuccess)
          .error(onError);
        },
        add: function(onSuccess, onError) {
          var facultyID = this.facultyID;
          var facultyName = this.facultyName;

          Faculty.build({ facultyID: facultyID, facultyName: facultyName })
          .save()
          .success(onSuccess)
          .error(onError);
        },
        updateById: function(faculty_id, onSuccess, onError) {
          var id = faculty_id;
          var facultyID = this.facultyID;
          var facultyName = this.facultyName;

          Faculty.update({ facultyID: facultyID, facultyName: facultyName},
            {where: {id: faculty_id} })
          .success(onSuccess)
          .error(onError);
        },
        removeById: function(faculty_id, onSuccess, onError) {
          Faculty.destroy({where: {id: faculty_id}})
          .success(onSuccess)
          .error(onError);
        }
      },
      classMethods: {
        associate: function(models) {
          Faculty.hasOne(models.Batch, { foreignKeyConstraint: true});
          Faculty.hasMany(models.Subject, { foreignKeyConstraint: true});
        }
      }
    });

  return Faculty;

};
