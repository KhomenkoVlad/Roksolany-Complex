import React from 'react';
import ReactDOM from 'react-dom';

export const kolibaMenu = url => () => {

    function kolibaGetMenu() {
        fetch(url + 'koliba/menu/all')
            .then(response => response.json())
            .then(data => {
                kolibaGetMenutml(data);
            });
    }

    function kolibaGetMenutml(data) {
        let htmlText =
            <>
                <h2>Меню</h2>
                {data.map((element) =>
                    <article className="building-menu">
                        {kolibaGetMenuHtmlImage(element)}
                        <div className="description">
                            <h3>{element.name}</h3>
                            <p>{element.description}</p>
                        </div>
                    </article>
                )}
            </>
        ReactDOM.render(htmlText, document.getElementById('koliba-menu'));
    }

    function kolibaGetMenuHtmlImage(element) {
        const image = require(`../images/koliba/${element.image}`);
        return <img src={'/' + image.default} alt="picture" className="building-menu-img" />
    }

    kolibaGetMenu();
}

export const kolibaMain = url => () => {

    function kolibaGetMainText(){
        fetch(url + 'koliba/main/get-text')
            .then(response => response.json())
            .then(data => {
                document.getElementById('koliba-main-text').innerHTML = data[0].value;
            });
    }

    kolibaGetMainText();
}