import AppHeader from '../../components/AppHeader/AppHeader.tsx';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SpinnerBootstrap from '../../components/Spinner/SpinnerBootstrap.tsx';
import Main from '../../components/common/Main/Main.tsx';

function Layout() {
  return (
    <>
      <AppHeader />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <SpinnerBootstrap />
    </>
  );
}

export default Layout;
