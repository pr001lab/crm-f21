import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useScreenSize from '../../hooks/useScreenSize.tsx';
import { AppRoute } from '../../constant';
import { FormEvent, useEffect } from 'react';
import { CgWebsite } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { signIn, signUp, userActions } from '../../store/user.slice.ts';

const dataForms: {
  [char: string]: {
    title: string;
    api: string;
    textButton: string;
    linkTo: string;
    linkText: string;
    question: string;
  };
} = {
  'sign-up': {
    title: 'Sign Up',
    api: '/signUp',
    textButton: 'Submit',
    linkTo: AppRoute.SignIn,
    linkText: 'Sign In',
    question: 'Already have an account?',
  },
  'sign-in': {
    title: 'Sign In',
    api: '/',
    textButton: 'Login',
    linkTo: AppRoute.SignUp,
    linkText: 'Sign Up',
    question: "Don't you have an account yet?",
  },
};

type SignInType = {
  username: {
    value: string;
  };
  password: {
    value: string;
  };
};

type SignUpType = {
  email: {
    value: string;
  };
  username: {
    value: string;
  };
  password: {
    value: string;
  };
};

const AuthForm = () => {
  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const routeName = pathname.replace(/^\/|\/$/g, '');
  const dataForm = dataForms[routeName];

  const dispatch = useDispatch<AppDispatch>();
  const { jwt } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (jwt) {
      navigate(AppRoute.Main);
    }
  }, [jwt, navigate]);

  const onAuthFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(userActions.clearErrorMessage());
    const target = evt.target as typeof evt.target & SignInType & SignUpType;
    const { username, password, email } = target;
    if (pathname === AppRoute.SignIn) {
      dispatch(
        signIn({ identifier: username.value, password: password.value }),
      );
    } else {
      if (email) {
        dispatch(
          signUp({
            email: email.value,
            name: username.value,
            password: password.value,
          }),
        );
      }
    }
  };

  return (
    <Container style={{ maxWidth: '480px', minWidth: '320px' }}>
      <Row className='justify-content-center'>
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card className='my-5 px-5 py-3'>
            <Card.Body>
              <Card.Title className='text-center'>
                <CgWebsite size={24} /> {dataForm.title}
              </Card.Title>
              <Form name='basic' onSubmit={onAuthFormSubmit}>
                <Form.Group className='mb-3' controlId='formGroupUsername'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name='username'
                    type='text'
                    placeholder='Enter Username'
                    required
                  />
                </Form.Group>
                {pathname === AppRoute.SignUp && (
                  <Form.Group className='mb-3' controlId='formGroupEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name='email'
                      type='email'
                      placeholder='Enter Email address'
                      required
                    />
                  </Form.Group>
                )}
                <Form.Group className='mb-3' controlId='formGroupPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name='password'
                    type='text'
                    placeholder='Enter Password'
                    required
                  />
                </Form.Group>
                <Form.Group className='m-3 text-center'>
                  <Button
                    variant='primary'
                    type='submit'
                    className='login_submit_btn'
                  >
                    {dataForm.textButton}{' '}
                  </Button>
                </Form.Group>
                <Form.Group className='m-3 text-center'>
                  <Form.Text muted>
                    {dataForm.question}{' '}
                    <Link to={dataForm.linkTo}>{dataForm.linkText}</Link>
                  </Form.Text>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
