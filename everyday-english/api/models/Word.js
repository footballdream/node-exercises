/**
* Word.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    
attributes: {
    content: {
      type: 'string',
      required: true,
      maxLength: 24
    },

    description: {
      type: 'string',
      maxLength: 512
    },
    
    category: {
      model: 'Category'
    },
        
    toJSON: function() {
      var obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }    
  }
};

