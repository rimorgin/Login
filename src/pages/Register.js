import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import classes from "../styles/Form.module.scss";
import { notifications } from '@mantine/notifications';
import { auth} from '../firebase';
import { HomeNavBar } from '../components/HorizontalNavBar';
import { Badge, Password } from 'tabler-icons-react';
import { IconAt} from '@tabler/icons-react';
import  RegisterInfo  from '../modals/registrationModal';
import { TextInput,PasswordInput, Stack } from '@mantine/core';
import {useForm, isEmail, matchesField} from '@mantine/form'
import { useDisclosure } from '@mantine/hooks';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '../redux/UserRedux';

 
const showNotif = (title,msg) => {
    notifications.show({
      title: title,
      message: msg,
      icon: <Badge
      size={60}
      strokeWidth={3}
      color={'black'}
    />
    });
  };




  const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLargeScreen = window.innerWidth >= 1024;
    const [visible, { toggle }] = useDisclosure(false);
  
    const form = useForm({
      initialValues: { email: '', password: '', confirmPassword: '' },
  
      // Functions will be used to validate values at corresponding key
      validate: {
        email: isEmail('Invalid email'),
        password: (value) =>
          value.length < 8 ? 'Password must have at least 8 letters' : null,
        confirmPassword: matchesField(
          'password',
          'Passwords did not match'
        ),
      },
    });
  
    const handleError = (errors) => {
      if (errors.email) {
        showNotif('Oops!', errors.email);
      }
      if (errors.password) {
        showNotif('Oops!', errors.password);
      }
      if (errors.confirmPassword) {
        showNotif('Oops!', errors.confirmPassword);
      }
    };
  
    const handleSubmit = async (e) => {
      const isNameValid = form.validateField('name');
      const isPasswordValid = form.validateField('password');
      const isConfirmPasswordValid = form.validateField('confirmPassword');
      const values = form.values;
  
      if (isNameValid && isPasswordValid && isConfirmPasswordValid) {
        try {
          await createUserWithEmailAndPassword(auth, values.email, values.password);
          showNotif('You are now registered!');
          console.log('User registered successfully');
          navigate('/login');
        } catch (error) {   
          const errorCode = error.code;
          const errorMessage = error.message;
          showNotif(errorCode, errorMessage);
          console.log(errorCode, errorMessage);
        }
      } else {
        console.log('Form contains errors');
      }
    };
  
    return (
      <main>
        <HomeNavBar/>
        <section>
          <div>
            <div className={classes.container}>
              <h1 className={classes.h1text} >
                Registration for <br></br> Barangay Sta Ana
              </h1>
              <RegisterInfo/>
              <p className={classes.signUpPrompt}>
                Already have an account?{' '}
                <NavLink to="/residentuserlogin">
                  Sign in
                </NavLink>
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  };
  
  export default Register;