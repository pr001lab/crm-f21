import Heading from '../../components/common/Heading/Heading.tsx';
import styles from './Error.module.css';
import { Link, useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.error}>
      <div>
        <Heading className={styles.h1}>404</Heading>
        <Heading className={styles.h2} level='h2'>
          {' '}
          This page could not be found.{' '}
          <Link onClick={() => navigate(-1)} to={'#'}>
            Back
          </Link>
        </Heading>
      </div>
    </div>
  );
}

export default ErrorPage;
