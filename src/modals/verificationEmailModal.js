import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Modal, useMantineTheme, Group, Box, Stack, TextInput,Button, Flex, Divider, Text, useMantineColorScheme } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import classes from '../styles/Form.module.scss'
import { Mail } from 'tabler-icons-react';
import { GoVerified } from 'react-icons/go'


export default function EmailVerifModal() {
  const isLargeScreen = window.innerWidth >= 1024;
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const {colorScheme} = useMantineColorScheme
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false)

  const iconColor = colorScheme === 'dark' ? theme.white : theme.black;

  const handleGoToLogin = () => {
    signOut(auth)
    .then(() => {
      navigate('/login');
    })
    .catch((error) => {
    });
  }

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
          <><Mail
          size={60}
          strokeWidth={2}
          color={iconColor}
        />
        <h3 className={classes.h1text3}>The Verification Email has been sent <GoVerified color={iconColor} size={'1rem'}/><br></br> Check your Inbox! ✉️<br/><br/><br/></h3> 
      </>

        </Flex>
        <Button style={{ justifyContent:'center', alignItems:'center' }} variant='gradient' onClick={handleGoToLogin}>Confirm</Button>
      </Stack>
      </Box>
      </Modal>

      <Group position="center">
        <Button variant='gradient' size={isLargeScreen ? 'md' : 'xs'} onClick={open}>Continue</Button>
      </Group>
  
    </>
  );
}