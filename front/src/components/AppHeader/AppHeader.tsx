import { Container, Navbar } from 'react-bootstrap';
import { CgWebsite } from 'react-icons/cg';
import styles from './Appheader.module.css';
import AppMenu from '../AppMenu/AppMenu.tsx';
import { AppRoute } from '../../constant.ts';
import { Link } from 'react-router-dom';
import Header from '../common/Header/Header.tsx';

const AppHeader = () => {
  return (
    <Header>
      <Container className={styles['app-header']} fluid>
        <Container>
          <Navbar expand='lg' className={styles['navbar']}>
            <Link to={AppRoute.Main}>
              <Navbar.Brand className={styles['header-space-brand']}>
                <CgWebsite size={64} />
              </Navbar.Brand>
            </Link>
            <AppMenu />
          </Navbar>
        </Container>
      </Container>
    </Header>
  );
};

export default AppHeader;
