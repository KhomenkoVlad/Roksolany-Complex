const newsButtonForFullPage = document.getElementsByClassName('news-page-full');
const newsArchiveList = document.getElementsByClassName('archive-news-month');
import ReactHtmlParser from 'react-html-parser';
import ReactDOM from 'react-dom';
import React from 'react';

export const news = url => () => {
  function newsGetAllID() {
    fetch(url + "news/all-count-id")
      .then(response => response.json())
      .then(data => {
        newsMakePages(data[0].counted);
      });
  }

  function newsGetAllDateForArchive() {
    fetch(url + "news/all-archive")
      .then(response => response.json())
      .then(data => {
        newsMakeArchive(data);
      })
      .then(() => {
        Array.from(newsArchiveList).forEach(element => {
          element.addEventListener('click', newsGetArchiveMonth, false);
        });
      });
  }

  function newsMakePages(countedAll) {
    let numberOfNewsPerPage = 2;
    let numberOfPages = Math.ceil(countedAll / numberOfNewsPerPage);
    let currentPage = 1;
    newsGetAllOnPage(currentPage, numberOfNewsPerPage);
    document.getElementById('button-page-previous').addEventListener('click', () => {
      if (currentPage > 1) {
        newsGetAllOnPage(--currentPage, numberOfNewsPerPage);
      }
    });
    document.getElementById('button-page-next').addEventListener('click', () => {
      if (currentPage < numberOfPages) {
        newsGetAllOnPage(++currentPage, numberOfNewsPerPage);
      }
    });
  }

  function newsGetAllOnPage(currentPage, numberOfNewsPerPage) {
    document.getElementById('buttons-for-page').style = 'display: block';
    let req = {
      from: (currentPage * numberOfNewsPerPage) - numberOfNewsPerPage,
      to: numberOfNewsPerPage
    }
    fetch(url + "news/page", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    })
      .then(response => response.json())
      .then(data => {
        newsPostedInHtml(data);
      })
      .then(() => {
        Array.from(newsButtonForFullPage).forEach(element => {
          element.addEventListener('click', () => document.location.assign(`${window.location.href}?id=` + element.value), false);
        });
      });
  }

  let newsGetFullPage = function (idNews) {
    let req = {
      id: idNews
    }
    fetch(url + "news/id", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    })
      .then(response => response.json())
      .then(data => {
        newsPostedInHtmlFullPage(data);
      })
  }

  function newsMakeArchive(dateArray) {
    document.getElementById('buttons-for-page').style = 'display: none';
    let archiveHtml = '', arrayOfMonth = [];
    dateArray.forEach((element) => {
      let date = new Date(element.date);

      let dateText = date.toLocaleString('ua', { year: 'numeric', month: 'long' });
      dateText = dateText.charAt(0).toUpperCase() + dateText.slice(1);

      if (!arrayOfMonth.find(el => el === dateText)) {
        arrayOfMonth.push(dateText);
        archiveHtml += `<li><a class="archive-news-month" href="news?year=${date.getFullYear()}&month=${date.getMonth() + 1}">${dateText}</a></li>`;
      }
    });
    document.getElementById('news-archive').innerHTML = archiveHtml;
  }

  let newsGetArchiveMonth = function (years, months) {
    let req = {
      month: months,
      year: years
    };
    fetch(url + "news/archive-month", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    })
      .then(response => response.json())
      .then(data => {
        newsPostedInHtml(data);
      })
      .then(() => {
        Array.from(newsButtonForFullPage).forEach(element => {
          element.addEventListener('click', () => document.location.assign('news' + '?id=' + element.value), false);
        });
      });
  }

  function newsPostedInHtml(data) {
    let NewsHtmlNews =
      <>
        {data.map((element) =>
          <article>
            <h3>{element.caption}</h3>
            {newsPostedInHtmlImage(element)}
            <p>{ReactHtmlParser(postedShortText(element.text))}</p>
            <button className="news-page-full" value={element.news_id}>Далі</button>
            <span className="posted-on">
              Публіковано
            <time dateTime={element.date}>{postedDateTimeFormat(element.date)}</time>
            </span>
          </article>
        )}
      </>
    ReactDOM.render(NewsHtmlNews, document.getElementById('loading-news'));
  }

  function newsPostedInHtmlImage(element) {
    const image = require(`../images/news/${element.image}`);
    return <img src={image.default} alt="picture" />
  }

  function newsPostedInHtmlFullPage(data) {
    let htmlNews =
      <>
        {data.map((element) =>
          <article>
            {newsPostedInHtmlImage(element)}
            <h3>{element.caption}</h3>
            <p>{ReactHtmlParser(element.text)}</p>
            <button id="button-back-loading-news">До новин</button>
            <span className="posted-on">
              Публіковано 
            <time dateTime="${element.date}">{postedDateTimeFormat(element.date)}</time>
            </span>
          </article>
        )}
      </>
    ReactDOM.render(htmlNews, document.getElementById('loading-one-news'));

    document.getElementById('button-back-loading-news').addEventListener('click', () => {
      document.location.assign('news');
    });
  }

  function newsGetPageFromMain() {
    fetch(url + "news/id-from-main")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        newsPostedInHtmlFullPage(data);
      });
  }

  function postedDateTimeFormat(date) {
    return ' ' + new Date(date).toLocaleString('ua', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  function postedShortText(text) {
    return text.substr(0, text.indexOf('<p>', 2));
  }

  var newsGetParams = function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  };

  newsGetAllDateForArchive();
  const params = newsGetParams(window.location.href);
  console.log(params);
  if (params.year && params.month) {
    newsGetArchiveMonth(params.year, params.month);
  } else {
    params.id
      ? newsGetFullPage(params.id)
      : newsGetAllID();
  }
}