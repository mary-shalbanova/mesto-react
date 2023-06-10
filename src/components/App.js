import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchCardsData() {
      try {
        const cardList = await api.getCardList();
        setCards(cardList);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCardsData();
  }, []);

  React.useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await api.getUserInfo();

        setCurrentUser(userData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserData();
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  async function handleCardLike(card) {
    try {
      const isLiked = card.likes.some((user) => user._id === currentUser._id);
      const newCard = await api.changeLikeCardStatus(card._id, isLiked);
      const newCards = cards.map((c) => (c._id === newCard._id ? newCard : c));
      setCards(newCards);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdateUser(user) {
    try {
      setIsLoading(true);
      const userData = await api.editProfileInfo(user);
      setCurrentUser(userData);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateAvatar(image) {
    try {
      setIsLoading(true);
      const avatar = await api.changeAvatar(image.avatar);
      setCurrentUser(avatar);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddPlaceSubmit(card) {
    try {
      setIsLoading(true)
      const newCard = await api.addNewCard(card);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false)
    }
  }

  // function handleEscButton (e) {
  //   if (e.key === 'Escape') {
  //     closeAllPopups()
  //   }
  // }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__container'>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <PopupWithForm
          title='Вы уверены?'
          name='delete'
          buttonTitle='Да'
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
