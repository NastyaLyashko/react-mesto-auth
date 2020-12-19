export default function ImagePopup({card, onClose}) {
    if (!card){
        return null
      }

    return (
        <section className={`${card ? "popup_opened" : ""} popup popup_photo`}>
            <div className="popup__container popup__container_photo">
            <button className="popup__close-button popup__close-button_photo" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__img" alt={card.name} src={card.link}/>
                <p className="popup__caption">{card.name}</p>
            </div>
        </section>
    )
}