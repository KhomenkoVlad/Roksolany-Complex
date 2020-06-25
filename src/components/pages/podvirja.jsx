import { podvirjaMain, podvirjaMenu } from '../../scripts/index';
import { podvirjaImages } from '../../images/image';

export const PodvirjaHome = () =>
    <div>
        <h2>Готель «Сільське подвір’я»</h2>
        <article className="building-index">
            <img src={'/' + podvirjaImages.podvirjaLogo} alt="logo" id="building-logo" />
            <div className="description" id="podvirja-main-text"></div>
        </article>
        {podvirjaMain()}
    </div>;

export const PodvirjaAbout = () =>
    <div>
        <h2>Про готель</h2>
        <article className="building-about">
            <p>У приведеній схемі ви можете побачити всі послуги, які ми надаємо.</p>
            <img src={'/' + podvirjaImages.podvirjaSchema} alt className="building-about-img" />
            <p>У нашому комплексі ви зможете відвідати свуну та баню.</p>
            <img src={'/' + podvirjaImages.podvirjaSauna} alt className="building-about-img" />
            <img src={'/' + podvirjaImages.podvirjaBanja} alt className="building-about-img" />
            <p>Також є послуга масажу.</p>
            <img src={'/' + podvirjaImages.podvirjaMassage} alt className="building-about-img" />
            <p>
                Якщо бажаєте насолодитися Дністровським лиманом, можете орендувати катер.
  </p>
            <img src={'/' + podvirjaImages.podvirjaBoat} alt className="building-about-img" />
            <p>Або ж покататися на конях.</p>
            <img src={'/' + podvirjaImages.podvirjaHorses} alt className="building-about-img" />
            <p>Для дітей є дитячий майданчик.</p>
            <img
                src={'/' + podvirjaImages.podvirjaPlace}
                alt
                className="building-about-img"
            />
            <p>На території комплексу є вулики та апідомік.</p>
            <img src={'/' + podvirjaImages.podvirjaHive1} alt className="building-about-img" />
            <img src={'/' + podvirjaImages.podvirjaHive2} alt className="building-about-img" />
            <p>У готелі є ресторан і бар.</p>
            <img
                src={'/' + podvirjaImages.podvirjaRestorant}
                alt
                className="building-about-img"
            />
        </article>
    </div>;

export const PodvirjaMenu = () =>
    <div className="list-menu" id="podvirja-menu">
        {podvirjaMenu()}
    </div>;