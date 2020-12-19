function PopupWithForm({ title, name, button, children, isOpen, onClose, onSubmit }) {
    
    return (
        <section className={`${isOpen ? "popup_opened" : ""} popup popup_${name}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <form className={`popup__form popup__form_${name}`} onSubmit={onSubmit}>
                    <h3 className="popup__title">{title}</h3>
                    {children}
                    <button type="submit" className="popup__save-button">{button}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm