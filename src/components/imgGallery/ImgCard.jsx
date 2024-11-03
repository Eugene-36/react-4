const ImgCard = ({ urls, alt_description }) => {
  const { small } = urls;
  return (
    <div>
      <img src={small} alt={alt_description} loading='lazy' />
    </div>
  );
};

export default ImgCard;
