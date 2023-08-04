import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Modal, useMantineTheme, Group, Box, Stack, TextInput,Button, Flex, Divider, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { passwordReset } from "firebase/auth";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import classes from '../styles/Form.module.scss'
import { useForm, isEmail } from '@mantine/form';
import { Mail } from 'tabler-icons-react';


export default function ForgotPW() {
  const isLargeScreen = window.innerWidth >= 1024;
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  const [email, setEmail] = useState('')
  const [emailMessage, setEmailMessage] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault();
      setEmail(form.values.email)
      try {
        await sendPasswordResetEmail(auth, email);
        setEmailMessage(true);
      } catch (error) {    
        if (error.code === 'auth/user-not-found') {
          alert('User not found, try again!')
          setEmail('')
        }
      }
    };

    const form = useForm({
      initialValues: {
        email: '',
      },

      validate: {
        email: isEmail('Enter Valid Email'),
      }
    });

  return (
    <>
      <Modal
        opened={opened}
        centered
        size="auto"
        onClose={close}
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
      <Box className={classes.FlexDiv}>
      <Stack maw={'auto'} mx={'auto'}>
      <Flex >
      <div className={classes.signUpPrompt}>
        {
          emailMessage ?
          <><Mail
          size={60}
          strokeWidth={2}
          color={'white'}
        />
          <h3 className={classes.h1text3}>The Email has been sent <br></br> Check your Inbox! ✉️</h3></> : 
          <form onSubmit={handleSubmit}>
            <TextInput
              type="email"
              name="email"
              variant='filled'
              label='Enter your Email Address'
              placeholder="name@email.com"
              size={isLargeScreen ? 'md' : 'xs'}
              defaultValue={"your_email@email.com"}
              onChange={(e) => setEmail(e.target.value)}
  
              required
              {...form.getInputProps('email')} />
            <Divider my={'lg'} />
            <div>
              <Button variant='gradient' type='submit'>Reset Your Password</Button>
            </div>
          </form>
        }
        </div>
        </Flex>
      </Stack>
      </Box>
      </Modal>

      <Group position="center">
        <Link onClick={open}>Forgot Password?</Link>
      </Group>
      
    </>
  );
}