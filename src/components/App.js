import React from 'react';
import '../index.css';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ImagePopup from './ImagePopup.js'


function App(props) {
    
    const [isEditProfilePopupOpen, changeIsEditProfilePopupOpen] = React.useState(false);

    function onEditProfile() {
        changeIsEditProfilePopupOpen(true);
    }

    const [isAddPlacePopupOpen, changeIsAddPlacePopupOpen] = React.useState(false);

    function onAddPlace() {
        changeIsAddPlacePopupOpen(true);
    }

    const [isEditAvatarPopupOpen, changeIsEditAvatarPopupOpen] = React.useState(false);

    function onEditAvatar() {
        changeIsEditAvatarPopupOpen(true);
    }

    const [selectedCard, setSelectedCard] = React.useState(false);

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        changeIsEditProfilePopupOpen(false)
        changeIsAddPlacePopupOpen(false)
        changeIsEditAvatarPopupOpen(false)
        setSelectedCard(false)
    }

    return (
    <div className="page">
        <Header />
        <Main onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} onCardClick={handleCardClick}/>
        <Footer />
        <PopupWithForm isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        title="Обновить аватар"
                        name="edit-avatar"
                        button="Сохранить">
            <input type="url" name="avatar" placeholder="Ссылка на картинку" className="popup__input popup__input_type_img" 
                                id="img-input" 
                                required/>
            <span className="popup__error" id="img-input-error"></span>
        </PopupWithForm>
        <PopupWithForm isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        title="Редактировать профиль"
                        name="edit"
                        button="Сохранить">
            <label className="popup__field popup__field_first">
                <input type="text" name="name" className="popup__input popup__input_type_name" 
                                id="name-input" 
                                required 
                                minLength="2"
                                maxLength="40"/>
                <span className="popup__error" id="name-input-error"></span>
            </label>
            <label className="popup__field">
                <input type="text" name="about" className="popup__input popup__input_type_job" 
                                id="job-input" 
                                required 
                                minLength="2" 
                                maxLength="200"/>
                <span className="popup__error" id="job-input-error"></span>
            </label>
        </PopupWithForm>
        <PopupWithForm isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        title="Новое место"
                        name="place"
                        button="Создать">
            <label className="popup__field popup__field_first">
                <input type="text" name="name" placeholder="Название" className="popup__input popup__input_type_place" 
                                id="place-input" 
                                required 
                                minLength="2" 
                                maxLength="30"/>
                <span className="popup__error" id="place-input-error"></span>
            </label>
            <label className="popup__field">
                <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_type_img" 
                                id="img-input" 
                                required/>
                <span className="popup__error" id="img-input-error"></span>
            </label>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
