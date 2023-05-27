import React from 'react';

function PopupWithForm({
  title,
  name,
  children,
  buttonTitle,
  isOpen,
  onClose,
}) {
  React.useEffect(() => {
    isOpen
      ? document
          .querySelector(`.popup_type_${name}`)
          .classList.add('popup_opened')
      : document
          .querySelector(`.popup_type_${name}`)
          .classList.remove('popup_opened');
  }, [isOpen]);

  return (
    <section className={`popup popup_type_${name}`}>
      <div className='popup__container'>
        <button
          type='button'
          className='button popup__close-button fade'
          aria-label='Закрыть'
          onClick={onClose}
        />
        <h2 className='popup__header'>{title}</h2>
        <form className='form form_type_edit-profile' name={name} noValidate=''>
          {children}
          <button type='submit' className='button form__submit-button'>
            {buttonTitle}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
