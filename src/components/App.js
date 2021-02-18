import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory, withRouter } from 'react-router-dom';
import '../index.css';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from './ProtectedRoute'; 
import { api } from '../utils/api';
import { register, authorize, getContent } from '../utils/auth';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function App() {
    
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

    function onEditProfile() {
        setIsEditProfilePopupOpen(true);
    }

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

    function onAddPlace() {
        setIsAddPlacePopupOpen(true);
    }

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    function onEditAvatar() {
        setIsEditAvatarPopupOpen(true);
    }

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    function onInfoTooltip() {
        setIsInfoTooltipOpen(true);
    }
    
    const [selectedCard, setSelectedCard] = useState(null);

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsInfoTooltipOpen(false)
        setSelectedCard(null)
    }
    
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => { 
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

    const [cards, setCards] = useState([]);

    useEffect(() => {
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

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards);
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleAddPlaceSubmit(data) {
        api.postCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const [loggedIn, setLoggedIn] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (loggedIn) {
            history.push('/');
        }
    }, [history, loggedIn])

    const handleRegister = (data) => {
        const { email, password } = data;
        return register(email, password)
            .then((res) => {
                if (!res || res.statusCode === 400) {
                    throw new Error('Что-то не так с регистрацией');
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleLogin = (data) => {
        const { email, password } = data;
        return authorize(email, password)
            .then((res) => {
                if (!res || res.statusCode === 400) {
                    throw new Error('Что-то не так с регистрацией');
                }
                if (res.token) {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', res.token);
                }
            })
    }


    const [loginData, setLoginData] = useState({
        _id: '',
        email: ''
    })

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            getContent(jwt)
            .then((res) => {
                if (res){
                    setLoggedIn(true);
                    setLoginData(res.data);
                  }
            })
        }
      }, []);

    const handleSignOut = () => {
        localStorage.removeItem('jwt');
    }

    return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
                            onEditProfile={onEditProfile} 
                            onAddPlace={onAddPlace} 
                            onEditAvatar={onEditAvatar} 
                            onCardClick={handleCardClick}
                            cards={cards} 
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            signOut={handleSignOut}
                            loginData={loginData.email} />
            <Route path="/sign-up">
                <Register onRegister={handleRegister} onInfoTooltip={onInfoTooltip}/>
            </Route>
            <Route path="/sign-in">
                <Login handleLogin={handleLogin} onInfoTooltip={onInfoTooltip}/>
            </Route>
            <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route> 
        </Switch>
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
        <InfoTooltip    isOpen={isInfoTooltipOpen} 
                        onClose={closeAllPopups} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
