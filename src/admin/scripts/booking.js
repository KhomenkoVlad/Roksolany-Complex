const bookingDeleteButtons = document.getElementsByClassName('booking-delete');

export default function adminPanelBooking(url) {

    function bookingGetAllRecords() {
        let req = {
            date: document.getElementById('podvirja-date').value
        };
        fetch(url + 'booking/all')
            .then(response => response.json())
            .then(data => {
                bookingGetAllRecordsHtml(data);
            }).then(() => {
                Array.from(bookingDeleteButtons).forEach(element => {
                    element.addEventListener('click', bookingDeleteOneRecord, false);
                });
            });
    }

    function bookingGetAllRecordsByDay() {
        let req = {
            date: document.getElementById('podvirja-date').value
        };
        fetch(url + 'booking/all-by-day', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        })
            .then(response => response.json())
            .then(data => {
                bookingGetAllRecordsHtml(data);
            }).then(() => {
                Array.from(bookingDeleteButtons).forEach(element => {
                    element.addEventListener('click', bookingDeleteOneRecord, false);
                });
            });
    }

    function bookingGetAllRecordsHtml(data) {
        let html = '';
        data.forEach(element => {
            html += `
                <tr>
                    <th>${element.booking_id}</th>
                    <td>${parseFromDateToString(element.arrival_date)}</td>
                    <td>${parseFromDateToString(element.departure_date)}</td>
                    <td>${element.room}</td>
                    <td>${element.name}</td>
                    <td>${element.phone}</td>
                    <td>${element.email}</td>
                    <td>
                        <button class="booking-delete" value="${[element.booking_id, element.client_id]}">
                            <span><i class="fas fa-times"></i></span>
                        </button>
                    </td>
                </tr>`;
        });
        document.getElementById('booking-table-by-date').innerHTML = html;
    }

    let bookingDeleteOneRecord = function () {
        let values = this.value.split(',', 2);
        let req = {
            booking_id: values[0],
            client_id: values[1]
        };
        fetch(url + 'booking/delete-one', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(req)
        }).then(() => {
            bookingGetAllRecords();
        });
    }

    function parseFromDateToString(oldDate) {
        let date = new Date(oldDate);
        let newDate = new Date(date.toDateString());
        let dd = newDate.getDate();
        let mm = newDate.getMonth() + 1;
        let yyyy = newDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return newDate = yyyy + '-' + mm + '-' + dd;
    }

    window.addEventListener('load', () => {
        bookingGetAllRecords()
    });

    document.getElementById('podvirja-date').addEventListener('change', () => {
        bookingGetAllRecordsByDay();
    });

}