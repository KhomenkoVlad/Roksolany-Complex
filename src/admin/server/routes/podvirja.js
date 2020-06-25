const fs = require('fs');

module.exports = (app, db, path) => {
    app.get('/podvirja/menu/all', (req, res) => {

        let query = "SELECT * FROM podvirja;";

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select podvirja all!', err);
            }
            res.send(result);
        });
    });

    app.post('/podvirja/menu/id', (req, res) => {
        console.log('id', req.body);
        let query = "SELECT * FROM podvirja WHERE podvirja_id = " + req.body.id;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select podvirja where id! ', err);
            }
            res.send(result);
        });
    });

    app.post('/podvirja/menu/update', (req, res) => {
        console.log('update', req.body);
        let query = `UPDATE podvirja SET name = "${req.body.name}", image = "${req.body.image}", description = "${req.body.description}" WHERE podvirja_id = "${req.body.podvirja_id}";`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error update podvirja! ', err);
            }
            console.log('Succes! update');
            res.send(result);
        });

        if (req.body.resultAddImage) {
            fs.rename(path + '/podvirja/undefined', path + '/podvirja/' + req.body.image, (err) => {
                if (err) throw err;
                console.log('renamed complete');
            });

            fs.unlink(path + '/podvirja/' + req.body.previousImage, (err) => {
                if (err) throw err;
                console.log('File was deleted');
            });
        }
    });

    app.post('/podvirja/menu/create', (req, res) => {
        console.log('create', req.body);
        let query = `INSERT INTO podvirja(name, price, area, quantity, image, description) 
        VALUES("${req.body.name}", "${req.body.price}", "${req.body.area}", "${req.body.quantity}", "${req.body.image}", "${req.body.description}");`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error create podvirja! ', err);
            }
            console.log('Succes! create');
            res.send(result);
        });

        fs.rename(path + '/podvirja/undefined', path + '/podvirja/' + req.body.image, (err) => {
            if (err) throw err;
            console.log('renamed complete');
        });
    });

    app.post('/podvirja/menu/image', (req, res) => {
        console.log('image', req.body);
        req.pipe(
            fs.createWriteStream(path + '/podvirja/undefined')
        ).on('finish', () => res.send('ok'));
    });

    app.post('/podvirja/menu/delete', (req, res) => {
        console.log('delete', req.body);
        let query1 = `DELETE FROM booking WHERE podvirja_podvirja_id = ${req.body.id}`;

        db.query(query1, (err, result) => {
            if (err) {
                return console.log('Error delete podvirja! ', err);
            }
            console.log('Succes! delete booking');
            let query2 = `DELETE FROM podvirja WHERE podvirja_id = ${req.body.id}`;
            db.query(query2, (err, result) => {
                if (err) {
                    return console.log('Error delete podvirja! ', err);
                }
            });

            console.log('Succes! delete podvirja');
            res.send(result);
        });


        if (fs.existsSync(path + '/podvirja/' + req.body.image)) {
            fs.unlink(path + '/podvirja/' + req.body.image, (err) => {
                if (err) throw err;
                console.log('File was deleted');
            });
        }
    });

    app.get('/podvirja/main/get-text', (req, res) => {

        let query = `SELECT * FROM various_data WHERE name = "podvirja_main"`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select podvirja main!', err);
            }
            res.send(result);
        });
    });

    app.post('/podvirja/main/update', (req, res) => {
        console.log('update', req.body);
        let query = `UPDATE various_data SET value = "${req.body.text}" WHERE name = "podvirja_main"`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error update main podvirja! ', err);
            }
            console.log('Succes! update main podvirja');
            res.send(result);
        });
    });

    app.post('/podvirja/main/logo', (req, res) => {
        console.log('image', req.body);

        req.pipe(
            fs.createWriteStream(path + '/podvirja/logo.jpg')
        ).on('finish', () => res.send('ok'));
    });
};