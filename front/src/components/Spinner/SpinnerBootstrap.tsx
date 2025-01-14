import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { LoadingStatus } from '../../constant.ts';

function SpinnerBootstrap() {
  const { loadingStatus } = useSelector((state: RootState) => state.client);

  if (loadingStatus !== LoadingStatus.Loading) {
    return;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
}

export default SpinnerBootstrap;
