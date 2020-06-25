const newsMainLinkForFullPage = document.getElementsByClassName('news-main-page-full');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactHtmlParser from 'react-html-parser';

export const main = url => () => {

  function newsGetThreeForMainPage() {
    fetch(url + "news/main-page")
      .then(response => response.json())
      .then(data => {
        newsMainPostedInHtml(data);
      }).then(() => {
        Array.from(newsMainLinkForFullPage).forEach(element => {
          element.addEventListener('click', newsFromMainToFullPage, false);
        });
      });
  }

  function newsMainPostedInHtml(data) {
    let mainHtmlNews =
      <section id="news-main">
        <h2>Новини</h2>
        {data.map((element) =>
          <article>
            {newsMainPostedInHtmlImage(element)}
            <h3>{element.caption}</h3>
            <p>{postedShortText(element.text)}</p>
            <a className="news-main-page-full" data-id={element.news_id}>Далі</a>
          </article>
        )}
      </section>
    ReactDOM.render(mainHtmlNews, document.getElementById('news'));
  }

  function newsMainPostedInHtmlImage(element) {
    const image = require(`../images/news/${element.image}`);
    return <img src={image.default} alt="picture" />
  }

  let newsFromMainToFullPage = function () {
    let req = {
      id: this.getAttribute('data-id')
    };
    fetch(url + "news/main-full-page", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req)
    }).then(() => {
      document.location.assign('news?id=' + req.id);
    });

  }

  function postedShortText(text) {
    return ReactHtmlParser(text.substr(0, text.indexOf('<p>', 2)));
  }

  newsGetThreeForMainPage();
}