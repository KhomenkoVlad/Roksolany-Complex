-- MySQL Script generated by MySQL Workbench
-- Thu Jun 25 13:30:23 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema roksolany
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema roksolany
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `roksolany` DEFAULT CHARACTER SET utf8 ;
USE `roksolany` ;

-- -----------------------------------------------------
-- Table `roksolany`.`news`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roksolany`.`news` (
  `news_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `image` TEXT NULL,
  `caption` VARCHAR(150) NOT NULL,
  `text` TEXT NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`news_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roksolany`.`podvirja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roksolany`.`podvirja` (
  `podvirja_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `image` TEXT NOT NULL,
  `quantity` SMALLINT NOT NULL,
  `price` DECIMAL(7,2) NOT NULL,
  `area` DECIMAL(5,2) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`podvirja_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roksolany`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roksolany`.`client` (
  `client_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`client_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roksolany`.`booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roksolany`.`booking` (
  `booking_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `arrival_date` DATE NOT NULL,
  `departure_date` VARCHAR(45) NOT NULL,
  `podvirja_podvirja_id` INT UNSIGNED NOT NULL,
  `client_client_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`booking_id`, `podvirja_podvirja_id`, `client_client_id`),
  INDEX `fk_booking_podvirja1_idx` (`podvirja_podvirja_id` ASC) VISIBLE,
  INDEX `fk_booking_client1_idx` (`client_client_id` ASC) VISIBLE,
  CONSTRAINT `fk_booking_podvirja1`
    FOREIGN KEY (`podvirja_podvirja_id`)
    REFERENCES `roksolany`.`podvirja` (`podvirja_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_client1`
    FOREIGN KEY (`client_client_id`)
    REFERENCES `roksolany`.`client` (`client_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roksolany`.`kolorit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roksolany`.`kolorit` (
  `kolorit_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `image` TEXT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`kolorit_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roksolany`.`koliba`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roksolany`.`koliba` (
  `koliba_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `image` TEXT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`koliba_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roksolany`.`harchev`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roksolany`.`harchev` (
  `harchev_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `image` TEXT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`harchev_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roksolany`.`various_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roksolany`.`various_data` (
  `various_data_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `value` TEXT NOT NULL,
  PRIMARY KEY (`various_data_id`))
ENGINE = InnoDB;

USE `roksolany` ;

-- -----------------------------------------------------
--  routine1
-- -----------------------------------------------------

DELIMITER $$
USE `roksolany`$$
$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `roksolany`.`news`
-- -----------------------------------------------------
START TRANSACTION;
USE `roksolany`;
INSERT INTO `roksolany`.`news` (`news_id`, `image`, `caption`, `text`, `date`) VALUES (DEFAULT, 'бархатный сезон.jpg', 'Оксамитовий сезон в Роксоланах', '<p>Одним з показників того, що Ви завбачливий людина, буде не проходження виснажливих психологічних тестів і опитувань, а той факт, що в календарі відпусток Ви записані на вересень-жовтень. Відкладаєте гроші на вигідний відпочинок всередині країни або на території дружніх сусідів, ще в червні вибрали і забронювали всі необхідні квитки і місця - вітаю, Ви далекоглядний господар становища!</p><p>Мудрість у тому, що оксамитовий сезон на землях України - це найкращий спосіб реально відпочити, без комарів, медуз, вітру і проблем. Але такі висновки приходять з досвідом або завдяки гарному раді. Де ж буде цікавіше, приємніше і комфортніше всього і чому? Першокласний вибір - це Примор\'я, де поєднуються кілька екосистем.</p><p>У наш час треба вибирати де провести оксамитовий сезон в Україні на море зовсім з інших міркувань, ніж років п\'ять тому. Справа навіть не в тому, що Крим став менш доступний, але навіть питання національної гостинності на місці відпочинку варто передбачати заздалегідь. Що б дійсно отримати задоволення від відпустки, побути далеко від небезпеки і негараздів краще поїхати в західну частину країни, нехай навіть на узбережжі Чорного моря.</p>', '2020-04-29 22:54:55');
INSERT INTO `roksolany`.`news` (`news_id`, `image`, `caption`, `text`, `date`) VALUES (DEFAULT, 'hotels.jpg', 'Що означають зірки готелів?', '<p>Подорожі, як всередині країни, так і за кордон, мають на увазі проживання в готелі. І тут необхідно мати певну інформаційну базу, щоб правильно вибрати рівень готелю. Загальноприйнятим критерієм оцінки вважається кількість зірок, присуджене закладу, і дає туристу можливість зрозуміти, який рівень комфорту і сервісу на нього чекає.</p><p>Те, що 5-зірковий готель є найкращим, знають всі, але зазвичай на цьому знання і закінчуються. Якщо ви зібралися в подорож вперше, то це питання варто вивчити більш глибоко. Це дозволить в одному випадку уникнути поселення в готель, який не відповідає вашим уявленням про ідеальний проживанні, а в іншому - уникнути непотрібних переплат, що актуально при скромному бюджеті.</p><p>Всі європейські готелі працюють в діапазоні від 3 до 5 зірок. Однак обов\'язково варто згадати і такі рівні, як 1 і 2 зірки, так як вони зустрічаються в інших країнах.</p><p>Однозірковий. Якщо говорити прямо, то це швидше за хостел, ніж готель. Все, що потрібно гостю такого закладу - прийняти душ, як правило, громадський, і переночувати. В європейських хостелах досить чисто й акуратно, в таких люблять селитися студенти, подорожуючи за мінімальний бюджет. А ось в інших країнах публіка може бути самої різношерстої, тому це не кращий вибір, якщо ви подорожуєте сім\'єю або розраховуєте на прийнятний рівень комфорту. Постояльця очікує простий і вельми скромний номер, в якому немає ні санвузла, ні душа, не кажучи вже про таких надлишки як фен або телевізор. Можлива наявність дзеркала, раковини, шафи. Зміна білизни? У кращому випадку - 1 раз в тиждень.</p><p>Двозірковий. Як і в першому варіанті, обстановка вкрай «спартанська», але є і поліпшення. Наприклад, санвузол буде не 1 на весь коридор, а на 4-5 номерів. В будівлі готелю вже передбачена їдальня, що позбавляє проживають від потреби шукати заклади громадського харчування. Цілком можливо, що в номері буде телевізор, правда, без пульта дистанційного керування. Це також не найкращий варіант для сімейних подорожей.</p><p>Тризірковий готель - це вже певний комфорт, на який постоялець може розраховувати. Тут і санвузол в кожному номері, телевізор, холодильник і навіть кондиціонер. Обстановка і ремонт в номері, звичайно, відноситься до економ-класу, але все чисто, акуратно, при цьому вартість проживання досить доступна, завдяки чому, готелі такого рівня є одними з найпопулярніших.</p><p>Чотиризірковий. Це вже серйозна заявка на високий рівень комфорту і обслуговування. У номері є все, що може знадобитися, в тому числі безкоштовний Wi-Fi, сейф, а в самому готелі до послуг постояльців пропонуються тренажерний зал, басейн, парковка. Прибирання номера проводиться щодня, як і зміна білизни. Більш того, чотиризірковий готель може бути не гірше, ніж готель на 5 зірок. Наприклад, вам цілком може зустрітися готель в Одесі, в якій сервіс і комфорт буде відповідати п\'ятизірковому. І тут немає ніякого підступу, просто такий хід дозволяє отримати більше клієнтів, особливо поза сезоном.</p><p>П\'ятизірковий. В принципі, той же рівень, що і в попередньому варіанті, тільки до всього ще додаються: більш просторі номери з шикарним виглядом з вікон, чудове меню в ресторані готелю, наявність додаткових приміщень, наприклад, конференц-залів, косметичні салони, більше кафе і барів.</p>', '2020-05-05 12:21:47');
INSERT INTO `roksolany`.`news` (`news_id`, `image`, `caption`, `text`, `date`) VALUES (DEFAULT, 'reception.jpg', 'Як вести себе в готелі?', '<p>Вперше плануєте виїхати з рідного міста? Цілком ймовірно, що Вам не дають спокою, здавалося б, звичайні питання, наприклад, як варто поводитися в готелі? Готель буде Вашим будинком на час відпустки або відрядження. Якщо Ви виїжджаєте за кордон, то номер в готелі потрібно забронювати заздалегідь. Бронювати краще навіть якщо Ви збираєтеся відвідати сусіднє місто.</p><p>Коли Ви приїдете в готель, насамперед потрібно зареєструватися. Це можна зробити на ресепшені у адміністратора. У кожен готель заселення здійснюється в певний час, як і виселення. Але можна і заздалегідь домовитися з адміністратором по телефону про інший час.</p><p><strong>Поселення до готелю</strong></p><p>Як тільки Ви зайдете в свій номер, не поспішайте розпаковувати валізу. Огляньте кімнату і упевніться, що в\'їхали саме в той місця, за яке заплатили, наприклад, якщо Ви доплачували за номер з видом на море. Якщо щось Вас не влаштовує - повідомте менеджеру по телефону або підійдіть на ресепшен. Претензії можна висловити спокійним тоном, адміністратор переселить Вас в інший номер готелі, який буде відповідати очікуванням.</p><p><strong>Дотримуйтеся простих правил пристойності перебуваючи в готелі</strong></p><p>Перебуваючи в готелі потрібно дотримуватися кількох важливих правил:</p><ul><li>В готелі люди відпочивають, тому намагайтеся не шуміти. Якщо хочете влаштувати вечірку, то краще перенести захід в бар або ресторан.</li><li>Йдучи в ресторан або бар дотримуйтесь дрес-код. Навіть якщо Ви відпочиваєте на морському курорті, то не варто йти на обід або вечерю в плавках або купальнику. Це буде виглядати непристойно. У готелях Єгипту або Туреччини до цього ставляться скептично, але можуть закрити очі, але ось в Європі Вас можуть і не пустити в спортивному костюмі, сланцях чи шортах в ресторан.</li><li>Їду з ресторану виносити не прийнято. Якщо Ви оплатили харчування за однією з систем (все включено, тільки сніданок і вечеря або інші варіанти харчування), але з якихось причин не можете потрапити до вечері / обіду, то повідомте про це адміністратора - в деяких готелях передбачені спеціальні ланч-бокси.</li></ul><p>&nbsp;</p><p><strong>Дотримуйтеся розпорядку готелю</strong></p><p>При заселенні в готель Вам варто уточнити кілька нюансів:</p><ul><li>Графік роботи ресторану. Якщо Ви замовили номер з харчуванням, то запитайте в котрій годині сервіровка завтра, обіду і вечері.</li><li>Час збирання в номерах. Ви любите поспати до обіду? Залиште на двері табличку «Не турбувати», а щоб покоївка прибрала в кімнаті, то повісьте табличку «Будь ласка, заберіть мій номер». Чи не затьмарюйте собі відпочинок і спите скільки забажаєте.</li><li>Якщо Ви оселилися в готелі з басейном, то не рекомендується купатися вночі в ньому. Звичайно ж, для гостей басейн відкритий цілодобово, проте в нічний час запускається система очищення води, тому в ній більше концентрація хімічних речовин.</li></ul>', '2020-05-15 12:34:56');
INSERT INTO `roksolany`.`news` (`news_id`, `image`, `caption`, `text`, `date`) VALUES (DEFAULT, 'restorant.jpg', 'Поведінка в ресторані: як вести себе за столом?', '<p>Як зробити похід в ресторан безпроблемним і приємним заняттям потрібно дотримуватися правил етикету. Правила пристойності в ресторані не сильно відрізняються від загальних норм поведінки за столом. Істотні відмінності полягають в особливостях обстановки - домашній стіл на власній кухні і зал ресторану відрізняються, адже останній це людне місце.</p><p><strong>Основні правила етикету за столом</strong></p><p>Перебуваючи в ресторані дотримуйтеся декількох основних правил поведінки:</p><ul><li>Сидіть за столом невимушено, проте не розвалюється, не ставте на стільницю лікті. Сідайте не надто близько і не дуже далеко від столу. За правилами відстань між столом і Вами повинна дорівнювати одній долоні.</li><li>Щоб поговорити з тим, хто сидів поруч людиною не потрібно розвертатися до нього всім корпусом.</li><li>Серветку покладіть на коліна, попередньо розгорнувши. Серветка захистить костюм або плаття від крихт і крапель. Після трапези покладіть серветку від тарілки справа.</li><li>Чоловіки повинні знімати головні убори, жінки можуть сидіти в капелюсі за столом, але потрібно обов\'язково знімати рукавички.</li><li>Ніж тримають у правій руці, а вилку в лівій. Не тримайте до рота ніж.</li><li>Коли Ви ріжете блюдо ножем, притримуйте його виделкою. Вилку тримайте під нахилом, а не перпендикулярно, так як вона може зісковзнути з тарілки.</li><li>Краще різати м\'ясо або рибу по одному шматочку і є, а не все нарізати відразу.</li><li>Якщо Ви зібралися випивати, то варто це робити тільки після тосту. У великій компанії чокатися не обов\'язково. Можна не повністю випивати напій, досить пригубити. Якщо Ви більше не хочете пити, то ввічливо відмовтеся, а не прикривайте келих рукою або серветкою.</li><li>Перше або бульйон, які подаються в бульонной чаші або глибокій тарілці їдять столовою ложкою, ручку чаші можна притримувати лівою рукою. Нахиляти тарілку з супом не рекомендується.</li><li>Закінчивши їсти, покладіть ніж з виделкою на тарілку, а не на скатертину.</li><li>Дівчата можуть підфарбувати губи або припудрити носик після закінчення трапези.</li></ul><p>&nbsp;</p><p><strong>Чого не варто робити за столом в ресторані?</strong></p><p>Сидячи в ресторані неприйнятно робити такі речі:</p><ul><li>Дути на суп або бульйон.</li><li>Нагинатися над тарілкою сусіда.</li><li>Не варто ставити на стіл лікті.</li><li>Не піднімайте вилку або ніж, які випадково впали. Просто попросіть новий прилад.</li><li>Чи не витирайте руки об скатертину.</li><li>Виделкою і ложкою по тарілці стукати не рекомендується.</li><li>Також не слід різко критикувати блюдо, яке Вам не сподобалося.</li><li>Не можна їсти із загального блюда. Покладіть спеціальним приладом їжу в свою тарілку.</li><li>Не можна примушувати сусіда по столу або гостя пити вино.</li><li>Не розпочинайте бесіду з набитим ротом.</li><li>Непристойно накладати сусідові їжу, якщо він відмовляється.</li></ul><p>У ресторані їжте не кваплячись, а якщо упустите ніж або розіллється суп, вино, не варто нервувати, залишайтеся спокійним і попросіть офіціанта принести нову вилку або витерти розлитий напій.</p>', '2020-05-30 12:50:21');
INSERT INTO `roksolany`.`news` (`news_id`, `image`, `caption`, `text`, `date`) VALUES (DEFAULT, 'panorama.jpg', 'Готель з рестораном: переваги', '<p>Головна перевага готелю з рестораном в тому, що у вас завжди буде можливість смачно поїсти. Для цього вам не доведеться залишати межі будівлі і шукати ресторан в невідомому місті. Сучасний готель вже неможливо уявити без якісного ресторану, сильно спрощує життя постояльців. Частенько гості залишаються відпочивати на кілька днів, в зв\'язку з чим крім стандартного харчування їм пропонуються різноманітні банкети, рум-сервіс і розваги. Дозвілля виходить вкрай цікавим: сучасна музична програма, яскраві вечірки, казино, послуги нічного клубу і багато іншого. Все це зробить ваш відпочинок захоплюючим і незабутнім. Вам просто не захочеться залишати межі готелю. У відомих готелях завжди є свій ресторан, який вразить гостей своїми масштабами і різноманіттям страв: фуршети, кава-брейки, шведські столи, тут є все, щоб ви могли смачно поїсти і з комфортом провести дозвілля.</p><p><strong>Відчутні знижки</strong></p><p>Готель надає знижки всім своїм постояльцям на відвідування ресторану, що дозволяє не тільки смачно поїсти, але ще і солідно заощадити. Вас приємно здивує меню, в якому є смачні та оригінальні страви з будь-якого смаку і бюджету. Відразу після заселення в номер ви отримуєте знижку на відвідування ресторану, якою можна користуватися протягом усього часу проживання без будь-яких обмежень. Недорогий ресторан в готелі дозволить вам смачно поїсти і добре провести час.</p><p><strong>Їжу і напої з меню можна замовити у номер</strong></p><p>Зараз практично кожен готель надає послугу доставки їжі, а також напоїв в номер. Якщо у вас немає бажання спускатися в ресторан, то просто наберіть адміністратора готелю, який подбати про те, щоб в найкоротші терміни замовлення було вже в вашому номері. Таким чином можна отримати будь-яку страву, яку готують в ресторані, так що ваш вибір нічим не буде обмежений. Дана послуга зараз користується величезною популярністю, адже ніхто не хоче відриватися від відпочинку в власному номері і втрачати час на похід по ресторанах. Для оформлення замовлення багато готелів пропонують скористатися зручним додатком для смартфона. З його допомогою ви зможете вивчити меню і придбати вподобані страви. Послуга працює в будь-який час, адже ми дбаємо про ваш комфорт.</p><p><strong>Багаторівнева охорона</strong></p><p>У сучасних готелях і ресторанах використовується багаторівнева охорона, так що ви завжди будете залишатися в абсолютній безпеці. Охорона працює 24 години на добу, щоб в будь-який час забезпечити захист відпочиваючих. Для цього задіюється комплексний підхід, який полягає в ретельному контролі і застосуванні сучасних засобів. Завдяки багаторівневої охорони ваше життя і особисте майно буде в цілковитій безпеці.</p>', '2020-06-10 13:02:03');

COMMIT;


-- -----------------------------------------------------
-- Data for table `roksolany`.`podvirja`
-- -----------------------------------------------------
START TRANSACTION;
USE `roksolany`;
INSERT INTO `roksolany`.`podvirja` (`podvirja_id`, `name`, `image`, `quantity`, `price`, `area`, `description`) VALUES (DEFAULT, 'Люкс', 'люкс.jpg', 1, 1000, 40, 'Двокімнатний просторий номер з вітальнею та двома санвузлами. Оснащення номера: двоспальне ліжко (140х190 см), дитяче ліжко на прохання, комплект постільних речей і білизни, килимок біля ліжка, шафа для одягу, вішалка для верхнього одягу, стіл, два стільця, диван, телевізор. Оснащення санвузлів: ванна або душ, унітаз, умивальник, набір рушників на кожного гостя, туалетне мило, папір\r.');
INSERT INTO `roksolany`.`podvirja` (`podvirja_id`, `name`, `image`, `quantity`, `price`, `area`, `description`) VALUES (DEFAULT, 'Номер одномісний', 'одномісний.jpg', 3, 120, 15, 'Однокімнатний  номер з санвузлом\r. Оснащення номера: односпальне ліжко (80х190 см), дитяче ліжко на прохання, комплект постільних речей і білизни, килимок біля ліжка, шафа для одягу, вішалка для верхнього одягу, стіл, два стільця, телевізор. Оснащення санвузла: душ, унітаз, умивальник, набір рушників, туалетне мило, папір\r.');
INSERT INTO `roksolany`.`podvirja` (`podvirja_id`, `name`, `image`, `quantity`, `price`, `area`, `description`) VALUES (DEFAULT, 'Номер двомісний з одним двоспальним ліжком', 'двомісний з одним.jpg', 5, 240, 20, 'Однокімнатний  номер з санвузлом. Оснащення номера: двоспальне ліжко (140х190 см), дитяче ліжко на прохання, комплект постільних речей і білизни, килимок біля ліжка, шафа для одягу, вішалка для верхнього одягу, стіл, два стільця, телевізор. Оснащення санвузла: душ, унітаз, умивальник, набір рушників на кожного гостя, туалетне мило, папір\r.');
INSERT INTO `roksolany`.`podvirja` (`podvirja_id`, `name`, `image`, `quantity`, `price`, `area`, `description`) VALUES (DEFAULT, 'Номер двомісний з двома ліжками', 'двомісний з двома.jpg', 5, 240, 20, 'Однокімнатний  номер з санвузлом. Оснащення номера: два односпальних ліжка (80х190 см), дитяче ліжко на прохання, комплект постільних речей і білизни, килимок біля ліжка, шафа для одягу, вішалка для верхнього одягу, стіл, два стільця, телевізор. Оснащення санвузла: душ, унітаз, умивальник, набір рушників , туалетне мило, папір\r.');
INSERT INTO `roksolany`.`podvirja` (`podvirja_id`, `name`, `image`, `quantity`, `price`, `area`, `description`) VALUES (DEFAULT, 'Номер трьохмісний з трьома ліжками', 'трьохмісний з трьома.jpg', 5, 360, 21, 'Однокімнатний  номер з санвузлом. Оснащення номера: три односпальних ліжка (80х190 см), дитяче ліжко на прохання, комплект постільних речей і білизни, килимок біля ліжка, шафа для одягу, вішалка для верхнього одягу, стіл, два стільця, телевізор.Оснащення санвузла: душ, унітаз, умивальник, набір рушників на кожного гостя, туалетне мило, папір\r.');
INSERT INTO `roksolany`.`podvirja` (`podvirja_id`, `name`, `image`, `quantity`, `price`, `area`, `description`) VALUES (DEFAULT, 'Номер трьохмісний з односпальним та двоспальним ліжком', 'трьохместный с двумя.jpg', 8, 360, 21, 'Однокімнатний  номер з санвузлом. Оснащення номера: односпальне ліжко (80х190 см), двоспальне ліжко (140х190 см), дитяче ліжко на прохання, комплект постільних речей і білизни, килимок біля ліжка, шафа для одягу, вішалка для верхнього одягу, стіл, два стільця, телевізор. Оснащення санвузла: душ, унітаз, умивальник, набір рушників на кожного гостя, туалетне мило, папір\r.');
INSERT INTO `roksolany`.`podvirja` (`podvirja_id`, `name`, `image`, `quantity`, `price`, `area`, `description`) VALUES (DEFAULT, 'Мисливська хатинка', 'хатинка.jpg', 3, 500, 21, 'Хатинка з трьома односпальними ліжками, санвузлом та невеликою терасою. Оснащення номера: три односпальних ліжка (80х190 см), комплекти постільних речей і білизни, килимок біля ліжка, шафа для одягу, вішалка для верхнього одягу, стіл, два стільця, телевізор, набір посуду. На терасі: стіл та три стільця. Оснащення санвузла: душ, унітаз, умивальник, набір рушників на кожного гостя, туалетне мило, папір.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `roksolany`.`kolorit`
-- -----------------------------------------------------
START TRANSACTION;
USE `roksolany`;
INSERT INTO `roksolany`.`kolorit` (`kolorit_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Бограч.jpg', 'Бограч', 'Найбільш популярна м’ясна страва – бограч, який угорці готують ще з часів переходу через Карпати в Паннонію. Бограч – це густа суміш м’яса, грибів, цибулі, перцю, часника та інших інгредієнтів. Готують його в казанку на відкритому вогні (навіть назва вказує на це: по угорськи «казанок» – «bogracs»). По легенді, угорці сильно перчили свої страви під час турецьких війн, щоб вороги не могли з’їсти приготоване. Турки вже давно не загрожують спокою жителів Закарпаття, а традиція додавати в їжу багато перц ю залишилась.');
INSERT INTO `roksolany`.`kolorit` (`kolorit_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Банош.jpg', 'Банош', 'Гуцульська складова закарпатської кухні – це банош і бринза. Ці страви традиційно готували тільки чоловіки. Для баноша (бануша) потрібні свіжі вершки (або овеча сметана) і кукурудзяна мука, а помішувати його слід дерев’яною ложкою. За переказами, цю кашу вперше приготував гуцул Банош під час голоду, коли з їжі залишались лише сметана і мука. До баноша традиційно подають шкварки і смажені гриби.');
INSERT INTO `roksolany`.`kolorit` (`kolorit_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Мамалига.jpg', 'Мамалига', 'Трохи схожий на банош румунський вклад в закарпатську кухню, мамалига, вона ж токан – кукурудзяна каша (італійці її називають полена, а угорці – пуліска). До мамалиги подають гриби, бринзу, м’ясо, сметану, шкварки.\nВзагалі кукурудза грала дуже важливу роль в раціоні закарпатців. За легендою перший качан кукурудзи на Закарпаття привіз із турецького полону на Ужгородщину, в село Баранинці, місцевий солдат, який зміг його вивезти сховавши в своїй шапці. Це було ще в XV столітті. Протягом тривалого часу кукурудзу в Закарпатті навіть називали «турецькою пшеницею». А традиція посиденьок за очищенням качанів, коли родичі і друзі могли поговорити за нескладною роботою про все що завгодно, навіть увійшла в крилаті вирази: в Угорщині є вислів «чистити кукурудзу», еквівалентний українському «розводити теревені», або російському «точити ляси».\n');
INSERT INTO `roksolany`.`kolorit` (`kolorit_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Палачінти.jpg', 'Палачінти', 'Це млинці із прісного тіста, які можуть бути із солодкою або несолодкою начинкою.');
INSERT INTO `roksolany`.`kolorit` (`kolorit_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Кремзлики.jpg', 'Кремзлики', 'Картопляні оладки, схожі на деруни');
INSERT INTO `roksolany`.`kolorit` (`kolorit_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Шовдарь.jpg', 'Шовдарь', 'Німецький внесок в закарпатську кухню – шовдарь (копчений свинячий окорок), який традиційно готують на Великодень.');
INSERT INTO `roksolany`.`kolorit` (`kolorit_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Кнедлики.jpg', 'Кнедлики', 'З Чехії в Закарпаття прийшла оригінальна страва з безліччю варіацій – кнедлики. Вони готуються з дріжджового тіста, сирої чи вареної картоплі, м’яса, сиру та відварюються до готовності. Кнедлики чудово смакують разом з соусами, бульйоном, смаженою цибулею, сметаною, а солодкі кнедлики, посипані подрібненими горіхами, вживають з різноманітними фруктовими сиропами. Туристам, які вже відкрили для себе родзинки закарпатської кухні, можна тільки позаздрити. А тим, хто тільки планує це зробити – побажати якомога швидше вирушити в свій гастрономічний тур по Закарпаттю.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `roksolany`.`koliba`
-- -----------------------------------------------------
START TRANSACTION;
USE `roksolany`;
INSERT INTO `roksolany`.`koliba` (`koliba_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Банош гуцульский.jpg', 'Банош, або бануш', 'Це страва з кукурудзяної муки і сметани, заправлене шкварками, грибами і бринзою, один з найвідоміших представників гуцульської кухні. Банош має  одну унікальну особливість: приготувати його зі звичайних продуктів на звичайному вогнищі зможе аж ніяк не кожен. Але наші професіонали не тільки знають, а й надзвичайно вправно вміють  це робити!Цікаво, що згідно гуцульським традиціям, всі страви, пов’язані з вівцями, готують тільки чоловіки. Перемішують цю кашу виключно дерев’яною ложкою і тільки в одну сторону. Страва має колоритний та вельми специфічний смак, але спробувавши її Ви не залишитеся байдужими!\r ');
INSERT INTO `roksolany`.`koliba` (`koliba_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Вареники з картоплею.jpg', 'Вареники з картоплею', 'У кожної країни є оригінальні страви, які складають основу її національної кухні. Серед величезного різномаїття традиційних українських смаколиків особливе місце займають вареники. І певне не знайдеться людини в Україні, яка б їх не куштувала. Розмаїття начинок для вареників багато століть зберігає за цією стравою неповторність смаку. Але найбільш популярними є неповторні вареники з картоплею та сметаною, які так і тануть у роті! Справжні шанувальники можуть насолодитися стравою за традиційним рецептом !\n');
INSERT INTO `roksolany`.`koliba` (`koliba_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Душенина по-запорізьки.jpg', 'Душенина по-запорізьки', 'Це старовинне блюдо готується з м\'яса (переважно – свинини), овочів, прянощів і все це заправляється борошном. Слід також відзначити, що це блюдо  є справжньою прикрасою традиційне святкового столу – без душенини не обходиться жодне весілля та хрестини. Відчуйте себе на справжньому українському святі та скуштуйте цю наймовірну страву!\r ');
INSERT INTO `roksolany`.`koliba` (`koliba_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Полтавські галушки.jpg', 'Полтавські галушки', 'Це страва, виготовлена з надзвичайно м’якого тіста, яке тане у роті, та заправлена смачнючою домашньою сметаною. Ця страва є  надзвичайно поживною та смачною!\r І хоча галушки вживають по всій України, саме в Полтаві вони вважаються найголовнішим місцевим блюдом. Та чому ж?)\r Причину можна пошукати в творі Гоголя «Вечори на хуторі біля Диканьки» (Диканька - селище в Полтавській області):\r «Коваль не без боязкості відчинив двері і побачив Пацюка, що сидів на підлозі по-турецьки, перед невеликою діжкою, на якій стояла миска з галушками. Ця миска стояла, як навмисне, нарівні з його ротом. Чи не посунувши жодним пальцем, він нахилив трохи голову до миска і сьорбав юшку, хапаючи за часами зубами галушки».\r ');
INSERT INTO `roksolany`.`koliba` (`koliba_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Ковбаски львівські.jpg', 'Львівські ковбаски', 'Якщо ж ви любите смачно поїсти ароматні ковбаски на грилі, але не любите готувати, зазирніть до нас у колибу та насолоджуйтеся чудовим смаком!. У нас є дуже смачні соковиті ковбаски власного виробництва, виготовлені спеціально для такого випадку з відбірної свинини, які не залишать байдужими ні дітей, ні дорослих.');
INSERT INTO `roksolany`.`koliba` (`koliba_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Котлета по- київськи.jpg', 'Котлета по-київські', 'Котлета по-київськи - блюдо, знайоме кожному з самого дитинства. Готується вона з відбитого курячого філе з начинкою з вершкового масла із зеленню і смажиться в товстій паніровці. Апетитна хрустка скоринка зовні, ніжна м\'якоть і ароматний сік всередині - цю котлету точно оцінять по достоїнству!');
INSERT INTO `roksolany`.`koliba` (`koliba_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Мясо у горщиках.jpg', 'Картопля в горщиках з м\'ясом і грибами', 'Універсальне блюдо, яке сподобається багатьом. Є в цьому способі готування щось старовинне, бабусине. Горщечок, мабуть, один з небагатьох предметів кухонного побуту, який  в давнину був доступний і біднім, і багатим. Це блюдо містить простіні інгредієнти, які відмінно поєднуються між собою. Горщики, завдяки своїм розміром, і відповідно порціях, дозволяють страві бути в міру тушкованим і прожареним. Якщо ви хочете здивувати своїх близьких приємною вечерею, то така картопля в горщиках відмінно підійде, а смак страви - просто чудовий.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `roksolany`.`harchev`
-- -----------------------------------------------------
START TRANSACTION;
USE `roksolany`;
INSERT INTO `roksolany`.`harchev` (`harchev_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Борщ український.jpg', 'Борщ український', 'Борщ має більше десяти різновидів, що пов\'язано з роз\'єднанням у минулому українських земель, з існуванням різних частин українського народу в Росії, Польщі, Молдові, Румунії, Чехословаччині, з впливом на формування української кухні різних кулінарних звичаїв і смаків. Борщ набув широкого поширення в національних кухнях сусідніх народів.');
INSERT INTO `roksolany`.`harchev` (`harchev_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Зрази пшоняні з м’ясом.jpg', 'Зрази пшоняні з м’ясом', 'Хрустка скоринка і ароматний фарш приведе вас у захват і навіть не великі любителі пшоняні каші з величезним бажанням поласують цим блюдом!');
INSERT INTO `roksolany`.`harchev` (`harchev_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Риба тушкована в сметані.jpg', 'Риба тушкована в сметані', 'Тушковані рибні страви мають приємний смак, аромат, соковиту консистенцію, оскільки їх готують із додаванням нашаткованої моркви, петрушки, ріпчастої цибулі, томатного пюре, оцту, олії, цукру, рибного бульйону.');
INSERT INTO `roksolany`.`harchev` (`harchev_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Галушки картопляні.jpg', 'Галушки картопляні', 'Картопляні галушки, одна з найпопулярніших галицьких сьогодні страв. Це — ті ж галушки, в які додають варену картоплю');
INSERT INTO `roksolany`.`harchev` (`harchev_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Салат з шинкою.jpg', 'Салат з шинкою', 'Салат з шинкою, огірком, яйцем і сиром');
INSERT INTO `roksolany`.`harchev` (`harchev_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'М’ясо тушковане з овочами.jpg', 'М’ясо тушковане з овочами', 'Дуже смачно, ситно і просто виходить м\'ясо з овочами, приготоване у вигляді рагу: до обсмаженого м\'яса додається овочеве асорті і тушкується під кришкою. Таке універсальне поєднання м\'яса з овочами, щось середнє між першою і другою стравою - добре підійде і на обід, і на вечерю для всієї родини.');
INSERT INTO `roksolany`.`harchev` (`harchev_id`, `image`, `name`, `description`) VALUES (DEFAULT, 'Капусняк із грибами.jpg', 'Капусняк із грибами', 'Капусняк (капусник або капустянка) – це традиційна перша страва української кухні, основним інгредієнтом якого є квашена капуста. Саме вона надає особливий аромат і кислуватий смак, які є відмінними рисами цієї страви. Капусняк готують і в інших країнах, наприклад, у Польщі, Словаччині, Росії. Але батьківщиною вважається саме Україна. Рецептів цієї страви чимало, вони відрізняються в залежності від традицій місцевості та уподобань господині.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `roksolany`.`various_data`
-- -----------------------------------------------------
START TRANSACTION;
USE `roksolany`;
INSERT INTO `roksolany`.`various_data` (`various_data_id`, `name`, `value`) VALUES (DEFAULT, 'email', 'roksolany@gmail.com');
INSERT INTO `roksolany`.`various_data` (`various_data_id`, `name`, `value`) VALUES (DEFAULT, 'phone_number', '+380123456789');
INSERT INTO `roksolany`.`various_data` (`various_data_id`, `name`, `value`) VALUES (DEFAULT, 'adress', '29, вул. Лесі Українки, с. Роксолани, Одеської обл.');
INSERT INTO `roksolany`.`various_data` (`various_data_id`, `name`, `value`) VALUES (DEFAULT, 'complex_about', '«Сільске подвір\'я» - це новий готельно-ресторанний комплекс, який був відкритий в 2020 році з європейською якістю обслуговування, працює цілодобово на березі Дністровського лиману у селі Роксолани. Зручне заміське розташування дозволяє забути про міську метушню. Цей новий сучасний готельно-ресторанний комплекс надає послуги: готелю та ресторану. Головна перевага готелю з рестораном в тому, що у вас завжди буде можливість смачно поїсти. Для цього вам не доведеться залишати межі будівлі і шукати ресторан в невідомому місті. Сучасний готель вже неможливо уявити без якісного ресторану, сильно спрощує життя постояльців. Ресторанно-готельний комплекс «Надія» з бездоганним сервісом, галантним і доброзичливим персоналом славиться своєю репутацією, якій дуже дорожить. Прийшовши сюди вперше, кожен відчуває себе важливим і бажаним гостем.');
INSERT INTO `roksolany`.`various_data` (`various_data_id`, `name`, `value`) VALUES (DEFAULT, 'kolorit_main', 'Закарпаття славиться не тільки мальовничими краєвидами та панорамами, унікальними природними та історичними пам\'ятками, а ще народним мистецтвом, цілющими термальними водами та оригінальними стравами національної кухні.');
INSERT INTO `roksolany`.`various_data` (`various_data_id`, `name`, `value`) VALUES (DEFAULT, 'koliba_main', 'Національна кухня – невіддільна складова культури нашої країни. А ще —це строкате дзеркало історії, кожен поворотний етап якої приносив нові продукти, смаки та техніки приготування.');
INSERT INTO `roksolany`.`various_data` (`various_data_id`, `name`, `value`) VALUES (DEFAULT, 'harchev_main', '«Харчевня» - це підприємство ресторанного господарства спеціалізуються на українській кухні. У меню підприємства «Харчевня» представлені страви української кухні, у залах є wi-fi. Сьогодні «Харчевня» - нове підприємство у Готельному комплексі Рокслолани яка показує, що демократичні ціни та якісні продукти можуть співіснувати разом.');
INSERT INTO `roksolany`.`various_data` (`various_data_id`, `name`, `value`) VALUES (DEFAULT, 'podvirja_main', 'Сільське подвір’я – недорогий готель для сімейного та активного відпочинку в оточенні українського села з можливістю доторкнутись до історії.');
INSERT INTO `roksolany`.`various_data` (`various_data_id`, `name`, `value`) VALUES (DEFAULT, 'admin_login', 'admin');
INSERT INTO `roksolany`.`various_data` (`various_data_id`, `name`, `value`) VALUES (DEFAULT, 'admin_password', '1a1dc91c907325c69271ddf0c944bc72');

COMMIT;

