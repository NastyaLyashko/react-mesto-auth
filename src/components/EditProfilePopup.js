import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [name, setName] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
      }

    const [description, setDescription] = React.useState('');

    function handleChangeDescription(e) {
        setDescription(e.target.value);
      }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
      if (currentUser) {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }
    }, [currentUser]); 

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm  isOpen={isOpen}
                        onClose={onClose}
                        onSubmit={handleSubmit}
                        title="Редактировать профиль"
                        name="edit"
                        button="Сохранить">
            <label className="popup__field popup__field_first">
                <input  value={name} onChange={handleChangeName}
                        type="text" 
                        name="name" 
                        className="popup__input popup__input_type_name" 
                        id="name-input" 
                        required 
                        minLength="2"
                        maxLength="40"/>
                <span className="popup__error" id="name-input-error"></span>
            </label>
            <label className="popup__field">
                <input  value={description} onChange={handleChangeDescription}
                        type="text" 
                        name="about" 
                        className="popup__input popup__input_type_job" 
                        id="job-input" 
                        required 
                        minLength="2" 
                        maxLength="200"/>
                <span className="popup__error" id="job-input-error"></span>
            </label>
        </PopupWithForm>
    )
}