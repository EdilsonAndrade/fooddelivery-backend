const User = require('../models/User');
const nodemailer = require('nodemailer');


module.exports = {

  async index(req, res) {

    let { email } = req.headers;

    var confirmationId = Math.floor(Math.random() * 90000) + 10000;
    var dt = new Date();
    var expireDate = dt.setMinutes(dt.getMinutes() + 30);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status('404').json('User not found');
    }
    if (user.confirmed) {
      return res.json('User already active');
    }
    if (user) {

      await User.updateOne({ email, confirmationId, expireDate });
      const transport = nodemailer.createTransport({
        host: 'mail.nafeijuca.com.br',
        port: 25,
        auth: {
          user: 'nao-responda@nafeijuca.com.br',
          pass: 'noreply#feijuca'
        },
        secure: false,
        tls: {
          rejectUnauthorized: false
        }

      });
      const mailOpts = {
        from: 'nao-responda@nafeijuca.com.br',
        to: email,
        subject: `Na Feijuca - Codigo Ativação - ${confirmationId}`,
        text: `Seu código de validação é ${confirmationId} preencha o mesmo no aplicativo para validar seu cadastro`,
        html: `<html>
                <head>
                <style>
                strong{
                  font-size:24px
                },
                body{font-size:18px}
                div.principal{
                  display:flex;
                  flex-direction:column;
                 
          
                }
                </style>

                </head>
               
                <body>
                <div class="principal">
                <div>
                  Seu código de ativação é <strong>${confirmationId} </strong> digite o no aplicativo para ativar sua conta.
                  <p>Você tem <strong>30 minutos</strong> antes que expire.</p>
                </div>
                 
                  <div class="img">
                    <img src="../assets/nafeijucalogoemail.png" alt="logo">
                  </div>
                </div>
                 
                </body>
              </html>`
      }

       transport.sendMail(mailOpts, (error, info) => {
        if (error) {
          return res.json({ sucesso: false, error });
        } else {
          return res.json({ sucesso: true, info, user });
        }

      })
    } else {
      return res.status('404').json('User not found');
    }


  },

  async store(req, res) {
    const { confirmationId } = req.body;
    const { email } = req.headers;

    const userReturned = await User.findOne({ email });

    if (!userReturned) {
      return res.status('404').json('User not found');
    } else {
      if (userReturned.confirmed) {
        return res.json('Usuário já ativo');
      }
      if (userReturned.confirmationId === confirmationId && new Date() <= new Date(userReturned.expireDate)) {
        await User.updateOne({ email, confirmationId: '', confirmed: true });
        return res.json('Usuario Ativado');
      } else {
        return res.status("500").json('Código expirado ou inválido para ativação');
      }
    }

  }
}