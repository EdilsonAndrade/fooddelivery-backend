const Addresses = require('../models/Address');
const User = require('../models/User');
module.exports = {

  async store(req, res) {
    const { address, number, addressLine, zipCode, nickName } = req.body;
    const { user_id } = req.headers;

    if (!address || !zipCode) {
      return res.status(500).json('Invalid Address');
    }
    if (!user_id) {
      return res.status('404').json('User not found or not informed');
    }
    var user = await User.findOne({ user_id });
    if (user) {
      return res.status('404').json('User not found or not informed');
    }


    let addresses = await Addresses.findOne({ address, number });
    if (!addresses) {
      addresses = await Addresses.create({ address, number, addressLine, zipCode, nickName, user: user_id });
    }

    await addresses.populate('user').execPopulate();


    return res.json(addresses)
  },

  async update(req, res) {
    const { address, number, addressLine, zipCode, nickName } = req.body;
    const { user_id, address_id } = req.headers;

    if (!address || !zipCode) {
      return res.status(500).json('Invalid Address');
    }
    if (!user_id) {
      return res.status('404').json('User not found or not informed');
    }
    if (!address_id) {
      return res.status('404').json('Address not found or not informed');
    }
    var user = await User.findOne({ user_id });
    if (user) {
      return res.status('404').json('User not found or not informed');
    }

    let addresses = await Addresses.findById(address_id);
    if (!addresses) {
      addresses = await Addresses.create({ address, number, addressLine, zipCode, nickName, user: user_id });
    } else {
      addresses = await Addresses.create({ address, number, addressLine, zipCode, nickName, user: user_id });
    }

    await addresses.populate('user').execPopulate();


    return res.json(addresses);
  },
  async index(req, res) {
    const { user_id } = req.headers;

    if (!user_id) {
      return res.status('500').json('User id missed');
    }

    const addresses = await Addresses.find({ user: user_id });
    return res.json(addresses);
  }
}