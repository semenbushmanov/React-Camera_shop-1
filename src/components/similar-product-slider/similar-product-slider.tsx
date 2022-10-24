import ProductCard from '../product-card/product-card';
import { Camera, Cameras } from '../../types/camera';
import { useState, memo } from 'react';

type SimilarProductSliderProps = {
  similarCameras: Cameras;
  openAddItemModal: (camera: Camera) => void;
};

const SIMILAR_CARDS_NUMBER = 3;
const SLIDER_STEP = 1;

function SimilarProductSlider({similarCameras, openAddItemModal}: SimilarProductSliderProps): JSX.Element {
  const [ firstCameraToRender, setFirstCameraToRender ] = useState(0);
  const lastCameraToRender = firstCameraToRender + SIMILAR_CARDS_NUMBER;
  const similarCamerasToRender = similarCameras.slice(firstCameraToRender, lastCameraToRender);

  const handleNextButton = () => {
    setFirstCameraToRender(firstCameraToRender + SLIDER_STEP);
  };

  const handleBackButton = () => {
    setFirstCameraToRender(firstCameraToRender - SLIDER_STEP);
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
            {firstCameraToRender > 0 &&
              <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" onClick={handleBackButton}>
                <svg width="7" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>}
            <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" onClick={handleNextButton} disabled={firstCameraToRender >= similarCameras.length - SIMILAR_CARDS_NUMBER}>
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
