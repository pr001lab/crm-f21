import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../../store/store.ts';
import Heading from '../../components/common/Heading/Heading.tsx';
import SearchForm from '../../components/SearchForm/SearchForm.tsx';
import { getProfileUser } from '../../store/user.slice.ts';
import { socket } from '../config/socket.ts';
import { toast } from 'react-toastify';
import { clientActions } from '../../store/client.slice.ts';
import Catalog from '../Catalog/Catalog.tsx';

const Main = () => {
  const { jwt } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (jwt) {
      store.dispatch(getProfileUser());
    }
  }, [jwt]);

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
  }, [dispatch]);

  return (
    <>
      <Heading>Client List</Heading>
      <Heading level='h6'>Search by name</Heading>
      <SearchForm />
      <Catalog />
    </>
  );
};

export default Main;
