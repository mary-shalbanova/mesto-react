import React from 'react';

function Card({ card, onCardClick }) {
  return (
    <li className='cards__item'>
      <img
        className='cards__image'
        src={card.link}
        alt={card.name}
        onClick={() => {
          onCardClick(card);
        }}
      />
      <button
        type='button'
        className='cards__delete-button button fade'
        aria-label='Удалить'
      />
      <div className='cards__wrapper'>
        <h2 className='cards__text text-overflow'>{card.name}</h2>
        <div className='cards__like-container'>
          <button
            type='button'
            className='cards__like-button button'
            aria-label='Нравится'
          />
          <span className='cards__like-counter'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
