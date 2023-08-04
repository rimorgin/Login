import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { LoginUser, LogoutUser } from '../redux/UserRedux';
import { createStyles, Stack, Divider, PasswordInput, Flex, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import classes from '../styles/Form.module.scss';
import { notifications } from '@mantine/notifications';
import { Alert } from '@mantine/core';
import { IconAlertCircle, IconAt } from '@tabler/icons-react';
import { HomeNavBar } from '../components/HorizontalNavBar';
import logoImage from '../images/brgy-logo.jpg';
import { TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MediaQuery, Text, rem, Group, Button } from '@mantine/core';
import PreLoader from '../components/Loader';
import { Badge,Password } from 'tabler-icons-react';
import { isEmail, matchesField, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { MdOutlineLogin } from 'react-icons/md';
import { color } from 'framer-motion';
import ForgotPW from '../modals/reset-passwModal';

const isLargeScreen = window.innerWidth >= 1024; // Adjust the breakpoint value according to your needs

const useStyles = createStyles((theme) => ({
  container: {
    // Your existing styles for the container, including the existing box shadow and border

    // Use the useMantineColorScheme hook to access the current color scheme
    ...theme.colorScheme === 'dark'
      ? {
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)', // Update box-shadow for dark color scheme
          border: '5px solid', // Update border for dark color scheme
          borderColor: 'black'
        }
      : {
          boxShadow: '0 0 10px rgba(0, 0, 0, 1)', // Default box-shadow for light color scheme
          border: '5px solid ', // Default border for light color scheme
          borderColor: 'white'
        },
  },
}));



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

const AdminLogin = () => {
  const {colorScheme} = useMantineColorScheme();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLargeScreen = window.innerWidth >= 1024;
  const [visible, { toggle }] = useDisclosure(false);
  const [loginState, setLoginState] = useState(false);
  const [adminState, setAdminState] = useState(false);
  const [zoneLeaderState, setZoneLeaderState] = useState(false);
  const [createState, setCreateState] = useState(false);
  const [preload, setPreload] = useState(false);

  const iconColor = colorScheme === 'dark' ? 'white' : 'black';


      const form = useForm({
        initialValues: {
          email: '',
          password: '',
          confirmPassword: '',
        },
    
        validate: {
          email: isEmail("Invalid Email"),
          password: (value) => (value.length < 1 ? 'Enter a valid password!' : null),
          confirmPassword: matchesField('password','passwords did not match')
        },
      });


// Simulate some async process, like fetching data
useEffect(() => {
  setTimeout(() => {
    setPreload(false); // Set preload to false after the async process is completed
  }, 5000); // Simulate a 5-second loading time
}, []);

    async function onLogin(e) {
    e.preventDefault();
    const values = form.values;
    const isEmailValid = form.validateField('email');
    const isPasswordValid = form.validateField('password');
    const isConfirmPasswordValid = form.validateField('confirmPassword');
    
    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
    try {
      // Signed in
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      setLoginState(true);
      setCreateState(true);
      const loggedInUser = userCredential.user;
      const loggedInUserUID = loggedInUser.uid;
      const loggedInUserEmail = loggedInUser.email;
      const loggedInUserName = loggedInUser.displayName;

      if (loggedInUserName ===''){
        loggedInUserName = loggedInUserEmail;
      }
      
      if (loggedInUserUID === '133a9K4Q3KNh4iD93OrT5ZAZIAW2' || loggedInUserUID === 'grNkxp7iKKhEgh1jmcJ3CqJRJ1E3' || loggedInUserUID === '7gTgmve5osQFe1IgOKVw7yO2nsW2') {
        setPreload(true); 
        setAdminState(true);
        setZoneLeaderState(false);
        dispatch(LoginUser({user: loggedInUserName, uid: loggedInUserUID, email: loggedInUserEmail, isAdmin: true, isZLeader: false, inSession: true}));
        //console.log(dispatch(LoginUser({user: loggedInUserName,uid: loggedInUserUID, email: loggedInUserEmail, isAdmin: true, inSession: true})))
        navigate('/admin-dashboard');
      } else {
        showNotif('Authentication Error', 'Invalid credentials. Please try again.');
      }
      /*if (userCredential && userCredential.user) {
        const loggedInUser = userCredential.user;
        console.log('loggedInUser:', loggedInUser);

        const loggedInUserUID = loggedInUser.uid;
        const loggedInUserEmail = loggedInUser.email;

        const admitUser = {
          uid: loggedInUserUID, // Get the user UID from the logged-in user
          email: loggedInUserEmail,
        };

        console.log('uid: ' + loggedInUserUID);
        console.log('email: ' + loggedInUserEmail);

        setLoginState(true);
        setCreateState(true);
        if (loggedInUserUID && loggedInUserUID === 'CmviTqoTcJdTOB9aOhAa7mGOG3P2') {

          dispatch(LoginUser({ ...admitUser, isAdmin: true, status: 'success', loginStatus: true, authenticated: true }));
          navigate('/admin-dashboard')
        } else if (loggedInUserUID) {

          dispatch(LoginUser({ ...admitUser, isAdmin: false, status: 'success', loginStatus: true, authenticated: true }));
          navigate('/dashboard')
        }
    
      } else {
        // Authentication failed
        showNotif('Authentication Error', 'Invalid credentials. Please try again.');
        console.log('Authentication failed');
      }
      */
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      showNotif(errorCode, errorMessage + ' Please try again');
      console.log(errorCode, errorMessage);
    }
    }
  }

  return (
    <>
      {preload ? <PreLoader/> : 
      <><HomeNavBar/><main>
          <section>
            <div className={classes.container}>
              <h1 className={classes.h1text}>Hi, Welcome Back Admin!</h1>
              <h4 className={classes.h1text2}>Enter your Admin Credentials to continue</h4>

              <Stack maw={380} mx="auto">
                <Divider my={'5px'} size={0}></Divider>
                <TextInput
                  placeholder="Email Address"
                  label="Email Address"
                  variant="filled"
                  radius="md"
                  required={true}
                  size={isLargeScreen ? 'md' : 'sm'}
                  withAsterisk
                  visible={visible}
                  icon={<IconAt size="0.8rem" color={iconColor}/>}
                  {...form.getInputProps('email')} />

                <PasswordInput
                  placeholder="Password"
                  label="Password"
                  description="Password must include at least one letter, number and special character"
                  radius="md"
                  variant="default"
                  size={isLargeScreen ? 'md' : 'sm'}
                  withAsterisk
                  required={true}
                  icon={<Password size="0.8rem" color={iconColor}/>}
                  visible={visible}
                  onVisibilityChange={toggle}
                  {...form.getInputProps('password')} />
                <PasswordInput
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  radius="md"
                  variant="default"
                  size={isLargeScreen ? 'md' : 'sm'}
                  withAsterisk
                  required={true}
                  icon={<Password size="0.8rem" color={iconColor}/>}
                  visible={visible}
                  onVisibilityChange={toggle}
                  {...form.getInputProps('confirmPassword')} />
                <Group position="center" mt="xl">
                  <Button variant="gradient" onClick={onLogin}><span style={{ marginRight: '0.5rem' }}>Sign in</span>
                    <MdOutlineLogin
                      size={20} />
                  </Button>
                </Group>
              </Stack>
              <Flex className={classes.signUpPrompt}>
                <p>
                  No account yet?
                  <NavLink to="/register"><span style={{ marginLeft: '5px' }}>Sign up</span></NavLink>
                  <span style={{ marginLeft: '5px' }}><ForgotPW /></span>
                </p>
              </Flex>
            </div>
          </section>
        </main></>
      }
    </>
    
  );
};

export default AdminLogin;
