import toast, { Toaster } from 'react-hot-toast';
import s from './searchBar.module.css';
const SearchBar = ({ onAdd }) => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (e.target.elements.search.value.trim() !== '') {
      onAdd({
        search: e.target.elements.search.value,
      });
    } else {
      toast('To find img write search params.');
    }
    e.target.reset();
  };
  return (
    <header className={s.searchBlock}>
      <form onSubmit={handleSearchSubmit}>
        <input
          className={s.inputElevated}
          type='text'
          autoComplete='off'
          name='search'
          placeholder='Search images and photos'
        />
        <button type='submit'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 20 20'
          >
            <path
              fill='%23838D99'
              d='M13.22 14.63a8 8 0 1 1 1.41-1.41l4.29 4.29a1 1 0 1 1-1.41 1.41l-4.29-4.29zm-.66-2.07a6 6 0 1 0-8.49-8.49 6 6 0 0 0 8.49 8.49z'
            ></path>
          </svg>
        </button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
