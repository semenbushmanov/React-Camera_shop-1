import { Route, Routes, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ItemScreen from '../../pages/item-screen/item-screen';
import BasketScreen from '../../pages/basket-screen/basket-screen';
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
        element={<CatalogScreen />}
      />
      <Route
        path={AppRoute.ItemId}
        element={<ItemScreen />}
      />
      <Route
        path={AppRoute.ItemTab}
        element={<ItemScreen />}
      />
      <Route
        path={AppRoute.Basket}
        element={<BasketScreen />}
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;
