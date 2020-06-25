import { contacts } from '../../scripts/index';

export const Contacts = () =>
    <main>
        <div className="caption">
            <h2>Залиште коментар</h2>
            <p>
                Не соромтеся звертатися до нас в будь-який час і задавати будь-які
                питання. Ми завжди відкриті для будь-якої пропозиції і співпраці.
  </p>
        </div>
        <div className="send-message">
            <form>
                <p>
                    <label htmlFor="your-name">Ваше ім'я</label>
                    <br />
                    <input type="text" id="your-name" className="input-message" required />
                </p>
                <p>
                    <label htmlFor="your-email">Ваша електронна пошта</label>
                    <br />
                    <input
                        type="text"
                        id="your-email"
                        className="input-message"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                </p>
                <p>
                    <label htmlFor="your-subject">Тема повідомлення</label>
                    <br />
                    <input
                        type="text"
                        id="your-subject"
                        className="input-message"
                        required
                    />
                </p>
                <p>
                    <label htmlFor="your-message">Повідомлення</label>
                    <br />
                    <textarea
                        type="text"
                        id="your-message"
                        className="input-message"
                        defaultValue={""}
                    />
                </p>
                <p>
                    <input type="submit" id="submit-message" />
                </p>
            </form>
            <div className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2252.0196814247124!2d30.47402678154834!3d46.16516128657177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1suk!2sua!4v1590838642639!5m2!1suk!2sua"
                    frameBorder={0}
                    style={{ border: 0 }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex={0}
                />
            </div>
        </div>
        {contacts()}
    </main>;
