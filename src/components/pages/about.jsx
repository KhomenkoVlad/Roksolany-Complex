import { about } from '../../scripts/index'
import { homeImages } from '../../images/image';

export const About = () =>
    <main className="about-main">
        <div className="features">
            <hgroup>
                <h2>Ласкаво просимо!</h2>
                <h3>Ми прагнемо захищати та вдосконалювати наше середовище</h3>
            </hgroup>
            <section>
                <article>
                    <img src={homeImages.homeIcon1} alt="icon" />
                    <h3>Чудовий клімат</h3>
                    <p>
                        Комплекс розташований поблизу моря, що сприяє більш теплому та
                        вологому клімату, впилаючи на ваше самопочуття.
      </p>
                </article>
                <article>
                    <img src={homeImages.homeIcon2} alt="icon" />
                    <h3>Гарна природа</h3>
                    <p>
                        Завдяки розташуванню комплекса на берегу Дністровського ліману, ви
                        можете спостерігати неймовірні пейзахі.
      </p>
                </article>
                <article>
                    <img src={homeImages.homeIcon3} alt="icon" />
                    <h3>Надійність</h3>
                    <p>
                        Ми вам обіцяймо надання якісних послуг та комфортних умов для
                        проживання у нашому комплексі.
      </p>
                </article>
                <article>
                    <img src={homeImages.homeIcon4} alt="icon" />
                    <h3>Найкращий відпочинок</h3>
                    <p>
                        В нас працюють найкращі спеціалісти усіх сфер, що можуть гарантувати
                        вам професійне лікування.
      </p>
                </article>
            </section>
        </div>
        <div className="about-us">
            <section>
                <h2>Декілька слів про наш комплекс</h2>
                <img src={homeImages.homeBackgroundPicture} alt />
                <p><span id='about-text'></span></p>
            </section>
        </div>
        {about()}
    </main>;