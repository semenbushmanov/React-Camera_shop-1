import ProductCard from '../product-card/product-card';
import { Camera, Cameras } from '../../types/camera';
import { useState, memo } from 'react';
import { Settings } from '../../const';

type SimilarProductSliderProps = {
  similarCameras: Cameras;
  openAddItemModal: (camera: Camera) => void;
};

function SimilarProductSlider(props: SimilarProductSliderProps): JSX.Element {
  const { similarCameras, openAddItemModal } = props;
  const [ firstCameraToRender, setFirstCameraToRender ] = useState(0);
  const lastCameraToRender = firstCameraToRender + Settings.SimilarCardsNumber;
  const similarCamerasToRender = similarCameras.slice(firstCameraToRender, lastCameraToRender);
  const isBackButtonDisabled = firstCameraToRender === 0;
  const isNextButtonDisabled = firstCameraToRender >= similarCameras.length - Settings.SimilarCardsNumber;

  const handleNextButton = () => {
    setFirstCameraToRender(firstCameraToRender + Settings.SliderStep);
  };

  const handleBackButton = () => {
    setFirstCameraToRender(firstCameraToRender - Settings.SliderStep);
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarCamerasToRender.map(
                (camera) => (
                  <ProductCard
                    key={camera.id}
                    camera={camera}
                    isInBasket={false}
                    openAddItemModal={openAddItemModal}
                    isActive
                  />)
              )}
            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              onClick={handleBackButton}
              disabled={isBackButtonDisabled}
              style={isBackButtonDisabled ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onClick={handleNextButton}
              disabled={isNextButtonDisabled}
              style={isNextButtonDisabled ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(SimilarProductSlider);
