import {authInfo} from './auth/auth';
import './notes';

import './main.css';

if(!authInfo.user) {
  if(location.pathname !== '/') {
    location.replace('/');
  }
  throw new Error('You need to log in to continue!');
}
console.log('Welcome,', authInfo.user?.firstName);
