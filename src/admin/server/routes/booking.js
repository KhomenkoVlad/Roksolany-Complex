module.exports = (app, db) => {
    app.get('/booking/all', (req, res) => {
        console.log('get all booking', req.body);

        let query = `select booking.booking_id, booking.arrival_date, booking.departure_date, podvirja.name as room, client.client_id, client.name, client.phone, client.email
        from booking, client, podvirja
        where booking.podvirja_podvirja_id = podvirja.podvirja_id and booking.client_client_id = client.client_id
        order by booking_id desc;`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select koliba all!', err);
            }
            res.send(result);
        });
    });

    app.post('/booking/all-by-day', (req, res) => {
        console.log('get all-by-day booking', req.body);

        let query = `select booking.booking_id, booking.arrival_date, booking.departure_date, podvirja.name as room, client.client_id, client.name, client.phone, client.email
                    from booking, client, podvirja
                    where booking.podvirja_podvirja_id = podvirja.podvirja_id and booking.client_client_id = client.client_id and 
                    booking.arrival_date <= "${req.body.date}" and booking.departure_date >= "${req.body.date}";`;

        db.query(query, (err, result) => {
            if (err) {
                return console.log('Error select koliba all!', err);
            }
            res.send(result);
        });
    });

    app.post('/booking/create', (req, res) => {
        console.log('create client', req.body);

        const queryLimit = `              
        select SUM(quantity - max_count) as count_limit
        from 
        (
            select MAX(count_booking) as max_count
            from 
            (
                select count(booking.booking_id) as count_booking
                from booking, podvirja
                where booking.podvirja_podvirja_id = podvirja.podvirja_id and 
                booking.arrival_date <= "${req.body.input}" and booking.departure_date >= "${req.body.input}" and
                podvirja.podvirja_id = "${req.body.podvirja_id}" 
                union
                
                select count(booking.booking_id)
                from booking, podvirja
                where booking.podvirja_podvirja_id = podvirja.podvirja_id and 
                booking.arrival_date <= "${req.body.output}" and booking.departure_date >= "${req.body.output}" and
                podvirja.podvirja_id = "${req.body.podvirja_id}" 
                union
                
                select count(booking.booking_id)
                from booking, podvirja
                where booking.podvirja_podvirja_id = podvirja.podvirja_id and 
                booking.arrival_date >= "${req.body.input}" and booking.departure_date <= "${req.body.output}" and
                podvirja.podvirja_id = "${req.body.podvirja_id}"
            ) as count_booking
        ) as max_count,
        (
			select quantity
			from podvirja
			where podvirja.podvirja_id = "${req.body.podvirja_id}"
        ) as quantity;`

        db.query(queryLimit, (err, result) => {
            if (err) {
                return console.log('Error limit room ', err);
            }
            if (result[0].count_limit > 0) {
                let queryClient = `INSERT INTO client(name, phone, email) VALUES('${req.body.name}', '${req.body.phone}', '${req.body.email}');`;
                db.query(queryClient, (err, result) => {
                    if (err) {
                        return console.log('Error create client ', err);
                    }
                    console.log('Succes! create client ');

                    let queryBooking = `INSERT INTO booking(arrival_date, departure_date, podvirja_podvirja_id, client_client_id) 
            VALUES('${req.body.input}', '${req.body.output}', '${req.body.podvirja_id}', '${result.insertId}');`;
                    db.query(queryBooking, (err, result) => {
                        if (err) {
                            return console.log('Error create booking ', err);
                        }
                        console.log('Succes! create booking');
                        res.send(true);
                    });
                });
            } else {
                res.send(false);
            }
        });
    });

    app.post('/booking/delete-one', (req, res) => {
        console.log('create client', req.body);

        let queryBooking = `DELETE FROM booking WHERE booking_id = ${req.body.booking_id};`;
        db.query(queryBooking, (err, result) => {
            if (err) {
                return console.log('Error delete booking ', err);
            }
            console.log('Succes! delete booking');

            let queryDeleteClient = `DELETE FROM client WHERE client_id = ${req.body.client_id};`;
            db.query(queryDeleteClient, (err, result) => {
                if (err) {
                    return console.log('Error delete client ', err);
                }
                console.log('Succes! delete client ');

                res.send(result);
            });
        });
    });
};