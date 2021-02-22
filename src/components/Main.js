import React from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from '../components/Header.js';

function Main({ loginData, loggedIn, onSignOut, onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <Header loggedIn={loggedIn} login={loginData} link="/sign-in" onClick={onSignOut} loginText={'Выйти'}/>
            <main>
                <section className="profile">
                    <div className="profile__avatar-containter">
                        <img alt={currentUser.name} className="profile__avatar" src={currentUser.avatar} />
                        <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar}></button>
                    </div>
                    
                    <div className=" profile__columns">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={onEditProfile}></button>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__add-button" aria-label="Добавить" onClick={onAddPlace}></button>
                </section>
                <section className="elements">
                    <ul className="elements__list">
                        {cards.map((card) => (
                            <Card   key={card._id} 
                                    card={card} 
                                    onCardClick={onCardClick} 
                                    onCardLike={onCardLike} 
                                    onCardDelete={onCardDelete}/>
                        ))}
                    </ul>
                </section>
            </main>
        </ >
        )
}

export default Main