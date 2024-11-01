import { useState, useEffect } from 'react';
// import axios from 'axios';
import { fetchImages } from './img-api.js';
import { DNA } from 'react-loader-spinner';

import SearchBar from './components/searchBar/SearchBar.jsx';
import ImgGallery from './components/imgGallery/ImgGallery.jsx';
import ErrorMessage from './components/errorMessage/ErrorMessage.jsx';
import LoadMoreBtn from './components/loadMoreBtn/LoadMoreBtn.jsx';

function App() {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [counter, setCounter] = useState(10);
  // let pageCounter = 10;

  const handleSubmit = ({ search }) => {
    setSearch(search);
  };
  const handleIncreaseImg = async () => {
    try {
      setCounter((prev) => prev + 10);
      setLoader(true);
      const data = await fetchImages(search, counter + 10);
      console.log('loader', loader);
      setGallery((prevState) => {
        const uniqueNewImages = data.filter(
          (newImg) => !prevState.some((img) => img.id === newImg.id)
        );
        return [...prevState, ...uniqueNewImages];
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (!search) return;

    async function handleImgRequest() {
      console.log('Вызвалась функция в useEffect', counter);

      try {
        setLoader(true);
        setGallery([]);
        setError(false);
        const data = await fetchImages(search, counter);
        setGallery(data);
        console.log('handleImgRequest', data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
    handleImgRequest();
  }, [search]);

  return (
    <>
      <section className='header-block'>
        <SearchBar onAdd={handleSubmit} />
        {error && <ErrorMessage />}
      </section>
      <section>
        <div className='loader-alignment'>
          {gallery.length > 0 && <ImgGallery gallery={gallery} />}
          {gallery.length > 0 && !loader && (
            <LoadMoreBtn loadMore={handleIncreaseImg} />
          )}
          {loader && (
            <DNA
              visible={true}
              height='80'
              width='80'
              ariaLabel='dna-loading'
              wrapperStyle={{}}
              wrapperClass='dna-wrapper'
            />
          )}
        </div>
      </section>
    </>
  );
}

export default App;
