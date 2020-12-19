import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      } 

    return (
        <PopupWithForm  isOpen={isOpen}
                        onClose={onClose}
                        onSubmit={handleSubmit}
                        title="Обновить аватар"
                        name="edit-avatar"
                        button="Сохранить">
            <input  ref={avatarRef}
                    type="url" 
                    name="avatar" 
                    placeholder="Ссылка на картинку" 
                    className="popup__input popup__input_type_img" 
                    id="img-input" 
                    required/>
            <span className="popup__error" id="img-input-error"></span>
        </PopupWithForm>
    )
}