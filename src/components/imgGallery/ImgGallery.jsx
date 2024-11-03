import ImgCard from './ImgCard.jsx';
import s from './imgGallery.module.css';
const ImgGallery = ({ gallery, refElement, getId, stateModal }) => {
  return (
    <ul ref={refElement} className={s.imgContainer}>
      {gallery.map(({ id, urls, slug }) => (
        <li
          onClick={() => {
            getId(id);
            stateModal(true);
          }}
          key={id}
        >
          <ImgCard urls={urls} slug={slug} />
        </li>
      ))}
    </ul>
  );
};

export default ImgGallery;
