import { createPortal } from 'react-dom';
import { ModalStyled, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, onLoad, image: { link, alt } }) => {
  const handleEscapeKeyClose = useCallback(
    evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKeyClose);

    return () => {
      window.removeEventListener('keydown', handleEscapeKeyClose);
    };
  }, [handleEscapeKeyClose]);

  const handleBackdropClickCloseModal = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClickCloseModal}>
      <ModalStyled>
        <img
          src={link}
          alt={alt}
          onLoad={() => {
            onLoad();
          }}
        />
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    link: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
};
