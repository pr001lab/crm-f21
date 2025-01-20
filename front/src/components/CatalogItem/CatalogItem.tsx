import { IClientProps } from '../../types/client.ts';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../store/store.ts';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { AppRoute } from '../../constant.ts';
import { deleteClient } from '../../store/client.slice.ts';

function CatalogItem(client: IClientProps) {
  const { name, company, email, num, documentId } = client;
  const dispatch = useDispatch<AppDispatch>();

  const onDeleteClick = async () => {
    if (documentId) {
      dispatch(deleteClient({ documentId }));
    }
  };

  return (
    <tr className='align-middle'>
      <td>{num}</td>
      <td>{name}</td>
      <td>{company}</td>
      <td>{email}</td>
      <td className='align-middle'>
        <Link className='mx-1' to={`${AppRoute.Client}/${documentId}`}>
          Edit
        </Link>
        {'|'}
        <Button
          variant='link'
          className='px-1 py-0'
          onClick={() => onDeleteClick()}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default CatalogItem;
