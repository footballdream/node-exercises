/**
 * SentenceSpaController
 *
 * @description :: Server-side logic for managing sentences
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'home': function(req, res) {
    res.view('app/partials/sentences/home', {layout: false});
  },

  'form': function(req, res) {
    res.view('app/partials/sentences/form', {layout: false});
  },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to SleepController)
     */
    _config: {}
};
