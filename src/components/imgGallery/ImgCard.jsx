const ImgCard = ({ urls, alt_description }) => {
  const { small } = urls;
  return (
    <div>
      <img src={small} alt={alt_description} />
    </div>
  );
};

export default ImgCard;
