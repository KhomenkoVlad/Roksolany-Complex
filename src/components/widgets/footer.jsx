import { footer } from '../../scripts/index';
import {
  Link
} from 'react-router-dom'

export const Footer = () =>
  <footer>
    <div className="site-footer__wrap">
      <div className="describtion footer-item">
        <Link to="/" className="logo-caption">Роксолани</Link>
        <p>
          Нашою метою є зробити ваше життя краще та щасливіше. Ми наполенливо будемо
          працювати заради цього, ми не здамося.
  </p>
      </div>
      <div className="contact-us footer-item">
        <h2>Наші контакти</h2>
        <ul>
          <li>
            <i className="fas fa-envelope" /><span id='footer-email'></span></li>
          <li>
            <i className="fas fa-phone-alt" /><span id='footer-phone'></span></li>
          <li>
            <i className="fas fa-home" /><span id='footer-adress'></span></li>
        </ul>
      </div>
      <nav className="footer-item">
        <ul className="menu-footer">
          <li><Link to="/">Головна</Link></li>
          <li><Link to="/about">Про комплекс</Link></li>
          <li><Link to="/news">Новини</Link></li>
          <li><Link to="/contacts">Контакти</Link></li>
          <li>
            <a href="/kolorit">Ресторан</a>
          </li>
          <li>
            <a href="/koliba">Колиба</a>
          </li>
          <li>
            <a href="/harchev">Харчевня</a>
          </li>
          <li>
            <a href="/podvirja">Готель</a>
          </li>
        </ul>
      </nav>
      <div className="footer-copyright">
        <p>Copyright © 2020 All rights reserved by <a href="https://github.com/KhomenkoVlad">Khomenko Vlad</a></p>
        <ul>
          <li>
            <a href="https://www.facebook.com">
              <i className="fab fa-facebook-f" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com">
              <i className="fab fa-twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com">
              <i className="fab fa-instagram" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    {footer()}
  </footer>;
