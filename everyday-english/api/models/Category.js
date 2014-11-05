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
    
    words:{
      collection: 'Word',
      via: 'category'
    }, 
    
    getParentId: function () {
      if (undefined == this.ancestry) {
        return undefined;
      }
      var len = this.ancestry.length;
      if (0 == len) {
        return undefined;
      }
      var index = this.ancestry.lastIndexOf('/');
      if (-1 == index) {
        return this.ancestry;
      }
      return this.ancestry.substring(index + 1, len);
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
