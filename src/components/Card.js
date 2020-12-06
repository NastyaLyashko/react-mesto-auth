export default function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
      }  

    return (
        <li className="elements__card">
            <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <button className="elements__delete-button" type="button"></button>
            <div className="elements__info">
                <h2 className="elements__text">{card.name}</h2>
                <div className="elements__like">
                    <button type="button" className="elements__like-button" aria-label='Лайк'></button>
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div> 
            </div>
        </li>
    )
}