/**
 * HomeSpaController
 *
 * @description :: Server-side logic for managing sentences
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var note = '&copy;' + (new Date()).getFullYear()

module.exports = {

  'home': function(req, res) {
    res.view('home', {
      copyrightNote: note
    });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SleepController)
   */
  _config: {}
};
