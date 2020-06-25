const fs = require('fs');

module.exports = (app, db, path) => {
    app.get('/harchev/menu/all', (req, res) => {

        let query = `SELECT * FROM harchev;`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select harchev all!', err);
            }
            res.send(result);
        });
    });

    app.post('/harchev/menu/id', (req, res) => {
        console.log('id', req.body);
        let query = `SELECT * FROM harchev WHERE harchev_id = ` + req.body.id;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select harchev where id! ', err);
            }
            res.send(result);
        });
    });

    app.post('/harchev/menu/update', (req, res) => {
        console.log('update', req.body);
        let query = `UPDATE harchev SET name = "${req.body.name}", image = "${req.body.image}", description = "${req.body.description}" WHERE harchev_id = "${req.body.harchev_id}";`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error update harchev! ', err);
            }
            console.log('Succes! update');
            res.send(result);
        });

        if (req.body.resultAddImage) {
            fs.rename(path + "/harchev/undefined", path + "/harchev/" + req.body.image, (err) => {
                if (err) throw err;
                console.log('renamed complete');
            });

            fs.unlink(path + "/harchev/" + req.body.previousImage, (err) => {
                if (err) throw err;
                console.log('File was deleted');
            });
        }
    });

    app.post('/harchev/menu/create', (req, res) => {
        console.log('create', req.body);
        let query = `INSERT INTO harchev(name, image, description) VALUES("${req.body.name}", "${req.body.image}", "${req.body.description}");`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error create harchev! ', err);
            }
            console.log('Succes! create');
            res.send(result);
        });

        fs.rename(path + "/harchev/undefined", path + "/harchev/" + req.body.image, (err) => {
            if (err) throw err;
            console.log('renamed complete');
        });
    });

    app.post('/harchev/menu/image', (req, res) => {
        console.log('image', req.body);
        req.pipe(
            fs.createWriteStream(path + "/harchev/undefined")
        ).on('finish', () => res.send('ok'));
    });

    app.post('/harchev/menu/delete', (req, res) => {
        console.log('delete', req.body);
        let query = `DELETE FROM harchev WHERE harchev_id = ${req.body.id}`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error delete harchev! ', err);
            }
            console.log('Succes! delete');
            res.send(result);
        });
        if (fs.existsSync(path + "/harchev/" + req.body.image)) {
            fs.unlink(path + "/harchev/" + req.body.image, (err) => {
                if (err) throw err;
                console.log('File was deleted');
            });
        }
    });
    
    app.get('/harchev/main/get-text', (req, res) => {

        let query = `SELECT * FROM various_data WHERE name = "harchev_main"`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select harchev main!', err);
            }
            res.send(result);
        });
    });

    app.post('/harchev/main/update', (req, res) => {
        console.log('update', req.body);
        let query = `UPDATE various_data SET value = "${req.body.text}" WHERE name = "harchev_main"`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error update main harchev! ', err);
            }
            console.log('Succes! update main harchev');
            res.send(result);
        });
    });

    app.post('/harchev/main/logo', (req, res) => {
        console.log('image', req.body);

        req.pipe(
            fs.createWriteStream(path + "/harchev/logo.jpg")
        ).on('finish', () => res.send('ok'));
    });
};