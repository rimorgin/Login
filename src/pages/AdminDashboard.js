import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppShell, Header, Group, Box,Navbar, useMantineTheme, Container, createStyles, Paper, rem} from '@mantine/core';
import PreLoader from '../components/Loader';
import { notifications } from '@mantine/notifications';
import { SideNavBar } from '../components/SideNavBar';
import { useMantineColorScheme } from '@mantine/core';
import ColorScheme from '../components/ColorScheme';
import {SideNavContainerAdmin} from '../components/SideNavContainerAdmin';
import Position from 'rsuite/esm/Overlay/Position';
import  blackbrgyLogo  from '../images/black-brgy-tagname.png';
import  whitebrgyLogo  from '../images/white-brgy-tagname.png';
import { StatsRingCard } from '../components/InfoStats.tsx';
import UserDataService from '../services/user.services';

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
        ? theme.colors.darktheme[5]
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
  "completed": 125,
  "total": 500,
  "stats": [
    {
      "value": 450,
      "label": "Remaining"
    },
    {
      "value": 25,
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

const AdminDashboard = () => {
  const {classes} = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavbarOpen, setNavbarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isLargeScreen = window.innerWidth >= 1024;
  const [usersCount, setUsersCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const usersTotalCount = 120120;
  const usersRemainingCount = usersTotalCount-usersCount;

  useEffect(() => {
    console.log(usersCount); 
  }, [usersCount]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsFetching(true);
        const querySnapshot = await UserDataService.getAllUsers();
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        const usersDataCount = usersData.length
        setUsersCount(usersDataCount)
        setIsFetching(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);


  const usersDataStats = 
  {
    "title": "Registered Users",
    "completed": `${usersCount}`,
    "total": `${usersTotalCount}`,
    "stats": [
      {
        "value": `${usersRemainingCount}`,
        "label": "Remaining"
      },
      {
        "value": `${usersCount}`,
        "label": "Registered"
      },
    ] 
  }


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
                    {<SideNavContainerAdmin/>}
                    </div>
                  </div>
                  <div>
                    {isLargeScreen && <ColorScheme/>} {/* Placed to the rightmost side */}
                  </div>
                </div>
       </Header>
    )
  }

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
                    {StatsRingCard(usersDataStats)}
                    </Paper>
                </Container>
            </div>
            </div>
          </>
          
      </AppShell>
    </div>
  );
};

export default AdminDashboard;
