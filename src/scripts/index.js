import { main as mainScript } from './main';
import { news as newsScript } from './news';
import { koloritMenu as koloritScriptMenu, koloritMain as koloritScriptMain } from './kolorit';
import { kolibaMenu as kolibaScriptMenu, kolibaMain as kolibaScriptMain } from './koliba';
import { harchevMenu as harchevScriptMenu, harchevMain as harchevScriptMain } from './harchev';
import { podvirjaMenu as podvirjaScriptMenu, podvirjaMain as podvirjaScriptMain } from './podvirja';
import { footer as footerScript } from './footer';
import { about as aboutScript } from './about';
import { contacts as contactsScript } from './contacts';

const url = new URL("http://localhost:8080/");

export const main = mainScript(url);
export const news = newsScript(url);
export const koloritMenu = koloritScriptMenu(url);
export const koloritMain = koloritScriptMain(url);
export const kolibaMenu = kolibaScriptMenu(url);
export const kolibaMain = kolibaScriptMain(url);
export const harchevMenu = harchevScriptMenu(url);
export const harchevMain = harchevScriptMain(url);
export const podvirjaMenu = podvirjaScriptMenu(url);
export const podvirjaMain = podvirjaScriptMain(url);
export const footer = footerScript(url);
export const about = aboutScript(url);
export const contacts = contactsScript(url);