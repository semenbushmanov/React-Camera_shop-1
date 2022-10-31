function LoadingScreen(): JSX.Element {
  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <h2>Загрузка...</h2>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
