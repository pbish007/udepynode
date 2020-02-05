const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const House = mongoose.model('house');

module.exports = app => {
  app.get('/api/house',requireLogin, async (req, res) => {
    const house = await House.find({_user: req.user.id})

    res.send(house);
  });


  app.post('/api/house', requireLogin, async (req, res) => {
    const { street, city, provstate, zipcode, postalcode, country, bedrooms, bathrooms, sqft, lotsize, zillowurl, realtorurl,  } = req.body;

    const house = new House({
      street,
      city,
      provstate,
      zipcode,
      postalcode,
      country,
      bedrooms,
      bathrooms,
      sqft,
      lotsize,
      zillowurl,
      realtorurl,
      _user: req.user.id
    });

    try {
    // saving data to the database and then updating the user credits
      await house.save();
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
        res.status(422).send(err);
    }
  });
};
