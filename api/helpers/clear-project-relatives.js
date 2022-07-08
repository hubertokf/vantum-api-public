module.exports = {
  friendlyName: 'Clear project relatives',

  description:
    'Cleans the project parent thats gonna be removed and the children related to it.',

  inputs: {
    project: {
      type: 'ref',
      required: true,
    },
  },
  exits: {
    success: {
      outputFriendlyName: 'Project relatives cleaned',
    },
  },
  async fn(inputs, exits) {
    if (inputs.project.parent) {
      const parentProject = await Project.findOne({
        _id: inputs.project.parent,
      });
      const index = parentProject.projects.findIndex(
        child => child === inputs.project.parent
      );

      parentProject.projects.splice(index, 1);
    }
    if (inputs.project.projects) {
      inputs.project.projects.forEach(async childProject => {
        await Project.findOneAndUpdate(
          { _id: childProject },
          {
            $set: { parent: null },
          }
        );
      });
    }
    if (inputs.project.plans) {
      inputs.project.plans.forEach(async plan => {
        await Plan.findOneAndUpdate(
          { _id: plan },
          {
            $set: { project: null },
          }
        );
      });
    }
    return exits.success(true);
  },
};
