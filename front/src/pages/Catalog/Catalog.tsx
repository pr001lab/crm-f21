import { Button, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import CatalogItem from '../../components/CatalogItem/CatalogItem.tsx';
import { IClientProps } from '../../types/client.ts';
import { toast } from 'react-toastify';
import { socket } from '../config/socket.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../../store/store.ts';
import { getProfileUser } from '../../store/user.slice.ts';
import Heading from '../../components/common/Heading/Heading.tsx';
import { clientActions, getClients } from '../../store/client.slice.ts';

import { ChevronDown, ChevronUp } from 'react-feather';

export interface SortProps {
  children: React.ReactNode;
  sortType?: string;
}

const Catalog = () => {
  const { jwt } = useSelector((state: RootState) => state.user);
  const { items: clients } = useSelector((state: RootState) => state.client);
  const dispatch = useDispatch<AppDispatch>();
  const [sortType, setSortType] = useState<string>('');

  useEffect(() => {
    if (jwt) {
      store.dispatch(getProfileUser());
    }
  }, [jwt]);

  useEffect(() => {
    store.dispatch(getClients());
  }, []);

  useEffect(() => {
    socket.on('SocketUserConnected', (res) => {
      const data = JSON.parse(res);
      toast.success(data.message, {
        toastId: 'SocketUserConnected',
      });
    });
  }, []);

  useEffect(() => {
    socket.on('newClientAdded', (res) => {
      toast.info('A new client has been added', {
        toastId: 'newClientAdded',
      });
      dispatch(clientActions.addItem(res.client));
    });
  }, []);

  if (clients.length === 0) {
    return (
      <>
        <Heading>Client List</Heading>
        <span>Oops... No client found:(</span>
      </>
    );
  }

  return (
    <>
      <Heading>Client List</Heading>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>
              name
              <Button
                variant='link'
                className='px-1 py-0'
                onClick={() => setSortType('asc')}
              >
                <ChevronDown color='#212529' />
              </Button>
              <Button
                variant='link'
                className='px-1 py-0'
                onClick={() => setSortType('desc')}
              >
                <ChevronUp color='#212529' />
              </Button>
            </th>
            <th>company</th>
            <th>email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <Sort sortType={sortType}>
            {clients.map((client: IClientProps, idx) => (
              <CatalogItem key={client.documentId} {...client} num={idx + 1} />
            ))}
          </Sort>
        </tbody>
      </Table>
    </>
  );
};

const ascCompare = (aRaw, bRaw) => {
  const a = aRaw.props['name'];
  const b = bRaw.props['name'];
  return a.localeCompare(b);
};

const descCompare = (aRaw, bRaw) => {
  const a = aRaw.props['name'];
  const b = bRaw.props['name'];
  return b.localeCompare(a);
};

const Sort = ({ children, sortType }: SortProps) => {
  if (!sortType) {
    return children;
  }
  if (sortType === 'asc') {
    return React.Children.toArray(children).sort(ascCompare);
  }
  if (sortType === 'desc') {
    return React.Children.toArray(children).sort(descCompare);
  }
};

export default Catalog;
