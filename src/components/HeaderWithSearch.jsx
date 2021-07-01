import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchbar from './HeaderSearchbar';
import Context from '../context/Context';

function HeaderWithSearch() {
  const {
    search,
    setSearch,
  } = useContext(Context);

  const pageTitle = () => {
    const path = window.location.pathname;
    const str = path.substring(1);
    const arr = str.split(' ');
    for (let index = 0; index < arr.length; index += 1) {
      arr[index] = arr[index].charAt(0).toUpperCase() + arr[index].slice(1);
    }
    const title = arr.join(' ');

    return (title.includes('area')) ? 'Explorar Origem' : title;
  };

  const handleSearch = () => {
    if (search === false) {
      setSearch(true);
    } else if (search === true) {
      setSearch(false);
    }
  };

  return (
    <>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="profile-icon"
          data-testid="profile-top-btn"
        />
      </Link>
      <h4 data-testid="page-title">{pageTitle()}</h4>
      <button
        type="button"
        onClick={ () => handleSearch() }
      >
        <img
          src={ searchIcon }
          alt="search-icon"
          data-testid="search-top-btn"
        />
      </button>
      {search ? <HeaderSearchbar /> : <p />}
    </>
  );
}

export default HeaderWithSearch;