import { LoadMoreButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ text, onClick }) => {
  return (
    <LoadMoreButton type="button" onClick={onClick}>
      {text}
    </LoadMoreButton>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
