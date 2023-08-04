import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles,
    useMantineTheme,
    useMantineColorScheme,
    Button
  } from '@mantine/core';
import {notifications} from '@mantine/notifications'
import { useNavigate } from 'react-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { IconCalendarStats, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '../redux/UserRedux';

  
  
  const useStyles = createStyles((theme) => ({
    user: {
      display: 'block',
      width: '100%',
      padding: theme.spacing.md,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      },
    },
    text:{
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    },
    chevron: {
      transition: 'transform 200ms ease',
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    },
  }));
  
  interface UserButtonProps extends UnstyledButtonProps {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
  }
  
  export function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
    const { classes } = useStyles();
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showNotif = (title,msg) => {
      notifications.show({
        title: title,
        message: msg,
      });
    };

    const iconColor = colorScheme === 'dark' ? 'white' : 'black';

    // State to track if the logout option is open or closed
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  
    // Ref to the container element of the logout option
    const logoutOptionRef = useRef(null);
  
    // Function to handle the click on the chevron icon
    const handleChevronClick = () => {
      setIsLogoutOpen(!isLogoutOpen);

    }
      // Function to handle the logout action
    const handleLogout = () => {
      signOut(auth)
      .then(() => {
        dispatch(LogoutUser());
        navigate('/');
        showNotif("","Signed out successfully");
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // An error happened.
        showNotif('Sign-out error:', error);
        console.log('Sign-out error:', error);
      });
    };


    return (
      <>{isLogoutOpen && (
        <div ref={logoutOptionRef}>
          {/* Add your logout option content here */}
          <p>Logout</p>
          <Button onClick={handleLogout}>Confirm Logout</Button>
        </div>
      )}
      <UnstyledButton onClick={handleChevronClick} className={classes.user} {...others}>
        <Group>
          <Avatar src={image} radius="xl" />
  
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500} className={classes.text}>
              {name}
            </Text>
  
            <Text color="dimmed" size="xs" className={classes.text}>
              {email}
            </Text>
          </div>
          {isLogoutOpen ? (
            <UnstyledButton  ><IconChevronLeft className={classes.chevron} size="1rem" stroke={1.5} color={iconColor}/></UnstyledButton>
          ) : (
            <UnstyledButton ><IconChevronRight className={classes.chevron} size="1rem" stroke={1.5} color={iconColor} /></UnstyledButton>
          )}
        </Group>
      </UnstyledButton>
      </>
    );
  }