import { useSearchParams } from 'react-router-dom';
import { Tab } from '../../const';

type TabsProps = {
  vendorCode: string;
  category: string;
  type: string;
  level: string;
  description: string;
};

function Tabs(props: TabsProps): JSX.Element {
  const [ searchParams, setSearchParams ] = useSearchParams({ tab: Tab.Description });
  const tab = searchParams.get('tab');
  const { vendorCode, category, type, level, description } = props;

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={tab === Tab.Specs ? 'tabs__control is-active' : 'tabs__control'}
          onClick={() => setSearchParams({ tab: Tab.Specs })}
          type="button"
        >Характеристики
        </button>
        <button
          className={tab === Tab.Description ? 'tabs__control is-active' : 'tabs__control'}
          onClick={() => setSearchParams({ tab: Tab.Description })}
          type="button"
        >Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={tab === Tab.Specs ? 'tabs__element is-active' : 'tabs__element'}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={tab === Tab.Description ? 'tabs__element is-active' : 'tabs__element'}>
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
