/**
 * DeliverController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  contactFormVantum: async (req, res) => {
    const params = req.allParams();

    const promise = Email.create({
      to: 'contato@vantum.com.br',
      from: params.email,
      subject: '[VANTUM][CONTATO] Formulário de contato',
      status: 'sent',
      message: JSON.stringify({
        nome: params.fullname,
        email: params.email,
        phone: params.phone,
        atuação: params.actuation,
        mensagem: params.message,
      }),
    });

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);

    await sails.helpers.sendTemplateEmail.with({
      to: sails.config.custom.vantumContatoEmailAddress,
      subject: '[CONTATO] Nova mensagem de formulário de contato',
      template: 'internal/email-contact-form',
      layout: false,
      templateData: {
        contactName: params.fullname,
        contactEmail: params.email,
        phone: params.phone,
        actuation: params.actuation,
        message: params.message,
      },
    });
    return res.ok();
  },

  contactCampaign: async (req, res) => {
    const params = req.allParams();

    const { user } = params;
    const { idea } = params;
    const { actuation } = params;
    console.log(sails.config.custom.vantumContatoEmailAddress);
    templateData = {
      contactName: user.fullName,
      contactEmail: user.email,
      contactPhone: user.phone.number,
      actuation,
      message: idea,
    };
    console.log(templateData);

    const camp = await Campaign.create({
      idea,
      user,
      actuation,
    });

    await sails.helpers.sendTemplateEmail.with({
      to: sails.config.custom.vantumContatoEmailAddress,
      subject: '[CONTATO] Nova mensagem de ideias',
      template: 'internal/email-contact-form-campaign',
      layout: false,
      templateData: {
        contactName: user.fullName,
        contactEmail: user.email,
        contactPhone: user.phone.number,
        actuation,
        message: idea,
      },
    });

    r = {
      to: sails.config.custom.vantumContatoEmailAddress,
      subject: '[CONTATO] Nova mensagem da campanha de ideias',
      template: 'internal/email-contact-form-campaign',
      layout: false,
      templateData: {
        contactName: user.fullName,
        contactEmail: user.email,
        contactPhone: user.phone.number,
        actuation,
        message: idea,
      },
    };

    return res.json(r);
  },

  contactFormVantumTask: async (req, res) => {
    const params = req.allParams();
    const value = params.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    const task = await Task.findOne({ _id: params.task })
      .populate('album')
      .populate('orthomosaic')
      .populate({
        path: 'plan',
        populate: {
          path: 'owner',
        },
      })
      .exec();

    // var task = await Task.findOne(params.task)
    // .populate('album&orthomosaic&plan.owner')
    // .then((task) => { // async(plan)
    //   return task
    // })
    // .catch(res.serverError)

    await sails.helpers.sendTemplateEmail.with({
      to: 'financeiro@vantum.com.br',
      subject: '[PROCESSAMENTO] Novo processamento solicitado',
      template: 'internal/email-billing-financial',
      layout: false,
      templateData: {
        contactName: task.plan.owner.fullName,
        contactEmail: task.plan.owner.email,
        planName: task.plan.name,
        planId: task.plan.id,
        albumId: task.album.id,
        albumCount: task.album.count,
        albumName: task.album.name,
        albumType: task.album.type,
        task: task.id,
        resolution: Math.ceil((task.album.width * task.album.height) / 1000000),
        value,
      },
    });

    await sails.helpers.sendTemplateEmail.with({
      to: task.plan.owner.email,
      subject: 'Cobrança de processamento',
      template: 'internal/email-billing-user',
      layout: false,
      templateData: {
        contactName: task.plan.owner.fullName,
        contactEmail: task.plan.owner.email,
        plan: task.plan.name,
        count: task.album.count,
        resolution: Math.ceil((task.album.width * task.album.height) / 1000000),
        value,
      },
    });
    return res.ok();
  },

  // contactVantumShare: async (req, res) => {
  //   var params = req.allParams()
  //   const value = (params.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  //   var share = await Sharing.findOne(params.)
  //   .populate('')
  //   .then((share) => { // async(plan)
  //     return share
  //   })
  //   .catch(res.serverError)

  //   await sails.helpers.sendTemplateEmail.with({
  //     to: task.plan.owner.email,
  //     subject: 'Compartilhamento de ',
  //     template: 'internal/email-billing-user',
  //     layout: false,
  //     templateData: {
  //       contactName: task.plan.owner.fullName,
  //       contactEmail: task.plan.owner.email,
  //       plan: task.plan.name,
  //       count: task.album.count,
  //       resolution: (task.album.width * task.album.height)/1000000,
  //       value: value
  //     }
  //   })
  //   return res.ok()
  // },

  contactFormPlanah: async (req, res) => {
    const params = req.allParams();

    const promise = Email.create({
      to: 'contato@planah.com.br',
      from: params.email,
      subject: '[PLANAH][CONTATO] Formulário de contato',
      status: 'sent',
      message: JSON.stringify({
        nome: params.fullname,
        email: params.email,
        atuação: params.actuation,
        mensagem: params.message,
      }),
    });

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);

    await sails.helpers.sendTemplateEmail.with({
      to: sails.config.custom.planahContatoEmailAddress,
      subject: '[CONTATO] Nova mensagem de formulário de contato',
      template: 'internal/email-contact-form-planah',
      layout: false,
      templateData: {
        contactName: params.fullname,
        contactEmail: params.email,
        actuation: params.actuation,
        message: params.message,
      },
    });

    return res.ok();
  },

  signupClassesPlanah: async (req, res) => {
    const params = req.allParams();

    const promise = Email.create({
      to: 'contato@planah.com.br',
      from: params.email,
      subject: '[PLANAH][CURSOS] Formulário de interesse em curso',
      status: 'sent',
      message: JSON.stringify({
        nome: params.fullname,
        email: params.email,
        atuação: params.actuation,
        mensagem: params.message,
      }),
    });

    promise
      .then(doc => {
        return res.json(doc);
      })
      .catch(res.serverError);

    await sails.helpers.sendTemplateEmail.with({
      to: sails.config.custom.planahContatoEmailAddress,
      subject: '[CURSOS] Novo interessado nos cursos',
      template: 'internal/email-contact-form-planah-classes',
      layout: false,
      templateData: {
        contactName: params.fullname,
        contactEmail: params.email,
        actuation: params.actuation,
        classDate: params.classDate,
      },
    });

    return res.ok();
  },
};
