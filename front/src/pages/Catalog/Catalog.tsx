import { Table } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../../store/store.ts';
import CatalogList from '../../components/CatalogList/CatalogList.tsx';
import { LoadingStatus, ParamNames } from '../../constant.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getClients } from '../../store/client.slice.ts';

const Catalog = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');

  const { items: clients, loadingStatus } = useSelector(
    (state: RootState) => state.client,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams();
    if (q) {
      urlSearchParams.append(ParamNames.SearchFullText, q);
    } else {
      urlSearchParams.delete(ParamNames.SearchFullText);
    }

    store.dispatch(getClients({ params: urlSearchParams }));
  }, [dispatch, navigate, q]);

  if (clients.length === 0 && loadingStatus === LoadingStatus.Successed) {
    return (
      <>
        <span>Oops... No client found:(</span>
      </>
    );
  }

  if (loadingStatus !== LoadingStatus.Successed) {
    return;
  }

  return (
    <Table responsive>
      <CatalogList clients={clients} />
    </Table>
  );
};

export default Catalog;
