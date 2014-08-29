/**
 * SentenceSpaController
 *
 * @description :: Server-side logic for managing sentences
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'home': function(req, res) {
    res.view('app/partials/signin/home', {layout: false});
  },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to SleepController)
     */
    _config: {}
};
