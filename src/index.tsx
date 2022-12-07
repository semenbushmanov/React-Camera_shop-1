import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { fetchOriginalCamerasAction, fetchPromoAction } from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchPromoAction());
store.dispatch(fetchOriginalCamerasAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
