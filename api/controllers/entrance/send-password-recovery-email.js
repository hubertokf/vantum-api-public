module.exports = {


  friendlyName: 'Send password recovery email',


  description: 'Send a password recovery notification to the user with the specified email address.',


  inputs: {

    email: {
      description: 'The email address of the alleged user who wants to recover their password.',
      example: 'rydahl@example.com',
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      description: 'The email address have matched a user in the database. A recovery email was sent.)'
    },

    notfound: {
      description: 'The email address havent matched a user in the database. A recovery email was not sent.'
    },

  },


  fn: async function (inputs, exits) {

    // Find the record for this user.
    // (Even if no such user exists, pretend it worked to discourage sniffing.)
    var userRecord = await User.findOne({ email: inputs.email }).exec();
    if (!userRecord) {
      return exits.notfound({
        error: true,
        message: 'userNotFound'
      });
    }//•

    // Come up with a pseudorandom, probabilistically-unique token for use
    // in our password recovery email.
    var token = await sails.helpers.strings.random('url-friendly');

    // Store the token on the user record
    // (This allows us to look up the user when the link from the email is clicked.)
    await User.findOneAndUpdate({
      _id: userRecord.id
    },
    { $set: {
      passwordResetToken: token,
      passwordResetTokenExpiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL,
    }
    })

    // Send recovery email
    await sails.helpers.sendTemplateEmail.with({
      to: inputs.email,
      subject: 'Instruções de troca de senha',
      template: 'email-reset-password',
      templateData: {
        fullName: userRecord.fullName,
        token: token
      }
    });

    return exits.success({message: "recoverySent", token: token});

  }


};
