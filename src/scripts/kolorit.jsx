import React from 'react';
import ReactDOM from 'react-dom';

export const koloritMenu = url => () => {

    function koloritGetMenu() {
        fetch(url + 'kolorit/menu/all')
            .then(response => response.json())
            .then(data => {
                koloritGetMenuHtml(data);
            });
    }

    function koloritGetMenuHtml(data) {
        let htmlText =
            <>
                <h2>Меню</h2>
                {data.map((element) =>
                    <article className="building-menu">
                        {koloritGetMenuHtmlImage(element)}
                        <div className="description">
                            <h3>{element.name}</h3>
                            <p>{element.description}</p>
                        </div>
                    </article>
                )}
            </>
        ReactDOM.render(htmlText, document.getElementById('kolorit-menu'));
    }

    function koloritGetMenuHtmlImage(element) {
        const image = require(`../images/kolorit/${element.image}`);
        return <img src={'/' + image.default} alt="picture" className="building-menu-img" />
    }
    koloritGetMenu();
}

export const koloritMain = url => () => {

    function koloritGetMainText(){
        fetch(url + 'kolorit/main/get-text')
            .then(response => response.json())
            .then(data => {
                document.getElementById('kolorit-main-text').innerHTML = data[0].value;
            });
    }

    koloritGetMainText();
}