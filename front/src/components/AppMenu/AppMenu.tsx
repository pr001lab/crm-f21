import { Button } from 'react-bootstrap';
import { AppRoute, LabelsMenu } from '../../constant.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { userActions } from '../../store/user.slice.ts';
import { useNavigate, NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './AppMenu.module.css';

function AppMenu() {
  const navigate = useNavigate();
  const { jwt, userName } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const onLogoutButtonClick = () => {
    dispatch(userActions.logout());
    navigate(AppRoute.Main, { replace: true });
  };

  if (jwt) {
    return (
      <div className={styles['app-menu']}>
        <NavLink //TODO: make comp so DRY
          to={AppRoute.Main}
          className={({ isActive }) =>
            cn(styles['link'], {
              [styles['active']]: isActive
            })
          }
        >
          {LabelsMenu.Catalog}
        </NavLink>{' '}
        <NavLink
          to={AppRoute.AddClient}
          className={({ isActive }) =>
            cn(styles['link'], {
              [styles['active']]: isActive
            })
          }
        >
          {LabelsMenu.AddClient}
        </NavLink>{' '}
        <Button className={styles['button']} onClick={onLogoutButtonClick}>
          {LabelsMenu.Logout}
        </Button>
        <span style={{ color: 'white' }}>{userName}</span>{' '}
      </div>
    );
  }

  return (
    <div>
      <NavLink
        to={AppRoute.SignIn}
        className={({ isActive }) =>
          cn(styles['link'], {
            [styles['active']]: isActive
          })
        }
      >
        {LabelsMenu.Login}
      </NavLink>{' '}
      <NavLink
        to={AppRoute.SignUp}
        className={({ isActive }) =>
          cn(styles['link'], {
            [styles['active']]: isActive
          })
        }
      >
        {LabelsMenu.SignUp}
      </NavLink>
    </div>
  );
}

export default AppMenu;
