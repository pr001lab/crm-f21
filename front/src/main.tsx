import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout/Layout.tsx';
import AuthForm from './pages/AuthForm/AuthForm.tsx';
import AuthLayout from './layouts/AuthLayout/AuthLayout.tsx';
import Catalog from './pages/Catalog/Catalog.tsx';
import ErrorPage from './pages/Error/ErrorPage.tsx';
import { AppRoute } from './constant.ts';
import { RequireAuth } from './components/RequireAuth/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientForm from './pages/ClientForm/ClientForm.tsx';

const router = createBrowserRouter([
  {
    path: AppRoute.Main,
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: AppRoute.Main,
        element: <Catalog />,
      },
      {
        path: AppRoute.AddClient,
        element: <ClientForm />,
      },
      {
        path: AppRoute.ClientId,
        element: <ClientForm />,
      },
    ],
  },
  {
    path: AppRoute.Main,
    element: <AuthLayout />,
    children: [
      {
        path: AppRoute.SignIn,
        element: <AuthForm />,
      },
      {
        path: AppRoute.SignUp,
        element: <AuthForm />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
