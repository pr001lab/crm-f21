import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {socket} from '../config/socket';
import styles from './AddProduct.module.css';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {AppRoute, LabelsMenu} from '../../constant.ts';
import {CgWebsite} from 'react-icons/cg';
import useScreenSize from "../../hooks/useScreenSize.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {editClient} from "../../store/client.slice.ts";
import {IClientProps} from "../../types/client.ts";

const ClientForm = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {jwt} = useSelector((state: RootState) => state.user);
  const {isDesktopView} = useScreenSize();

  const [fields, setFields] = useState({
    name: '',
    company: '',
    email: ''
  });

  const {id: documentId} = useParams();
  const {items: clients} = useSelector(
    (state: RootState) => state.client
  );
  const client = clients.find((client) => client.documentId === documentId);

  useEffect(() => {
    if (client !== undefined) {
      setFields({...client});
    }
  }, [])

  const formSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setProcessing(true);

    if (client !== undefined) {
      const editedClient: IClientProps = {
        documentId: client.documentId,
        name: fields.name,
        company: fields.company,
        email: fields.email
      };
      dispatch(editClient({client: editedClient}))
      navigate(`${AppRoute.Main}`, {replace: true});
    } else {
      socket.emit(
        'addClient',
        {...fields, jwt},
        () => {
          navigate(`${AppRoute.Main}`, {replace: true});
        }
      );
    }
    setProcessing(false);
  };

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [evt.target.name]: evt.target.value
    })
  }

  const formTitle = client ? 'Edit Client' : LabelsMenu.AddClient

  return (
    <Container style={{maxWidth: '480px', minWidth: '320px'}}>
      <Row className='justify-content-center'>
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card className='my-5 px-5 py-3'>
            <Card.Body>
              <Card.Title className='text-center'>
                <CgWebsite size={24}/> {formTitle}
              </Card.Title>
              <Form onSubmit={formSubmit}>
                <Form.Group className={styles['input-group']}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type='text'
                    placeholder='Enter name of client'
                    required
                    autoComplete='on'
                    value={fields.name}
                    onChange={onInputChange}
                  />
                </Form.Group>
                <Form.Group className={styles['input-group']}>
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    name="company"
                    type='text'
                    placeholder='Enter name of company'
                    required
                    autoComplete='on'
                    value={fields.company}
                    onChange={onInputChange}
                  />
                </Form.Group>
                <Form.Group className={styles['input-group']}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder='Enter email address of client'
                    required
                    autoComplete='on'
                    value={fields.email}
                    onChange={onInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Button variant='primary' type='submit' disabled={processing}>
                    {processing ? 'Processing' : 'Submit'}
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientForm;
