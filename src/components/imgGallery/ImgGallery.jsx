import ImgCard from './ImgCard.jsx';
import s from './imgGallery.module.css';
const ImgGallery = ({ gallery }) => {
  return (
    <ul className={s.imgContainer}>
      {/* Набір елементів списку із зображеннями */}
      {gallery.map(({ id, urls, slug }) => (
        <li key={id}>
          <ImgCard urls={urls} slug={slug} />
        </li>
      ))}
    </ul>
  );
};

export default ImgGallery;
