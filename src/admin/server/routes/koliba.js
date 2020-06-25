const fs = require('fs');

module.exports = (app, db, path) => {
    app.get('/koliba/menu/all', (req, res) => {

        let query = "SELECT * FROM koliba;";

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select koliba all!', err);
            }
            res.send(result);
        });
    });

    app.post('/koliba/menu/id', (req, res) => {
        console.log('id', req.body);
        let query = "SELECT * FROM koliba WHERE koliba_id = " + req.body.id;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select koliba where id! ', err);
            }
            res.send(result);
        });
    });

    app.post('/koliba/menu/update', (req, res) => {
        console.log('update', req.body);
        let query = `UPDATE koliba SET name = "${req.body.name}", image = "${req.body.image}", description = "${req.body.description}" WHERE koliba_id = "${req.body.koliba_id}";`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error update koliba! ', err);
            }
            console.log('Succes! update');
            res.send(result);
        });

        if (req.body.resultAddImage) {
            fs.rename(path + "/koliba/undefined", path + "/koliba/" + req.body.image, (err) => {
                if (err) throw err;
                console.log('renamed complete');
            });

            fs.unlink(path + "/koliba/" + req.body.previousImage, (err) => {
                if (err) throw err;
                console.log('File was deleted');
            });
        }
    });

    app.post('/koliba/menu/create', (req, res) => {
        console.log('create', req.body);
        let query = `INSERT INTO koliba(name, image, description) VALUES("${req.body.name}", "${req.body.image}", "${req.body.description}");`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error create koliba! ', err);
            }
            console.log('Succes! create');
            res.send(result);
        });

        fs.rename(path + "/koliba/undefined", path + "/koliba/" + req.body.image, (err) => {
            if (err) throw err;
            console.log('renamed complete');
        });
    });

    app.post('/koliba/menu/image', (req, res) => {
        console.log('image', req.body);
        req.pipe(
            fs.createWriteStream(path + "/koliba/undefined")
        ).on('finish', () => res.send('ok'));
    });

    app.post('/koliba/menu/delete', (req, res) => {
        console.log('delete', req.body);
        let query = `DELETE FROM koliba WHERE koliba_id = ${req.body.id}`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error delete koliba! ', err);
            }
            console.log('Succes! delete');
            res.send(result);
        });
        if (fs.existsSync(path + "/koliba/" + req.body.image)) {
            fs.unlink(path + "/koliba/" + req.body.image, (err) => {
                if (err) throw err;
                console.log('File was deleted');
            });
        }
    });

    
    app.get('/koliba/main/get-text', (req, res) => {

        let query = `SELECT * FROM various_data WHERE name = "koliba_main"`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select koliba main!', err);
            }
            res.send(result);
        });
    });

    app.post('/koliba/main/update', (req, res) => {
        console.log('update', req.body);
        let query = `UPDATE various_data SET value = "${req.body.text}" WHERE name = "koliba_main"`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error update main koliba! ', err);
            }
            console.log('Succes! update main koliba');
            res.send(result);
        });
    });

    app.post('/koliba/main/logo', (req, res) => {
        console.log('image', req.body);

        req.pipe(
            fs.createWriteStream(path + "/koliba/logo.jpg")
        ).on('finish', () => res.send('ok'));
    });
};