import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = evt => {
    const value = evt.currentTarget.value;
    setInputValue(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (inputValue.trim() === '') {
      toast.error('Search query can not bee empty.', {
        theme: 'dark',
      });
      return;
    }

    onSubmit(inputValue);
    clearForm();
  };

  const clearForm = () => {
    setInputValue(inputValue);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size="2em" />
        </SearchFormButton>
        <SearchFormInput
          value={inputValue}
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
