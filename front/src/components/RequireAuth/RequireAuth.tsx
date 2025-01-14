import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../constant.ts';
import { IRequireAuthProps } from './RequireAuth.props.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

export const RequireAuth = ({ children }: IRequireAuthProps) => {
  const jwt = useSelector((state: RootState) => state.user.jwt);

  if (!jwt) {
    return <Navigate to={AppRoute.SignIn} replace />;
  }

  return children;
};
