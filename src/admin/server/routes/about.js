module.exports = (app, db) => {
  app.get('/about/get', (req, res) => {
    let query = `SELECT * FROM various_data WHERE name = "complex_about"`;

    db.query(query, (err, result) => {
      if (err) {
        return console.log('Error select about!', err);
      }
      res.send(result);
    });
  });
  app.post('/about/update', (req, res) => {
    let query = `UPDATE various_data SET value = "${req.body.text}" WHERE name = "complex_about";`;

    db.query(query, (err, result) => {
      if (err) {
        return console.log('Error update about!', err);
      }

      res.send(result);
    });
  });
}