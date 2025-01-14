export const API = 'http://localhost:1337/api';
export const AUTH_TOKEN = 'authToken';

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Successed = 'successed',
  Failed = 'failed',
}

export enum APIRoute {
  SignIn = '/auth/local',
  SignUp = '/auth/local/register',
  getProfileUser = 'users/me',
  Clients = '/clients',
}

export enum AppRoute {
  Main = '/',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Client = '/client',
  ClientId = '/client/:id',
  AddClient = '/add-client/'
}

export enum LabelsMenu {
  Catalog = 'Client List',
  AddClient = 'Add Client',
  Logout = 'Logout',
  Login = 'Login',
  SignUp = 'SignUp'
}
