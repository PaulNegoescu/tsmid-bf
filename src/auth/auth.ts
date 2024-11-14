import { ApiHelper } from "../apiHelper/apiHelper";
import type { User, UserWithPassword } from "./types";

type UserProps = keyof UserWithPassword;

const registerApi = new ApiHelper<User>('/register')
const loginApi = new ApiHelper<User>('/login')

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
    'register': signup,
    'login': signin,
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
  const response = await submitFn[formType]<{accessToken: string, user: User}>(sendToServer);
  console.log(response);
  
  localStorage.setItem('auth', JSON.stringify(response));
}


