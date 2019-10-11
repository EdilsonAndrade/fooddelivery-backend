const User = require('../models/User');
const ActivationController = require('./ActivationController');
module.exports = {

    async index(req, res) {

        const { email } = req.query;
        const user = await User.find({ email });
        if (!user) {
            return res.status(404).json("User não encontrado");
        }

        return res.json(user);

    },
    async store(req, res) {

        const { email } = req.body
        if (!email || email === undefined) {
            return res.json("Email deve ser informado");
        }

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email,
            });
            req = { ...req, headers: { email: email } }
            return await ActivationController.index(req, res);


        }
        return res.json(user);
    },
    async update(req, res) {
        const { newEmail } = req.body;
        const { email } = req.headers;

        let user = await User.findOne({ email });
        if (user) {
            await User.updateOne({ email: newEmail, confirmed: false })
            req = { ...req, headers: { email: newEmail } }
            const emailSender = await ActivationController.index(req, res);

            if (emailSender.sucesso) {
                return res.json(user);
            } else {
                return emailSender;
            }

        } else {
            return res.status('404').json('User not found');
        }
    }

}