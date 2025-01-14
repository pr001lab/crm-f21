import { Outlet } from 'react-router-dom';
import SpinnerBootstrap from '../../components/Spinner/SpinnerBootstrap.tsx';

function AuthLayout() {
  return (
    <>
      <Outlet />
      <SpinnerBootstrap />
    </>
  );
}

export default AuthLayout;
