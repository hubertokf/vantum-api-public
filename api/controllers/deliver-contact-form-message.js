module.exports = {


  friendlyName: 'Deliver contact form message',


  description: 'Deliver a contact form message to the appropriate internal channel(s).',


  inputs: {

    email: {
      required: true,
      type: 'string',
      description: 'A return email address where we can respond.',
      example: 'hermione@hogwarts.edu'
    },

    actuation: {
      required: true,
      type: 'string',
      description: 'The topic from the contact form.',
      example: 'I want to buy stuff.'
    },

    fullname: {
      required: true,
      type: 'string',
      description: 'The full name of the human sending this message.',
      example: 'Hermione Granger'
    },

    message: {
      required: true,
      type: 'string',
      description: 'The custom message, in plain text.'
    }

  },


  exits: {

    success: {
      description: 'The message was sent successfully.'
    }

  },


  fn: async function (inputs, exits) {

    if (!sails.config.custom.internalEmailAddress) {
      throw new Error(
        `Cannot deliver incoming message from contact form because there is no internal
email address (\`sails.config.custom.internalEmailAddress\`) configured for this
app.  To enable contact form emails, you'll need to add this missing setting to
your custom config -- usually in \`config/custom.js\`, \`config/staging.js\`,
\`config/production.js\`, or via system environment variables.`
      );
    }

    const promise = Email.create({
      to: 'contato@vantum.com.br',
      from: inputs.email,
      subject: 'formulário de contato',
      status: 'sent',
      message: JSON.stringify({
        nome: inputs.fullname,
        email: inputs.email,
        atuação: inputs.actuation,
        mensagem: inputs.message
      })
    })

    promise.then((doc) => {
      return res.json(doc)
    })
    .catch(res.serverError)

    await sails.helpers.sendTemplateEmail.with({
      to: sails.config.custom.internalEmailAddress,
      subject: 'Nova mensagem de formulário de contato',
      template: 'internal/email-contact-form',
      layout: false,
      templateData: {
        contactName: inputs.fullname,
        contactEmail: inputs.email,
        actuation: inputs.actuation,
        message: inputs.message
      }
    });

    return exits.success();

  }


};
