import s from './loadMoreBtn.module.css';
function LoadMoreBtn({ loadMore }) {
  return (
    <div className={s.btnContainer}>
      <button onClick={loadMore}>Load more</button>
    </div>
  );
}

export default LoadMoreBtn;
