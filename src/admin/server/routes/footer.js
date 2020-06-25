module.exports = (app, db) => {
  app.get('/footer/all', (req, res) => {
    let query = `SELECT * FROM various_data WHERE name = "email" OR name = "phone_number" OR name = "adress";`;

    db.query(query, (err, result) => {
      if (err) {
        return console.log('Error select footer all!', err);
      }
      res.send(result);
    });
  });
  app.post('/footer/update', (req, res) => {
    let query = `UPDATE various_data SET value = "${req.body.email}" WHERE name = "email";`;

    db.query(query, (err, result) => {
      if (err) {
        return console.log('Error update footer email!', err);
      }
      let query = `UPDATE various_data SET value = "${req.body.phone}" WHERE name = "phone_number";`;

      db.query(query, (err, result) => {
        if (err) {
          return console.log('Error update footer phone!', err);
        }
        let query = `UPDATE various_data SET value = "${req.body.adress}" WHERE name = "adress";`;

        db.query(query, (err, result) => {
          if (err) {
            return console.log('Error update footer adress!', err);
          }
          res.send(result);
        });
      });
    });
  });
}