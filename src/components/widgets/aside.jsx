import { Link } from 'react-router-dom';

export const Aside = (buildingName) =>
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
        <ul className="nav archives touch" id="myTab" role="tablist">
          <li>
            <h3>Сторінки закладу</h3>
          </li>
          <li><Link to={"/" + buildingName + ""} className="logo-caption">Головна</Link></li>
          <li><Link to={"/" + buildingName + "/about"} className="logo-caption">Про заклад</Link></li>
          <li><Link to={"/" + buildingName + "/menu"} className="logo-caption">Каталог</Link></li>
        </ul>
      </label>
    </nav>
  </aside>;
