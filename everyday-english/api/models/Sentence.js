/**
 * Sentence.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    english: {
      type: 'string',
      required: true,
      minLength: 12,
      maxLength: 128
    },

    chinese: {
      type: 'string',
      maxLength: 128
    },

    description: {
      type: 'string',
      maxLength: 512
    }
  }
};
