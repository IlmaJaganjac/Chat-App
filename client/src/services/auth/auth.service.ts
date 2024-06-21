import { instance } from '../axios';
import { LoginFormData, SignUpFormData } from '../../interfaces/auth.interface';
import { data } from 'autoprefixer';

export const SignUp = async (formData : SignUpFormData ) => {
  console.log('sign up sending', formData)
  const resp = await instance.post('/sign-up', formData);
  
  return resp;
}


export const Login = async (formData : LoginFormData ) => {
  console.log('sign up sending', formData)
  const resp = await instance.post('/login', formData);
  
  return {
    username: resp.data.username,
    status: resp.status
  }
}