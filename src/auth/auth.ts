import { ApiHelper } from '../apiHelper/apiHelper';
import type { AuthInfo, User, UserWithPassword } from './types';

type UserProps = keyof UserWithPassword;

const storageKey = 'auth';
const fromStorage = localStorage.getItem(storageKey);

export let authInfo: AuthInfo | { user: null; accessToken: null } = fromStorage
  ? JSON.parse(fromStorage)
  : {
      user: null,
      accessToken: null,
    };


const registerApi = new ApiHelper<User>('/register');
const loginApi = new ApiHelper<User>('/login');

const signup = registerApi.create.bind(registerApi);
const signin = loginApi.create.bind(loginApi);

const forms = document.querySelectorAll<HTMLFormElement>('[data-form]');

for (const form of forms) {
  form.addEventListener('submit', auth);
}

async function auth(this: HTMLFormElement, e: SubmitEvent) {
  e.preventDefault();
  const formType = this.dataset.form as 'register' | 'login';
  const submitFn = {
    register: signup,
    login: signin,
  };
  const data = new FormData(this);
  const sendToServer: Record<UserProps, string> = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  for (const [name, value] of data) {
    sendToServer[name as UserProps] = value as string;
  }
  const response = await submitFn[formType]<AuthInfo>(sendToServer);

  authInfo = response;
  localStorage.setItem(storageKey, JSON.stringify(response));
  document.location.replace('notes.html')
}
