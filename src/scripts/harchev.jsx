import React from 'react';
import ReactDOM from 'react-dom';

export const harchevMenu = url => () => {

    function harchevGetMenu() {
        fetch(url + 'harchev/menu/all')
            .then(response => response.json())
            .then(data => {
                harchevGetMenuHtml(data);
            });
    }

    function harchevGetMenuHtml(data) {
        let htmlText =
            <>
                <h2>Меню</h2>
                {data.map((element) =>
                    <article className="building-menu">
                        {harchevGetMenuHtmlImage(element)}
                        <div className="description">
                            <h3>{element.name}</h3>
                            <p>{element.description}</p>
                        </div>
                    </article>
                )}
            </>
        ReactDOM.render(htmlText, document.getElementById('harchev-menu'));
    }

    function harchevGetMenuHtmlImage(element) {
        const image = require(`../images/harchev/${element.image}`);
        return <img src={'/' + image.default} alt="picture" className="building-menu-img" />
    }

    harchevGetMenu();
}

export const harchevMain = url => () => {

    function harchevGetMainText(){
        fetch(url + 'harchev/main/get-text')
            .then(response => response.json())
            .then(data => {
                document.getElementById('harchev-main-text').innerHTML = data[0].value;
            });
    }

    harchevGetMainText();
}