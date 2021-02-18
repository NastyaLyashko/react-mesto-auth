import login from "../images/login.svg";

export default function InfoTooltip({ name, isOpen, onClose, text }) {
    return (
        <section className={`${isOpen ? "popup_opened" : ""} popup popup_${name}`}>
            <div className="popup__container popup__container_login">
            <button className="popup__close-button popup__close-button_photo" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__login-img" alt="succes" src={login}/>
                <p className="popup__login-text">{text}</p>
            </div>
        </section>
    )
}