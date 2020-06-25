const fs = require('fs');

module.exports = (app, db, path) => {
    app.get('/kolorit/menu/all', (req, res) => {

        let query = "SELECT * FROM kolorit;";

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select Kolorit all!', err);
            }
            res.send(result);
        });
    });

    app.post('/kolorit/menu/id', (req, res) => {
        console.log('id', req.body);
        let query = "SELECT * FROM kolorit WHERE kolorit_id = " + req.body.id;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select Kolorit where id! ', err);
            }
            res.send(result);
        });
    });

    app.post('/kolorit/menu/update', (req, res) => {
        console.log('update', req.body);
        let query = `UPDATE kolorit SET name = "${req.body.name}", image = "${req.body.image}", description = "${req.body.description}" WHERE kolorit_id = "${req.body.kolorit_id}";`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error update Kolorit! ', err);
            }
            console.log('Succes! update');
            res.send(result);
        });

        if (req.body.resultAddImage) {
            fs.rename(path + '/kolorit/undefined', path + '/kolorit/' + req.body.image, (err) => {
                if (err) throw err;
                console.log('renamed complete');
            });

            fs.unlink(path + '/kolorit/' + req.body.previousImage, (err) => {
                if (err) throw err;
                console.log('File was deleted');
            });
        }
    });

    app.post('/kolorit/menu/create', (req, res) => {
        console.log('create', req.body);
        let query = `INSERT INTO kolorit(name, image, description) VALUES("${req.body.name}", "${req.body.image}", "${req.body.description}");`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error create Kolorit! ', err);
            }
            console.log('Succes! create');
            res.send(result);
        });

        fs.rename(path + '/kolorit/undefined', path + '/kolorit/' + req.body.image, (err) => {
            if (err) throw err;
            console.log('renamed complete');
        });
    });

    app.post('/kolorit/menu/image', (req, res) => {
        console.log('image', req.body);
        req.pipe(
            fs.createWriteStream(path + '/kolorit/undefined')
        ).on('finish', () => res.send('ok'));
    });

    app.post('/kolorit/menu/delete', (req, res) => {
        console.log('delete', req.body);
        let query = `DELETE FROM kolorit WHERE kolorit_id = ${req.body.id}`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error delete Kolorit! ', err);
            }
            console.log('Succes! delete');
            res.send(result);
        });
        if (fs.existsSync(path + '/kolorit/' + req.body.image)) {
            fs.unlink(path + '/kolorit/' + req.body.image, (err) => {
                if (err) throw err;
                console.log('File was deleted');
            });
        }
    });

    app.get('/kolorit/main/get-text', (req, res) => {

        let query = `SELECT * FROM various_data WHERE name = "kolorit_main"`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select kolorit main!', err);
            }
            res.send(result);
        });
    });

    app.post('/kolorit/main/update', (req, res) => {
        console.log('update', req.body);
        let query = `UPDATE various_data SET value = "${req.body.text}" WHERE name = "kolorit_main"`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error update main Kolorit! ', err);
            }
            console.log('Succes! update main kolorit');
            res.send(result);
        });
    });

    app.post('/kolorit/main/logo', (req, res) => {
        console.log('image', req.body);

        req.pipe(
            fs.createWriteStream(path + '/kolorit/logo.jpg')
        ).on('finish', () => res.send('ok'));
    });
};