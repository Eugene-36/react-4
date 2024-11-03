import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import { fetchImages } from './img-api.js';
import { DNA } from 'react-loader-spinner';

import SearchBar from './components/searchBar/SearchBar.jsx';
import ImgGallery from './components/imgGallery/ImgGallery.jsx';
import ErrorMessage from './components/errorMessage/ErrorMessage.jsx';
import LoadMoreBtn from './components/loadMoreBtn/LoadMoreBtn.jsx';
import ImgModal from './components/imgModal/ImgModal.jsx';

function App() {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [counter, setCounter] = useState(10);
  const [selectedImage, setSelectedImg] = useState([]);
  const [isModalOpen, setModalIsOpen] = useState(false);

  const listRef = useRef(null);

  const handleSubmit = ({ search }) => setSearch(search);
  const handleIncreaseImg = async () => {
    try {
      setCounter((prev) => prev + 10);
      setLoader(true);
      const data = await fetchImages(search, counter + 10);
      setGallery((prevState) => {
        const uniqueNewImages = data.filter(
          (newImg) => !prevState.some((img) => img.id === newImg.id)
        );
        listRef.current?.lastElementChild?.scrollIntoView();
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
      try {
        setLoader(true);
        setGallery([]);
        setCounter(10);
        setError(false);
        const data = await fetchImages(search, counter);
        setGallery(data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
    handleImgRequest();
  }, [search]);
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [gallery]);

  const handleCurrentImg = (clickedID) => {
    const isIdElement = gallery?.filter(({ id }) => id === clickedID);
    setSelectedImg(isIdElement);
  };
  // OPEN MODAL BY CLICK
  const handleOpenModal = (modalState) => {
    setModalIsOpen(modalState);
  };
  return (
    <>
      <section className='header-block'>
        <SearchBar onAdd={handleSubmit} />
        {error && <ErrorMessage />}
      </section>
      <section>
        <div className='loader-alignment'>
          {gallery.length > 0 && (
            <ImgGallery
              gallery={gallery}
              refElement={listRef}
              getId={handleCurrentImg}
              stateModal={handleOpenModal}
            />
          )}
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
        <ImgModal
          setModal={selectedImage}
          addOpen={isModalOpen}
          resetAddOpen={() => setModalIsOpen(false)}
        />
      </section>
    </>
  );
}

export default App;
