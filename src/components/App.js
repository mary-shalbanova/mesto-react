import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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

  return (
    <div className='page__container'>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        title='Редактировать профиль'
        name='edit'
        buttonTitle='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className='form__textfields'>
          <input
            className='form__input form__input_type_name'
            type='text'
            name='name'
            placeholder='Имя'
            required=''
            minLength={2}
            maxLength={40}
          />
          <span className='form__error form__error_type_name' />
          <input
            className='form__input form__input_type_about'
            type='text'
            name='about'
            placeholder='О себе'
            required=''
            minLength={2}
            maxLength={200}
          />
          <span className='form__error form__error_type_about' />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title='Новое место'
        name='add'
        buttonTitle='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className='form__textfields'>
          <input
            className='form__input form__input_type_card-heading'
            type='text'
            name='name'
            placeholder='Название'
            required=''
            minLength={2}
            maxLength={30}
          />
          <span className='form__error form__error_type_name' />
          <input
            className='form__input form__input_type_card-link'
            type='url'
            name='link'
            placeholder='Ссылка на картинку'
            required=''
          />
          <span className='form__error form__error_type_link' />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title='Обновить аватар'
        name='change-avatar'
        buttonTitle='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className='form__textfields'>
          <input
            className='form__input form__input_type_link'
            type='url'
            name='link'
            placeholder='Ссылка на картинку'
            required=''
          />
          <span className='form__error form__error_type_link' />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title='Вы уверены?'
        name='delete'
        buttonTitle='Да'
        onClose={closeAllPopups}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
