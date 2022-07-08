var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
  schema: {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'task'
    },
    orthomosaic: {
      type: Schema.Types.ObjectId,
      ref: 'orthomosaic'
    }
  },

  constructSchema: function (schemaDefinedAbove, sails) {
    var newSchema = new sails.mongoose.Schema(schemaDefinedAbove,
      {
        collection: 'task_orthomosaics',
        timestamps: true,
        autoIndex: false
      }
    );

    return newSchema;
  }
}
