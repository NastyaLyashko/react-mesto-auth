import React from 'react';
import '../index.css';
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from "./AddPlacePopup";
import {api} from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function App() {
    
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

    const [selectedCard, setSelectedCard] = React.useState(null);

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        changeIsEditProfilePopupOpen(false)
        changeIsAddPlacePopupOpen(false)
        changeIsEditAvatarPopupOpen(false)
        setSelectedCard(null)
    }
    
    const [currentUser, setCurrentUser] = React.useState('');

    React.useEffect(() => {
        api.getUserData()
            .then((userData) => {
                setCurrentUser(userData)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    function handleUpdateUser(data) {
        api.patchUserData(data)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleUpdateAvatar(userAvatar) {
        api.patchUserAvatar(userAvatar)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getInitialCards()
            .then((cardData) => {
                setCards(cardData)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    function handleCardLike(card) {
        
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter((c) => c._id !== card._id);
            setCards(newCards);
          });
    }

    function handleAddPlaceSubmit(data) {
        api.postCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);;
                closeAllPopups();
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header />
        <Main   onEditProfile={onEditProfile} 
                onAddPlace={onAddPlace} 
                onEditAvatar={onEditAvatar} 
                onCardClick={handleCardClick}
                cards={cards} 
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete} />
        <Footer />
        <EditAvatarPopup    isOpen={isEditAvatarPopupOpen} 
                            onClose={closeAllPopups} 
                            onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup   isOpen={isEditProfilePopupOpen} 
                            onClose={closeAllPopups} 
                            onUpdateUser={handleUpdateUser} />
        <AddPlacePopup  isOpen={isAddPlacePopupOpen} 
                        onClose={closeAllPopups} 
                        onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
