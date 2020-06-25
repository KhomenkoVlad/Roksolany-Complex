const kolorit = require('./kolorit');
const koliba = require('./koliba');
const harchev = require('./harchev');
const podvirja = require('./podvirja');
const booking = require('./booking');
const news = require('./news');
const footer = require('./footer');
const about = require('./about');
const password = require('./password');

module.exports = (app, db, pathToImages) => {
    kolorit(app, db, pathToImages);
    koliba(app, db, pathToImages);
    harchev(app, db, pathToImages);
    podvirja(app, db, pathToImages);
    booking(app, db);
    news(app, db, pathToImages);
    footer(app, db);
    about(app, db);
    password(app, db);
};