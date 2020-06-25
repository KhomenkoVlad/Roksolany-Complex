import adminPanelKolorit from './kolorit';
import adminPanelKoliba from './koliba';
import adminPanelHarchev from './harchev';
import adminPanelPodvirja from './podvirja';
import adminPanelBooking from './booking';
import adminPanelNews from './news';
import adminPanelFooter from './footer';
import adminPanelAbout from './about';
import adminPanelPassword from './password';
import logout from './logout';

const url = new URL("http://localhost:8080/");

adminPanelKolorit(url);
adminPanelKoliba(url);
adminPanelHarchev(url);
adminPanelPodvirja(url);
adminPanelBooking(url);
adminPanelNews(url);
adminPanelFooter(url);
adminPanelAbout(url);
adminPanelPassword(url);
logout(url);