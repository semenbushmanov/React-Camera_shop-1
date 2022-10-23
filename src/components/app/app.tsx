import { Route, Routes, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import Catalog from '../../pages/catalog/catalog';
import Item from '../../pages/item/item';
import Basket from '../../pages/basket/basket';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<Navigate to={AppRoute.CatalogStart} />}
      />
      <Route
        path={AppRoute.CatalogPage}
        element={<Catalog />}
      />
      <Route
        path={AppRoute.ItemId}
        element={<Item />}
      />
      <Route
        path={AppRoute.ItemTab}
        element={<Item />}
      />
      <Route
        path={AppRoute.Basket}
        element={<Basket />}
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;
