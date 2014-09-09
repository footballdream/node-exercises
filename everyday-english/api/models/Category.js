/**
 * Sentence.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      maxLength: 32
    },
    
    description: {
      type: 'string',
      maxLength: 512
    },    
    
    ancestry: {
      type: 'string',
      maxLength: 255
    },
    
    getParentId: function (){
      return this.ancestry;
    },
    
    toJSON: function() {
      var obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      obj.parentId = obj.getParentId();
      obj.label = obj.name;
      return obj;
    }    
  }
};
