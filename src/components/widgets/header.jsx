import { Link } from 'react-router-dom'
import { headerImages } from '../../images/image';

export const Header = () =>
  <header>
    <div className="site-header__wrap">
      <div>
        <ul className="logo">
          <li><Link to="/"><img src={'/' + headerImages.headerLogo} alt="logo" className="logo-img" id="logo-img" /></Link></li>
          <li><Link to="/" className="logo-caption">Роксолани</Link></li>
        </ul>
      </div>
      <div>
        <nav>
          <input type="checkbox" id="checkbox-menu" />
          <label htmlFor="checkbox-menu">
            <ul className="menu touch">
              <li><Link to="/">Головна</Link></li>
              <li><Link to="/about">Про комплекс</Link></li>
              <li><Link to="/news">Новини</Link></li>
              <li><Link to="/contacts">Контакти</Link></li>
            </ul>
            <span className="toggle">☰</span>
          </label>
        </nav>
      </div>
    </div>
  </header>