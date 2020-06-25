import { Route, Switch } from 'react-router-dom';
import { homeImages } from '../images/image';

import { Header } from './widgets/header';
import { Footer } from './widgets/footer';

import { Home } from './pages/index';
export const HomePage = () =>
  <>
    <div className="site-header-index">
      <Header />
    </div>
    <div className="background-picture">
      <img src={homeImages.homeBackgroundPicture} />
    </div>
    <Home>
      <Footer />
    </Home>
  </>

export const SimplePage = ({ children }) =>
  <>
    <Header />
    {children}
    <Footer />
  </>

import { About } from './pages/about';
export const AboutPage = () =>
  <SimplePage>
    <About />
  </SimplePage>

import { Contacts } from './pages/contacts';
export const ContactsPage = () =>
  <SimplePage>
    <Contacts />
  </SimplePage>

import { News } from './pages/news';
export const NewsPage = () =>
  <SimplePage>
    <News />
  </SimplePage>

import { Aside } from './widgets/aside';
import { KoloritHome, KoloritMenu, KoloritAbout } from './pages/kolorit.jsx';
export const Kolorit = () =>
  <SimplePage>
    <main className="other-main">
      <Route component={() => Aside('kolorit')} />
      <section className="section-building">
        <Route exact path="/kolorit" component={KoloritHome} />
        <Route path="/kolorit/about" component={KoloritAbout} />
        <Route path="/kolorit/menu" component={KoloritMenu} />
      </section>
    </main>
  </SimplePage>

import { KolibaHome, KolibaAbout, KolibaMenu } from './pages/koliba';
export const Koliba = () =>
  <SimplePage>
    <main className="other-main">
      <Route component={() => Aside('koliba')} />
      <section className="section-building">
        <Route exact path="/koliba" component={KolibaHome} />
        <Route path="/koliba/about" component={KolibaAbout} />
        <Route path="/koliba/menu" component={KolibaMenu} />
      </section>
    </main>
  </SimplePage>

import { HarchevHome, HarchevAbout, HarchevMenu } from './pages/harchev';
export const Harchev = () =>
  <SimplePage>
    <main className="other-main">
      <Route component={() => Aside('harchev')} />
      <section className="section-building">
        <Route exact path="/harchev" component={HarchevHome} />
        <Route path="/harchev/about" component={HarchevAbout} />
        <Route path="/harchev/menu" component={HarchevMenu} />
      </section>
    </main>
  </SimplePage>

import { podvirja } from '../scripts/podvirja';
import { Booking } from './pages/booking';
import { PodvirjaHome, PodvirjaAbout, PodvirjaMenu } from './pages/podvirja';
export const Podvirja = () =>
  <SimplePage>
    <Booking />
    <main className="other-main">
      <Route component={() => Aside('podvirja')} />
      <section className="section-building">
        <Route exact path="/podvirja" component={PodvirjaHome} />
        <Route path="/podvirja/about" component={PodvirjaAbout} />
        <Route path="/podvirja/menu" component={PodvirjaMenu} />
      </section>
    </main>
  </SimplePage>
