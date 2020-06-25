const fs = require("fs");
let idMain;

module.exports = (app, db, path) => {
    app.get("/news/all", (req, res) => {

        let query = `SELECT * FROM news ORDER BY date DESC;`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error select news all!", err);
            }
            res.send(result);
        });
    });

    app.get("/news/main-page", (req, res) => {

        let query = `SELECT * FROM news ORDER BY date DESC LIMIT 3;`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error select news all!", err);
            }
            res.send(result);
        });
    });

    app.get("/news/all-archive", (req, res) => {

        let query = `SELECT date FROM news ORDER BY date DESC`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error select news all!", err);
            }
            res.send(result);
        });
    });

    app.get("/news/all-count-id", (req, res) => {

        let query = `SELECT count(news_id) as counted FROM news;`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error count news all!", err);
            }
            res.send(result);
        });
    });

    app.post("/news/page", (req, res) => {
        console.log("page", req.body);
        let query = `SELECT * FROM news ORDER BY date DESC LIMIT ${req.body.from},${req.body.to};`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error select news all!", err);
            }
            res.send(result);
        });
    });

    app.post("/news/archive-month", (req, res) => {
        console.log("page", req.body);
        let query = `SELECT * FROM news WHERE MONTH(date) = ${req.body.month} and YEAR(date) = ${req.body.year}  ORDER BY date DESC;`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error select archive-month all!", err);
            }
            res.send(result);
        });
    });

    app.post("/news/id", (req, res) => {
        console.log("id", req.body);
        let query = "SELECT * FROM news WHERE news_id = " + req.body.id;

        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error select news where id! ", err);
            }
            res.send(result);
        });
    });

    app.post("/news/main-full-page", (req, res) => {
        console.log("id from main", req.body);
        idMain = req.body.id;
        res.send(req.body);
    });
    
    app.get("/news/id-from-main", (req, res) => {
        let query = "SELECT * FROM news WHERE news_id = " + idMain;
        
        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error select news where id! ", err);
            }
            res.send(result);
        });
    });

    app.post("/news/update", (req, res) => {
        console.log("update", req.body);
        let query = `UPDATE news SET caption = "${req.body.caption}", image = "${req.body.image}", text = "${req.body.text}" 
        WHERE news_id = "${req.body.news_id}";`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error update news! ", err);
            }
            console.log("Succes! update");
            res.send(result);
        });

        if (req.body.resultAddImage) {
            fs.rename(path + "/news/undefined", path + "/news/" + req.body.image, (err) => {
                if (err) throw err;
                console.log("renamed complete");
            });

            fs.unlink(path + "/news/" + req.body.previousImage, (err) => {
                if (err) throw err;
                console.log("File was deleted");
            });
        }
    });

    app.post("/news/create", (req, res) => {
        console.log("create", req.body);
        let query = `INSERT INTO news(caption, image, text, date) 
        VALUES("${req.body.caption}", "${req.body.image}", "${req.body.text}", NOW());`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error create news! ", err);
            }
            console.log("Succes! create");
            res.send(result);
        });

        fs.rename(path + "/news/undefined", path + "/news/" + req.body.image, (err) => {
            if (err) throw err;
            console.log("renamed complete");
        });
    });

    app.post("/news/image", (req, res) => {
        console.log("image", req.body);
        req.pipe(
            fs.createWriteStream(path + "/news/undefined")
        ).on("finish", () => res.send("ok"));
    });
    app.post("/news/delete", (req, res) => {
        console.log("delete", req.body);
        let query = `DELETE FROM news WHERE news_id = ${req.body.id}`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log("Error delete news! ", err);
            }
            console.log("Succes! delete");
            res.send(result);
        });
        if (fs.existsSync(path + "/news/" + req.body.image)) {
            fs.unlink(path + "/news/" + req.body.image, (err) => {
                if (err) throw err;
                console.log("File was deleted");
            });
        }
    });
};