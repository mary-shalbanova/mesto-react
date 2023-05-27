import React from 'react';
import { api } from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { name, about, avatar } = await api.getUserInfo();
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cardList = await api.getCardList();
        setCards(cardList);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <main className='page__content'>
      <section className='profile'>
        <div className='profile__edit-avatar' onClick={onEditAvatar}>
          <img className='profile__avatar' src={userAvatar} alt='аватар' />
        </div>
        <div className='profile__info'>
          <div className='profile__wrapper'>
            <h1 className='profile__name text-overflow'>{userName}</h1>
            <button
              type='button'
              className='profile__edit-button button fade'
              aria-label='Редактировать'
              onClick={onEditProfile}
            />
          </div>
          <p className='profile__occupation text-overflow'>{userDescription}</p>
        </div>
        <button
          type='button'
          className='profile__add-button button fade'
          aria-label='Добавить'
          onClick={onAddPlace}
        />
      </section>
      <section className='elements'>
        <ul className='cards'>
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
