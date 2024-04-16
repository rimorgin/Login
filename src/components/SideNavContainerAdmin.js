import React,{ useState, useEffect } from 'react';
import { Transition, Paper, Button, rem, useMantineColorScheme, createStyles, Navbar, Group, Divider, ScrollArea, Code, Text, UnstyledButton, Flex, useMantineTheme, Menu } from '@mantine/core';
import { MdOutlineMenu, MdOutlineMenuOpen } from 'react-icons/md';
import { useClickOutside, useReducedMotion } from '@mantine/hooks';
import ColorScheme from './ColorScheme';
import  blackbrgyLogo  from '../images/black-brgy-tagname.png';
import  whitebrgyLogo  from '../images/white-brgy-tagname.png';
import '../styles/brgy-logo.css';
import { BuildingPavilon, CircleLetterO, CircleLetterS, CircleLetterZ, Dashboard, Stack, CalendarEvent } from 'tabler-icons-react';
import { UserButton } from './NavBarUserInfo.tsx';
import { LayoutDashboard, FileDescription, ArrowsDoubleNeSw, Home2 } from 'tabler-icons-react';
import { LinksGroup } from './NavBarLinksGroup.tsx';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Home from '../pages/Home';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '../redux/UserRedux';
import {notifications} from '@mantine/notifications'
import { AppContext } from '../App';
import { useContext } from 'react';
import LogoHeader from './LogoHeader';

const useStyles = createStyles((theme) => ({
  navbarsections: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: `10px 22px`,
    borderRadius: "18px",
    marginBottom: `-${theme.spacing.xs}px`,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.lighttheme[2]
        : theme.colors.darktheme[1],

    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.darktheme[5]
          : theme.colors.lighttheme[1],
      color: theme.colors.darktheme[0],
      cursor: "pointer",
      transition: "ease-in-out 250ms",
    },
  },
  navbarsectionsfocused: {
    background:
      theme.colorScheme === "dark"
        ? theme.colors.darktheme[1]
        : theme.colors.lighttheme[1],
    color: theme.colors.darktheme[0],
    transition: `ease-in-out 500ms`,
  },
    header: {
        padding: theme.spacing.md,
        paddingTop: 20,
        size: 'md',
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    
        borderBottom: `${rem(1)} solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[10]
        }`,
      },
      links: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        textDecorationColor: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    
      linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        textDecorationColor: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
      footer: {
        bottom: 0,
        position: 'absolute',
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[10]
        }`,
      },
      link: {
        color: 'white',
        position: 'relative',
    
        '&:before': {
          content: "''",
          position: 'absolute',
          width: '0',
          height: '2px',
          bottom: '-3px',
          left: '50%',
          transform: 'translate(-50%,0%)',
          backgroundColor: 'red',
          visibility: 'hidden',
          transition: 'all 0.3s ease-in-out',
        },
        '&:hover:before': {
          visibility: 'visible',
          width: '100%',
        },
      },

      sidebarContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: ({ opened }) => (opened ? 0 : 300), // Slide the container in/out of view based on the "opened" state
        position:'relative',
        display:'block',
        height: '100vh',
        width: 300,
        zIndex: 999,
        backgroundColor: theme.colors.dark[7], // Replace with your desired sidebar background color
        transition: 'right 0.3s ease-in-out', // Add a transition for the right property
      },
}))

export function SideNavContainerAdmin() {
  const [opened, setOpened] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const clickOutsideRef = useClickOutside(() => setOpened(false));
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [documentOpen, setDocumentOpen] = useState(false);
  const [documentPath, setDocumentPath] = useState('');
  const [dashboardPath, setDashboardPath] = useState('');
  const isLargeScreen = window.innerWidth >= 1024;
  const { classes, cx } = useStyles();
  const [Active, setActive] = useState(0);
  const {loggedInUserName, loggedInUserIMG, loggedInUserEmail} = useContext(AppContext);
  const iconColor = colorScheme === 'dark' ? theme.white : theme.black;
  const formattedUserName = loggedInUserName?.toUpperCase();
  

  const Logo = () => {
    const logoSrc = colorScheme === 'dark' ? blackbrgyLogo : whitebrgyLogo;

    return <img style={{ marginTop: '10px',height: '80px', marginLeft: '10px', width: '260px' }} src={logoSrc} alt="Barangay Sta Ana" />;
  };

  const dispatch = useDispatch();

    const showNotif = (title,msg) => {
      notifications.show({
        title: title,
        message: msg,
      });
    };


  const handleToggleSidebar = () => {
    setOpened((prevOpened) => !prevOpened);
  };
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
    <>
      <Button left='50px' top='30px' variant="gradient" onClick={handleToggleSidebar}>
        {opened ? <MdOutlineMenuOpen size={24} aria-label="Close" /> : <MdOutlineMenu size={24} aria-label="open" />}
      </Button>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: opened ? 0 : -300, // Slide the container in/out of view based on the "opened" state
          height: '100vh',
          width: 300,
          zIndex: 999,
          backgroundColor: colorScheme === 'dark' ? theme.colors.dark[7] : theme.white, // Replace with your desired sidebar background color
          transition: 'left 0.3s ease-in-out', // Add a transition for the left property
        }}
        ref={clickOutsideRef}
      >
          <div>
            <LogoHeader/>
          </div>
          <div>
            <Group position="apart" className={classes.header}>
                <Text>Hello Admin, {formattedUserName}</Text>
            </Group>
          </div>
          <Divider my={'md'} size={0}/><Divider my={'md'} size={0}/>
          <div className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 1,
              })}>
            <UnstyledButton component={Link} to={'/'}>
              <Flex className={classes.links}><Home2 size={'1.5rem'} color={iconColor}/><Text style={{ marginLeft: '5px' }}>Home</Text></Flex>
            </UnstyledButton>
          </div>
          <Divider my={'md'}/>
          <div className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 1,
              })}>
            <UnstyledButton component={Link} to={'/admin-dashboard'}>
              <Flex className={classes.links}><LayoutDashboard size={'1.5rem'} color={iconColor}/><Text style={{ marginLeft: '5px' }}>Dashboard</Text></Flex>
            </UnstyledButton>
          </div>
          <Divider my={'md'}/>
          <div className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 1,
              })}>
            <UnstyledButton component={Link} to={'/admin-dashboard/Barangay-officials'}>
            <Flex className={classes.links}><CircleLetterO size={'1.5rem'} color={iconColor}/><Text style={{ marginLeft: '5px' }}>Barangay Officials</Text></Flex>
            </UnstyledButton>
          </div>
          <Divider my={'md'}/>
          <div className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 2,
              })}>
            <UnstyledButton component={Link} to={'/admin-dashboard/staffs-list'}>
            <Flex className={classes.links}><CircleLetterS size={'1.5rem'} color={iconColor}/><Text style={{ marginLeft: '5px' }}>Barangay Staffs</Text></Flex>
            </UnstyledButton>
          </div>
          <Divider my={'md'}/>
          <div className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 4,
              })}>
            <UnstyledButton component={Link} to={'/admin-dashboard/residents'}>
            <Flex className={classes.links}><BuildingPavilon size={'1.5rem'} color={iconColor}/><Text style={{ marginLeft: '5px' }}>Residents</Text></Flex>
            </UnstyledButton>
          </div>
          <Divider my={'md'}/>
          <div className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 5,
              })}>
            <UnstyledButton component={Link} to={'/admin-dashboard/documents'}>
            <Flex className={classes.links}><FileDescription size={'1.5rem'} color={iconColor}/><Text style={{ marginLeft: '5px' }}>Request a Document</Text></Flex>
            </UnstyledButton>
          </div>
          <Divider my={'md'}/>
          <div className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 6,
              })}>
            <UnstyledButton component={Link} to={'/admin-dashboard/transactions'}>
            <Flex className={classes.links}><ArrowsDoubleNeSw size={'1.5rem'} color={iconColor}/><Text style={{ marginLeft: '5px' }}>Transactions</Text></Flex>
            </UnstyledButton>
          </div>
          <Divider my={'md'}/>
          <div className={cx(classes.navbarsections, {
                [classes.navbarsectionsfocused]: Active === 7,
              })}>
            <UnstyledButton component={Link} to={'/admin-dashboard/events'}>
            <Flex className={classes.links}><CalendarEvent size={'1.5rem'} color={iconColor}/><Text style={{ marginLeft: '5px' }}>Events</Text></Flex>
            </UnstyledButton>
          </div>
          



          <div className={classes.footer}>
          <UserButton
            image={loggedInUserIMG}
            name={loggedInUserName}
            email={loggedInUserEmail}
          />
        </div>
      </div>
    </>
  );
}
