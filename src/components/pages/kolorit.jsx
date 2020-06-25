import { koloritMain, koloritMenu } from '../../scripts/index';
import { koloritImages } from '../../images/image';

export const KoloritHome = () =>
    <div>
        <h2>Ресторан «Закарпатський колорит»</h2>
        <article className="building-index">
            <img src={'/' + koloritImages.koloritLogo} alt="logo" id="building-logo" />
            <div className="description" id='kolorit-main-text'>

            </div>
        </article>
        {koloritMain()}
    </div>;

export const KoloritAbout = () =>
    <>
        <h2>Про ресторан</h2>
        <article className="building-about">
            <p>Інтер'єр ресторану створений у національному стилі .</p>
            <img src={'/' + koloritImages.koloritAbout1} alt className="building-about-img" />
            <img src={'/' + koloritImages.koloritAbout2} alt className="building-about-img" />
            <img src={'/' + koloritImages.koloritAbout3} alt className="building-about-img" />
            <p>Обслуговуючий персонал ресторану має уніформу . Вона з елементами
                українського національного одягу Закарпаття .</p>
            <img src={'/' + koloritImages.koloritAbout4} alt className="building-about-img" />
        </article>
    </>;

export const KoloritMenu = () =>
    <div className="list-menu" id="kolorit-menu">
        {koloritMenu()}
    </div>;