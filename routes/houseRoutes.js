const requireLogin = require('../middlewares/requireLogin');
const { House } = require('../models/House');

module.exports = app => {
    app.get('/api/house',requireLogin, async (req, res) => {
        const house = await House.find({_user: req.user.id}).lean().exec();

        res.send(house);
    });


    app.post('/api/house', requireLogin, async (req, res) => {
        const { address, financials, insurance, utilities, support } = req.body;

        console.log('user', req.user);

        if (!req.user) {
            res.status(401).send({ message: 'Not allowed to perform this operation.' })
        }

        const response = await House.create({
            userId: req.user._id,
            address,
            financials,
            insurance,
            utilities,
            support,
        });
        res.send({ success: true, meta: response });
    });
};
