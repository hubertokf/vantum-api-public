/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  postTask: async (req, res) => {
    const params = req.allParams();

    const promise = Task.create({
      status: params.status,
      job: params.job,
      start_time: params.start_time,
      end_time: params.end_time,
      parameters: params.parameters,
      album: params.album,
      orthomosaic: params.orthomosaic,
      plan: params.plan,
    });

    promise
      .then(async doc => {
        // const value = (params.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        const task = await Task.findOne({
          _id: doc._id,
        })
          .populate('album')
          .populate('orthomosaic')
          .populate({
            path: 'plan',
            populate: {
              path: 'owner',
            },
          })
          .lean();

        if (task.job.tile) {
          const instanceOptions = {
            cores: 2,
            memory: 2,
            disk: 20,
            zone_name: 'southamerica-east1',
            zone_mirror: 'b',
            project_name: 'projeto-233719',
            image_name: 'image-vantum-19',
            service_account: '1044341927719-compute@developer.gserviceaccount.com',
            credential_file: 'config/credentials/teste.json',
            shutdown: true,
          };

          const instance = {
            cores: instanceOptions.cores,
            memory: instanceOptions.memory,
            disk: instanceOptions.disk,
            project: instanceOptions.project_name,
            image: instanceOptions.image_name,
            zone_name: instanceOptions.zone_name,
            zone_mirror: instanceOptions.zone_mirror,
          };

          const promise = await Task.findOneAndUpdate(
            {
              _id: doc._id,
            },
            {
              $set: {
                instance,
              },
            }
          );

          sails.log.info('Creating instance');

          const newtask = {
            _id: task._id.toString(),
            status: task.status,
            plan: task.plan._id.toString(),
            job: task.job,
          };

          await sails.helpers.createInstance(
            newtask,
            instanceOptions,
            task.plan.owner
          );
        }
        return res.json(task);
      })
      .catch(res.serverError);
  },

  run: async (req, res) => {
    const params = req.allParams();

    const task = await Task.findOne({
      _id: params.id,
    })
      .populate({
        path: 'plan',
        populate: {
          path: 'owner',
        },
      })
      .lean();

    const instanceOptions = {
      cores: 2,
      memory: 2,
      disk: 20,
      zone_name: 'southamerica-east1',
      zone_mirror: 'c',
      project_name: 'projeto-233719',
      image_name: `image-vantum-${params.instance.imageNumber}`,
      service_account: '',
      credential_file: '',
      shutdown: params.instance.shutdown,
    };

    if (task.job.tile == true) {
      // apenas tiles
      instanceOptions.cores = 2;
      instanceOptions.memory = 2;
      instanceOptions.disk = 20;
    }
    // } else if (task.album.count < 100) {
    //   vmCores = "8"
    //   vmMem = "15" // in GB
    //   diskSize = "30"  // in GB
    // } else if (task.album.count >= 100 ) {
    //   vmCores = "8"
    //   vmMem = "30" // in GB
    //   diskSize = "30"  // in GB
    // } else {
    //   vmCores = "8"
    //   vmMem = "50" // in GB
    //   diskSize = "30"  // in GB
    // }

    // Sobrescreve as configurações de instancia
    if (params.instance.cores) {
      instanceOptions.cores = params.instance.cores;
    }
    if (params.instance.mem) {
      instanceOptions.memory = params.instance.mem;
    }
    if (params.instance.disk) {
      instanceOptions.disk = params.instance.disk;
    }
    if (params.instance.project) {
      instanceOptions.project_name = params.instance.project;
    }

    // Seleciona o Service Account e credencial de acordo com o projeto
    if (instanceOptions.project_name == 'projeto-233719') {
      instanceOptions.service_account =
        '1044341927719-compute@developer.gserviceaccount.com';
      instanceOptions.credential_file = 'config/credentials/teste.json';
      instanceOptions.zone_name = 'southamerica-east1';
      // instanceOptions.zone_name = "us-east1"
      instanceOptions.zone_mirror = 'c';
      instanceOptions.image_name =
        `image-vantum-${  params.instance.imageNumber}`;
    } else if (instanceOptions.project_name == 'fine-entry-221919') {
      instanceOptions.service_account =
        '537816016050-compute@developer.gserviceaccount.com';
      instanceOptions.credential_file = 'config/credentials/prod.json';
      instanceOptions.zone_name = 'southamerica-east1';
      instanceOptions.zone_mirror = 'c';
      instanceOptions.image_name =
        `image-vantum-${  params.instance.imageNumber}`;
    }
    // console.log(task);
    // console.log('----------------------------------------------------');
    // console.log(task._doc);
    // console.log('----------------------------------------------------');
    // console.log(task.toObject());

    const instance = {
      cores: instanceOptions.cores,
      memory: instanceOptions.memory,
      disk: instanceOptions.disk,
      project: instanceOptions.project_name,
      image: instanceOptions.image_name,
      zone_name: instanceOptions.zone_name,
      zone_mirror: instanceOptions.zone_mirror,
    };

    const promise = await Task.findOneAndUpdate(
      {
        _id: task._id.toString(),
      },
      {
        $set: {
          instance,
        },
      }
    );

    const newtask = {
      _id: task._id.toString(),
      status: task.status,
      plan: task.plan._id.toString(),
      job: task.job,
    };

    if (task.album) {
      newtask.album = task.album.toString();
    }

    await sails.helpers.createInstance(
      newtask,
      instanceOptions,
      task.plan.owner
    );

    res.json({
      message: 'Task running',
    });
  },

  getTask: async (req, res) => {
    const id = req.param('id');

    const query = Task.findOne({
      _id: id,
    })
      .populate('album')
      .populate('orthomosaic')
      .populate({
        path: 'plan',
        populate: {
          path: 'owner',
        },
      });
    const promise = query.exec();

    promise.then(doc => res.json(doc)).catch(res.serverError);
  },

  getTasks: async (req, res) => {
    const params = req.allParams();

    const query = Task.find(params)
      .sort('-createdAt')
      .populate('album')
      .populate('orthomosaic')
      .populate({
        path: 'plan',
        populate: {
          path: 'owner',
        },
      });
    const promise = query
      .select(
        '-disks.free.values -disks.used.values -mems.total.available.values -mems.total.free.values  -mems.total.used.values -mems.total.active.values -mems.total.inactive.values -mems.total.available.values -mems.processing.free.values  -mems.processing.used.values -mems.processing.available.values -mems.processing.active.values -mems.processing.inactive.values '
      )
      .exec();
    promise.then(doc => res.json(doc)).catch(res.serverError);
  },

  countTasks: async (req, res) => {
    const tasks = await Task.aggregate([
      {
      $match: {},
    },
    {
      $group: {
        _id: {
          month: {
            $month: {
              $toDate: '$createdAt',
            },
          },
          year: {
            $year: {
              $toDate: '$createdAt',
            },
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
      },
    },
    ]);

    let totalCount = 0;
    const totalTasks = tasks.forEach(task => {
      totalCount += task.count;
    });

    return res.send({
      tasks,
      totalTasks: totalCount,
    });
  },

  putTask: async (req, res) => {
    const params = req.allParams();

    const promise = Task.findOneAndUpdate(
      {
        _id: params.id,
      },
      {
        $set: params,
      }
    );

    promise
      .then(async task => {
        if (task.status == 'completed') {
          const query = Plan.findOne(task.plan)
            .populate('owner')
            .populate('geometrys')
            .populate('project')
            .populate('annotations')
            .populate('tasks')
            .populate({
              path: 'album',
              populate: {
                path: 'images',
              },
            })
            .populate({
              path: 'orthomosaics',
              populate: [
                {
                  path: 'image',
                },
              ],
            });

          const promise = query.exec();

          promise
            .then(async plan => {
              const link = `https://app.vantum.com.br/plan/${plan.id}`;

              await sails.helpers.sendTemplateEmail.with({
                to: plan.owner.email,
                subject: 'Processamento de Imagens Concluído',
                template: 'internal/email-task-completed',
                layout: false,
                templateData: {
                  contactName: plan.owner.fullName,
                  link,
                },
              });
              return res.json(task);
            })
            .catch(res.serverError);
        } else if (task.status == 'error') {
          // console.log(task)
          await sails.helpers.sendTemplateEmail.with({
            to: 'contato@vantum.com.br',
            subject: 'Erro no processamento',
            template: 'internal/email-task-error',
            layout: false,
            templateData: {
              plan: task.plan,
              task: task.id,
              error: task.error,
            },
          });
        }
        return res.json(task);
      })
      .catch(res.serverError);
  },

  deleteTask: async (req, res) => {
    const id = req.param('id');

    const promise = Task.deleteOne({
      _id: id,
    });

    promise.then(doc => res.ok()).catch(res.serverError);
  },
};
