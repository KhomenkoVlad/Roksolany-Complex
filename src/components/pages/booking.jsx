export const Booking = () =>
    <section id="booking-background" style={{ display: "none" }}>
        <form id="booking-form">
            <button type="reset">
                <span id="booking-close">
                    <i className="fas fa-times" />
                </span>
            </button>
            <h2>Заповніть усі поля</h2>
            <p>
                Ваше замовлення: <span id="booking-room" />
            </p>
            <input type="hidden" id="podvirja-id" />
            <p>
                <label htmlFor="booking-input">Дата заїзду</label>
                <br />
                <input
                    type="date"
                    id="booking-input"
                    className="booking-message"
                    required
                />
            </p>
            <p>
                <label htmlFor="booking-output">Дата виїзду</label>
                <br />
                <input
                    type="date"
                    id="booking-output"
                    className="booking-message"
                    required
                />
            </p>
            <p>
                <label htmlFor="booking-name">Ваше ім'я</label>
                <br />
                <input
                    type="text"
                    id="booking-name"
                    className="booking-message"
                    required
                />
            </p>
            <p>
                <label htmlFor="booking-email">Ваша електронна пошта</label>
                <br />
                <input
                    type="text"
                    id="booking-email"
                    className="booking-message"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
            </p>
            <p>
                <label htmlFor="booking-phone">Ваш номер телефону:</label>
                <br />
                <input
                    type="text"
                    id="booking-phone"
                    className="booking-message"
                    required
                    pattern="[0-9]{6,}"
                />
            </p>
            <p>
                <input type="submit" id="booking-submit" />
            </p>
        </form>
        <form id="booking-confirm"></form>
    </section>;