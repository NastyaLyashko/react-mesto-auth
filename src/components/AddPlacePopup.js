import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    
    const [name, setName] = React.useState();

    function handleChangeName(e) {
        setName(e.target.value);
      }

    const [link, setLink] = React.useState();

    function handleChangeLink(e) {
        setLink(e.target.value);
      }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
          name,
          link,
        });
    }

    return (
        <PopupWithForm  isOpen={isOpen}
                        onClose={onClose}
                        onSubmit={handleSubmit}
                        title="Новое место"
                        name="place"
                        button="Создать">
            <label className="popup__field popup__field_first">
                <input  value={name} onChange={handleChangeName}
                        type="text" 
                        name="name" 
                        placeholder="Название" 
                        className="popup__input popup__input_type_place" 
                        id="place-input" 
                        required 
                        minLength="2" 
                        maxLength="30"/>
                <span className="popup__error" id="place-input-error"></span>
            </label>
            <label className="popup__field">
                <input  value={link} onChange={handleChangeLink}
                        type="url" 
                        name="link" 
                        placeholder="Ссылка на картинку" 
                        className="popup__input popup__input_type_img"          
                        id="img-input" 
                        required/>
                <span className="popup__error" id="img-input-error"></span>
            </label>
        </PopupWithForm>
    )
}