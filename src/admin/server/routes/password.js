module.exports = (app, db) => {
  app.get('/password/get', (req, res) => {
    let query = `SELECT * FROM various_data WHERE name = "admin_login" OR name = "admin_password" ;`;

    db.query(query, (err, result) => {
      if (err) {
        return console.log('Error select about!', err);
      }
      res.send(result);
    });
  });
  app.post('/password/edit', (req, res) => {
    let query = `UPDATE various_data SET value = "${req.body.login}" WHERE name = "admin_login";`;

    db.query(query, (err, result) => {
      if (err) {
        return console.log('Error update about!', err);
      }

      let query = `UPDATE various_data SET value = md5("${req.body.pass}") WHERE name = "admin_password";`;

      db.query(query, (err, result) => {
        if (err) {
          return console.log('Error update about!', err);
        }

        res.send(result);
      });
    });
  });
}