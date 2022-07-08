/**
 * Profiles.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    firstname: {
      type: 'string',
      required: true,
      description: 'The user\'s name',
      maxLength: 120,
      example: 'Lisa'
    },

    surname: {
      type: 'string',
      required: true,
      description: 'The user\'s surname',
      maxLength: 120,
      example: 'Foster'
    },

    phone: {
      type: 'string',
      description: 'The user\'s phone number',
      maxLength: 15,
      example: '5555555555'
    },

    gender: {
      type: 'string',
      isIn: ['m', 'f'],
      defaultsTo: 'm',
      description: 'The user\'s gender',
      maxLength: 1,
      example: 'f'
    },

    birthdate: {
      type: 'ref',
      columnType: 'datetime',
      description: 'The user\'s birth date',
      example: '03/03/1001'
    },

    atuation: {
      type: 'string',
      description: 'The user\'s atuation area',
      maxLength: 120,
      example: 'Agronomy'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

