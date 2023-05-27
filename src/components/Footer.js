import React from 'react';

function Footer() {
  const currentDate = new Date();
  return (
    <footer className='footer page__content'>
      <p className='footer__copyright'>
        © {currentDate.getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
