import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {

    function handleClick() {
        onCardClick(card);
      }  

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
        
    }

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `elements__delete-button ${isOwn ? 'elements__delete-button_visible' : 'elements__delete-button_hidden'}`
      ); 

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `elements__like-button ${isLiked ? 'elements__like-button_active' : null}`
        ); 

    return (
        <li className="elements__card">
            <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <div className="elements__info">
                <h2 className="elements__text">{card.name}</h2>
                <div className="elements__like">
                    <button type="button" className={cardLikeButtonClassName} aria-label='Лайк' onClick={handleLikeClick}></button>
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div> 
            </div>
        </li>
    )
}