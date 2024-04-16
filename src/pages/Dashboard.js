import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppShell, Header, Group, Box,Navbar, useMantineTheme, Container, createStyles, Paper, rem} from '@mantine/core';
import PreLoader from '../components/Loader';
import { notifications } from '@mantine/notifications';
import { useMantineColorScheme } from '@mantine/core';
import ColorScheme from '../components/ColorScheme';
import {SideNavContainer} from '../components/SideNavContainer';
import Position from 'rsuite/esm/Overlay/Position';
import  blackbrgyLogo  from '../images/black-brgy-tagname.png';
import  whitebrgyLogo  from '../images/white-brgy-tagname.png';
import {StatsRingCard} from "../components/InfoStats.tsx"
import '../styles/brgy-logo.css';
import Home from './Home';
import Documents from './Documents';
import LogoHeader from '../components/LogoHeader';

const useStyles = createStyles((theme) => ({
  Container: {
    color: theme.colorScheme === 'dark' ? 'dark' : 'white',
    background: theme.colorScheme === 'dark' ? 'dark' : 'white'
  },
  root: {
    fontFamily: "Regular",
    width: "90dvw",
    height: "80dvh",
    borderRadius: `10px`,
    top: '50%',
    left: '50%',
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.lighttheme[0],
    transition: "ease-in-out 500ms",

    [theme.fn.smallerThan('sm')]: {
        width: "100dvw",
        fontSize: rem(10),
        lineHeight: 1.2,
      },
  },
}))


const mockdataTransactions = 
{
  "title": "Transactions",
  "completed": 0,
  "total": 5,
  "stats": [
    {
      "value": 3,
      "label": "Remaining"
    },
    {
      "value": 2,
      "label": "In progress"
    }
  ]
}

const mockdataEvents = 
{
  "title": "Events",
  "completed": 17,
  "total": 20,
  "stats": [
    {
      "value": 3,
      "label": "Remaining"
    },
    {
      "value": 2,
      "label": "In progress"
    }
  ]
}

const Dashboard = () => {
  const {classes} = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavbarOpen, setNavbarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isLargeScreen = window.innerWidth >= 1024;


const Logo = () => {
  const logoSrc = colorScheme === 'dark' ? blackbrgyLogo : whitebrgyLogo;

  return <img style={{height:('80px'), marginTop: '10px', marginLeft: '10px',width:('240px')}} src={logoSrc} alt="Barangay Sta Ana" />;
};

  const showNotif = (title, msg) => {
    notifications.show({
      title: title,
      message: msg,
    });
  };
  
  const HeaderDashBoard = () => {
    return(
      <Header height={100} color={colorScheme === 'dark' ? 'dark' : 'white'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', transition: 'ease-in-out 500ms' }}>
                  <div style={{ display: 'flex'}}>
                    <LogoHeader />
                    <div>
                    {<SideNavContainer/>}
                    </div>
                  </div>
                  <div>
                    {isLargeScreen && <ColorScheme/>} {/* Placed to the rightmost side */}
                  </div>
                </div>
       </Header>
    )
  }

  // The delay should be longer than the heartbeat by a significant enough amount that there won't be false positives
const liveTimeoutDelay = 10000
let liveTimeout = null

global.self.addEventListener('fetch', event => {
  clearTimeout(liveTimeout)
  liveTimeout = setTimeout(() => {
    console.log('User left page')
    // handle page leave
  }, liveTimeoutDelay)
  // Forward any events except for hearbeat events
  if (event.request.url.endsWith('/heartbeat')) {
    event.respondWith(
      new global.Response('Still here')
    )
  }
})

  const handleToggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNavbarOpen && event.target.closest('.navbar-container') === null) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNavbarOpen]);

  if (location.pathname === '/') {
    return <><PreLoader/><Home/></>
  }

  return (
    <div>
      <AppShell header={<HeaderDashBoard/>}>
          <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", top: '80%', marginTop: '50px' }}>
            <div className={classes.root}>
                <Container fluid="true" pt="lg">
                    <Paper>
                    {StatsRingCard(mockdataEvents)}
                    <br/>
                    {StatsRingCard(mockdataTransactions)}  
                    </Paper>
                </Container>
            </div>
            </div>
          </>
          
      </AppShell>
    </div>
  );
};

export default Dashboard;
