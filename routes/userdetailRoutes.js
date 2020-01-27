const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
//const requireCredits = require('../middlewares/requireCredits');

const Udetail = mongoose.model('udetails');

module.exports = app => {
//  app.get('/api/udetail', requireLogin, async (req, res) => {
//    const udetails = await udetail.find({ _user: req.user.id })
//    });
//
//    res.send(userdetail);
//  });

  app.post('/api/udetail', requireLogin, async (req, res) => {
    const { userStreet, userCity, userZipPostal, userState, userCountry, userCell, userPhone, userLinkedin, userEmailsendyes } = req.body;

    const udetail = new Udetail({
      userStreet,
      userCity,
      userZipPostal,
      userState,
      userCountry,
      userCell,
      userPhone,
      userLinkedin,
      userEmailsendyes,
      _user: req.user.id

    });

    try {
      await udetail.save();
      const user = await req.user.save();

      res.send(user);


    } catch (err) {
      res.status(422).send(err);
    }
  });
};
