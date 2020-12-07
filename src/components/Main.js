import React from 'react';
import {api} from '../utils/api.js';
import Card from './Card.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getInitialCards(), api.getUserData()])
            .then(([cardData, userData]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(cardData)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    
    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-containter">
                    <img alt={userName} className="profile__avatar" src={userAvatar} />
                    <button type="button" className="profile__avatar-edit-button" onClick={onEditAvatar}></button>
                </div>
                
                <div className=" profile__columns">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="profile__edit-button" aria-label="Редактировать" onClick={onEditProfile}></button>
                    <p className="profile__job">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" aria-label="Добавить" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={onCardClick}/>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main