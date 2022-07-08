module.exports = {
  friendlyName: 'Create instance',

  description: '',

  inputs: {
    task: {
      type: {},
      required: true,
    },
    instanceOptions: {
      type: {},
      required: true,
    },
    user: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  async fn(inputs) {
    // Imports the Google Cloud client library
    const Compute = require('@google-cloud/compute');

    // Create a new VM using the latest OS image of your choice.
    const { zone_name } = inputs.instanceOptions;
    const { zone_mirror } = inputs.instanceOptions;
    const { project_name } = inputs.instanceOptions;
    const { image_name } = inputs.instanceOptions;
    const { service_account } = inputs.instanceOptions;
    const { credential_file } = inputs.instanceOptions;
    const { user, task } = inputs;
    const vmCores = inputs.instanceOptions.cores;
    const vmMem = inputs.instanceOptions.memory;
    const diskSize = inputs.instanceOptions.disk;
    const { shutdown } = inputs.instanceOptions;

    // Creates a client
    const compute = new Compute({
      projectId: project_name,
      keyFilename: credential_file,
    });

    const zone = compute.zone(`${zone_name}-${zone_mirror}`);
    const name = `task-${inputs.task._id}`;

    const metadataItens = [
      {
      key: 'id',
      value: task._id,
    },
    {
      key: 'job',
      value: encodeURIComponent(JSON.stringify(task.job)),
    },
    {
      key: 'status',
      value: task.status,
    },
    {
      key: 'plan',
      value: task.plan.toString(),
    },
    {
      key: 'album',
      value: task.album,
    },
    {
      key: 'shutdown',
      value: shutdown,
    },
    ];

    const machineType = `custom-${vmCores}-${vmMem * 1024}`;
    const config = {
      kind: 'compute#instance',
      name: `task-${inputs.task._id}`,
      zone: `projects/${project_name}/zones/${zone_name}-${zone_mirror}`,
      machineType: `projects/${project_name}/zones/${zone_name}-${zone_mirror}/machineTypes/${machineType}`,
      metadata: {
        kind: 'compute#metadata',
        items: metadataItens,
      },
      tags: {
        items: [],
      },
      disks: [
        {
          kind: 'compute#attachedDisk',
          type: 'PERSISTENT',
          boot: true,
          mode: 'READ_WRITE',
          autoDelete: true,
          deviceName: `task-${task._id}`,
          initializeParams: {
            sourceImage: `projects/${project_name}/global/images/${image_name}`,
            diskType: `projects/${project_name}/zones/${zone_name}-${zone_mirror}/diskTypes/pd-ssd`,
            diskSizeGb: diskSize,
          },
          diskEncryptionKey: {},
        },
      ],
      canIpForward: false,
      networkInterfaces: [
        {
          kind: 'compute#networkInterface',
          subnetwork: `projects/${project_name}/regions/${zone_name}/subnetworks/default`,
          accessConfigs: [
            {
              kind: 'compute#accessConfig',
              name: 'External NAT',
              type: 'ONE_TO_ONE_NAT',
              networkTier: 'PREMIUM',
            },
          ],
          aliasIpRanges: [],
        },
      ],
      description: '',
      labels: {
        task: task._id.toString(),
        'task-type': Object.keys(task.job)[0],
        user: user._id.toString(),
        plan: task.plan.toString(),
      },
      scheduling: {
        preemptible: false,
        onHostMaintenance: 'MIGRATE',
        automaticRestart: true,
        nodeAffinities: [],
      },
      deletionProtection: false,
      serviceAccounts: [
        {
          email: service_account,
          scopes: [
            'https://www.googleapis.com/auth/devstorage.read_only',
            'https://www.googleapis.com/auth/logging.write',
            'https://www.googleapis.com/auth/monitoring.write',
            'https://www.googleapis.com/auth/servicecontrol',
            'https://www.googleapis.com/auth/service.management.readonly',
            'https://www.googleapis.com/auth/trace.append',
          ],
        },
      ],
    };

    await zone
      .createVM(name, config)
      .then(async data => {
        // `operation` lets you check the status of long-running tasks.
        const vm = data[0];
        const operation = data[1];
        await operation.promise().then(response => {
          return response;
        });
      })
      .then(data => {
        console.log('Created VM Instance', data);
        // Virtual machine created!
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  },
};
