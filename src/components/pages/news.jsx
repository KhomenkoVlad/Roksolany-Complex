import { news } from '../../scripts/index';

export const News = () =>
    <main className="other-main">
        <aside>
            <nav>
                <input type="checkbox" id="checkbox-archives" />
                <label htmlFor="checkbox-archives">
                    <span className="toggle">
                        <i className="fas fa-bars" />
                    </span>
                    <span className="toggle close-toggle">
                        <i className="fas fa-times" />
                    </span>
                    <ul className="archives touch">
                        <li>
                            <h3>Архів</h3>
                        </li>
                        <div id="news-archive">
                        </div>
                    </ul>
                </label>
            </nav>
        </aside>
        <section id="loading-one-news">
            <h2>Новини</h2>
            <div id="loading-news">
            </div>
            <div id="buttons-for-page">
                <button id="button-page-previous">Попередні</button>
                <button id="button-page-next">Наступні</button>
            </div>
        </section>
        {news()}
    </main>;

