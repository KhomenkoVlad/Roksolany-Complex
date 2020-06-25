const nodemailer = require('nodemailer');

module.exports = (app, db) => {
  app.post('/email/send', (req, res) => {
    console.log('Email body: ', req.body);

    let query = "SELECT * FROM various_data WHERE name = 'email';";
    db.query(query, (err, result) => {
      if (err) {
        return console.log('Error select footer all!', err);
      }
      console.log(result[0].value);
      let myEmail = String(result[0].value);


      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'zatmenie8',
          pass: 'Vladon4ik8'
        }
      });

      let mailOptions = {
        from: myEmail,
        to: req.body.email || myEmail,
        subject: req.body.subject,
        text: req.body.text
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });
  });
}