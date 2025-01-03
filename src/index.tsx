import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuth, fetchOffers } from './store/api-actions';
import { ToastContainer } from 'react-toastify';

store.dispatch(fetchOffers());
store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="bottom-left"
        closeOnClick
        pauseOnHover
      />
      <App />
    </Provider>
  </React.StrictMode>
);
