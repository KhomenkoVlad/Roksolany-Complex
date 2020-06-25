import React from 'react';
import ReactDOM from 'react-dom';

const bookingButtons = document.getElementsByClassName('booking-button');

export const podvirjaMenu = url => () => {
  function bookingGetAllMenu() {
    fetch(url + 'podvirja/menu/all')
      .then(response => response.json())
      .then(data => { bookingGetAllMenuHtml(data) })
      .then(() => {
        Array.from(bookingButtons).forEach(element => {
          element.addEventListener('click', showForm, false);
        });
      });
  }

  function bookingGetAllMenuHtml(data) {
    let htmlText =
      <>
        <h2>Каталог номерів</h2>
        {data.map((element) =>
          <article className="building-menu">
            {bookingGetAllMenuHtmlImage(element)}
            <div className="description">
              <h3>{element.name}</h3>
              <p>Площа: {element.area} кв.м</p>
              <p>{element.room}</p>
              <p>{element.bathroom}</p>
              <p>{element.description}</p>
              <p>Ціна: <b>{element.price}</b> грн.</p>
            </div>
            <div className="building-buttons">
              <button className="booking-button" value={element.podvirja_id} data-name={element.name}>
                Замовити
              </button>
            </div>
          </article>
        )}
      </>
    ReactDOM.render(htmlText, document.getElementById('podvirja-menu'));
  }

  function bookingGetAllMenuHtmlImage(element) {
    const image = require(`../images/podvirja/${element.image}`);
    return <img src={'/' + image.default} alt="picture" className="building-menu-img" />
  }

  function bookingSubmitOrder() {
    let req = {
      podvirja_id: document.getElementById('podvirja-id').value,
      input: document.getElementById('booking-input').value,
      output: document.getElementById('booking-output').value,
      name: document.getElementById('booking-name').value,
      email: document.getElementById('booking-email').value,
      phone: document.getElementById('booking-phone').value,
    }
    console.log(req);
    fetch(url + 'booking/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    })
      .then(response => response.json())
      .then(numberOfRoomsLeft => {
        document.getElementById('booking-form').style = "display: none;";
        document.getElementById('booking-confirm').style = "display: block;";
        if (numberOfRoomsLeft) {
          document.getElementById('booking-confirm').innerHTML = "Ваше замовлення прийнято!";
          bookingSendEmailToHotel();
          bookingSendEmailToClient();
        } else {
          document.getElementById('booking-confirm').innerHTML = "Всі номери на ці дати заброньовані. Оберіть інші дати або номери.";
        }
      });
  }

  function bookingSendEmailToHotel() {
    let textBooking = `Нове Замовлення:
  Тип кімнати: ${document.getElementById('booking-room').innerHTML}
  Дата заїзду: ${document.getElementById('booking-input').value},
  Дата виїзду: ${document.getElementById('booking-output').value},
  Ім'я клієнта: ${document.getElementById('booking-name').value},
  Електронна пошта клієнта: ${document.getElementById('booking-email').value},
  Номер телефона клієнта: ${document.getElementById('booking-phone').value}`;
    let req = {
      name: document.getElementById('booking-name').value,
      subject: 'Нове Замовлення',
      text: textBooking,
    };
    fetch(url + 'email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    });
  }

  function bookingSendEmailToClient() {
    let textBooking = `Ваше Замовлення у Готелі «Сільське подвір’я»:
  Тип кімнати: ${document.getElementById('booking-room').innerHTML}
  Дата заїзду: ${document.getElementById('booking-input').value},
  Дата виїзду: ${document.getElementById('booking-output').value}

  Дякуємо!`;
    let req = {
      name: document.getElementById('booking-name').value,
      email: document.getElementById('booking-email').value,
      subject: 'Ваше Замовлення',
      text: textBooking,
    };
    fetch(url + 'email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    });
  }

  let showForm = function () {
    document.getElementById('booking-background').style = "display: flex;";
    document.getElementById('booking-room').innerHTML = this.getAttribute('data-name');
    document.getElementById('podvirja-id').value = this.getAttribute('value');
    document.documentElement.style = 'overflow-y:hidden';
    getTodayDate();
  }

  function closeForm() {
    document.getElementById('booking-background').style = 'display: none;';
    document.documentElement.style = 'overflow-y:visible';
  }

  function getTodayDate() {
    let today = new Date();
    document.getElementById('booking-input').setAttribute("min", parseFromDateToString(today));
  }

  function getNextDayAfterDateInput() {
    let nextDay = new Date(document.getElementById('booking-input').value);
    nextDay.setDate(nextDay.getDate() + 1);
    return parseFromDateToString(nextDay);
  }

  function parseFromDateToString(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    return date = yyyy + '-' + mm + '-' + dd;
  }

  window.addEventListener('load', () => {
    document.getElementById('booking-input').addEventListener('change', () => {
      document.getElementById('booking-output').setAttribute("min", getNextDayAfterDateInput());
    });

    document.getElementById('booking-close').addEventListener('click', () => {
      closeForm();
    });

    document.getElementById('booking-submit').addEventListener('click', event => {
      if (document.getElementById('booking-input').validity.valid && document.getElementById('booking-output').validity.valid &&
        document.getElementById('booking-name').validity.valid && document.getElementById('booking-email').validity.valid &&
        document.getElementById('booking-phone').validity.valid) {
        bookingSubmitOrder();
      }
      event.preventDefault();
    });

    document.getElementById('booking-confirm').addEventListener('click', () => {
      closeForm();
      document.getElementById('booking-form').style = "display: block;";
      document.getElementById('booking-confirm').style = "display: none;";
    });
  });

  bookingGetAllMenu();
}

export const podvirjaMain = url => () => {

  function podvirjaGetMainText() {
    fetch(url + 'podvirja/main/get-text')
      .then(response => response.json())
      .then(data => {
        document.getElementById('podvirja-main-text').innerHTML = data[0].value;
      });
  }

  podvirjaGetMainText();
}