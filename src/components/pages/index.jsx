import { Link } from 'react-router-dom'
import { homeImages } from '../../images/image';
import { main } from '../../scripts/index';

export const Home = ({ children }) =>
    <main className="index-main">
        <div className="main-title">
            <h1>РОКСОЛАНИ</h1>
            <h2>ГОТЕЛЬНО-РЕСТОРАНИЙ КОМПЛЕКС</h2>
        </div>
        <div className="building">
            <section>
                <Link to="/kolorit" className="logo-caption">
                    <article>
                        <h2>Ресторан «Закарпатський колорит»</h2>
                        <p>Смачна кухня і міцна випивка – ось неповний опис того, заради чого
                            варто побувати в нашому ресторані.</p>
                        <img src={homeImages.homeKolrit} alt="restorant" />
                    </article>
                </Link>
                <Link to="/koliba" className="logo-caption">
                    <article>
                        <h2>Колиба «Хуторок»</h2>
                        <p>Гарне обслуговування і смачна кухня робить колибу «Хуторок»
                        найкращим місцем для місце для сімейних застіль, дружніх зустрічей і
                            поїсти.</p>
                        <img src={homeImages.homeKoliba} alt="restorant" />
                    </article>
                </Link>
                <Link to="/harchev" className="logo-caption">
                    <article>
                        <h2>Харчевня</h2>
                        <p>Гостинність і комфорт вдало поєднується з простою, зрозомілою, але,
                            одночасно, вишуканею кухнею. Ласкаво просимо до нас!</p>
                        <img src={homeImages.homeHarchev} alt="restorant" />
                    </article>
                </Link>
                <Link to="/podvirja" className="logo-caption">
                    <article>
                        <h2>Готель «Сільське подвір’я»</h2>
                        <p id="four">Сільське подвір’я – готель для сімейного відпочинку в оточенні
                            українського села з можливістю доторкнутись до історії.</p>
                        <img src={homeImages.homePodvirja} alt="restorant" />
                    </article>
                </Link>
            </section>
        </div>
        <div className="features">
            <hgroup>
                <h2>Ласкаво просимо!</h2>
                <h3>Ми прагнемо захищати та вдосконалювати наше середовище</h3>
            </hgroup>
            <section>
                <article>
                    <img src={homeImages.homeIcon1} alt="icon" />
                    <h3>Чудовий клімат</h3>
                    <p>Комплекс розташований поблизу моря, що сприяє більш теплому та
                        вологому клімату, впилаючи на ваше самопочуття.</p>
                </article>
                <article>
                    <img src={homeImages.homeIcon2} alt="icon" />
                    <h3>Гарна природа</h3>
                    <p>Завдяки розташуванню комплекса на берегу Дністровського ліману, ви
                        можете спостерігати неймовірні пейзахі.</p>
                </article>
                <article>
                    <img src={homeImages.homeIcon3} alt="icon" />
                    <h3>Надійність</h3>
                    <p>Ми вам обіцяймо надання якісних послуг та комфортних умов для
                        проживання у нашому комплексі.</p>
                </article>
                <article>
                    <img src={homeImages.homeIcon4} alt="icon" />
                    <h3>Найкращий відпочинок</h3>
                    <p>В нас працюють найкращі спеціалісти усіх сфер, що можуть гарантувати
                        вам професійне лікування.</p>
                </article>
            </section>
        </div>
        <div className="news" id="news">
            <section id="news-main">
                {main()}
            </section>
        </div>
        {children}
    </main>;
