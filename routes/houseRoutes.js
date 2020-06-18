const requireLogin = require("../middlewares/requireLogin");
const { House } = require("../models/House");

module.exports = app => {
  app.get("/api/house", requireLogin, async (req, res) => {
    const house = await House.find({ userId: req.user._id })
      .lean()
      .exec();

    res.send(house);
  });

  app.put("/api/house", requireLogin, async (req, res) => {
    console.log('updating');
    const { _id, updatedHouse } = req.body;
    await House.updateOne({ _id }, { $set: updatedHouse });
    res.send({ success: true, meta: updatedHouse });
  });

  app.delete("/api/house", requireLogin, async (req, res) => {
    const { _id } = req.body;
    console.log('deleting', req.body);

    await House.remove({ _id });
    res.send({ success: true });
  });

  app.post("/api/house", requireLogin, async (req, res) => {
    const { address, financials, insurance, utilities, support } = req.body;

    if (!req.user) {
      res
        .status(401)
        .send({ message: "Not allowed to perform this operation." });
    }

    const response = await House.create({
      userId: req.user._id,
      address,
      financials,
      insurance,
      utilities,
      support
    });
    res.send({ success: true, meta: response });
  });
};
