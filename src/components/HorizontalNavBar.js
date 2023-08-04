import '../styles/brgy-logo.css';
import  blackbrgyLogo  from '../images/black-brgy-tagname.png';
import  whitebrgyLogo  from '../images/white-brgy-tagname.png';

import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineColorScheme,
    useMantineTheme,
    ActionIcon,
    Flex
  } from '@mantine/core';

  import { useDisclosure } from '@mantine/hooks';
  import {
    IconNotification,
    IconChartPie3,
    IconCalendarEvent,
    IconAppWindow,
    IconChevronDown,
    IconArchive,
    IconFaceId,
  } from '@tabler/icons-react';

import { Navigate, useNavigate, NavLink, useLocation, Link } from 'react-router-dom';
import ColorScheme from './ColorScheme';
import React, {useState, useEffect, useContext} from 'react';
import { ArrowBackUp } from 'tabler-icons-react';
import { useSelector } from 'react-redux';
import { AppContext } from '../App';
import { SplitButton } from './ButtonLogin';



  
  const useStyles = createStyles((theme) => ({
    link: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      padding: '20px',
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
  
      [theme.fn.smallerThan('sm')]: {
        height: rem(42),
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[7],
        padding: '20px',
      }),
    },
    mobileLink: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
  
      [theme.fn.smallerThan('sm')]: {
        height: rem(42),
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[7],
        padding: '20px',
      }),
    },
  
    subLink: {
      width: '100%',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      borderRadius: theme.radius.md,
      paddingLeft:'20px',
      paddingRight:'20px',
  
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[7],
      }),
  
      '&:active': theme.activeStyles,
    },
    dropdown:{
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      paddingTop: '15px',
      paddingLeft: '20px'
    },
    dropdownTitle:{
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
    },
    dropdownItem:{
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
    },
    dropdownDescription:{
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
    },
    dropdownHeader: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,  
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[7],
      margin: `calc(${theme.spacing.md} * -1)`,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
      paddingBottom: theme.spacing.xl,
      paddingLeft: '20px',
      paddingRight: '20px',
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[7]
      }`,
    },
    mobileSublink: {
      width: '100%',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[7],
      }),
  
      '&:active': theme.activeStyles,
    },
    dropdownFooter: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      alignContent:'center',
      alignItems: 'center',
      justifyContent: 'center',
      margin: `calc(${theme.spacing.md} * -1)`,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
      paddingBottom: theme.spacing.xl,
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop:'10px',
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[5]
      }`,
    },

    getStarted: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      borderTop: `${rem(3)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.black
      }`,
      paddingRight: '20px',
      marginTop: '20px'
    },

    LogRegMobile:{
      marginTop: '20px',
    },
  
    hiddenMobile: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
        right:'50%',
        left: '50%',
      },
    },
  
    hiddenDesktop: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black, 
        fontSize:'15px',
      },
    },
    logoDesc: {
      display: 'inline-block',
    },
    divlogocontainer:{
      transition: "ease-in-out 500ms",
    },
    logoContainers: {
      height: "75px",
      width: 'auto',
      display: 'flex',
      align: "center",
      marginRight: "0px",
      transition: "ease-in-out 500ms",
    },
    rightPanel: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: theme.spacing.md,
      marginTop: theme.spacing.md,
      paddingBottom: '10px',
    },
    
    colorScheme: {
      marginLeft: theme.spacing.sm,
    },
    drawerTitle: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    },
    mobileLogo: {
      height: '50%',
      width: '50%',
      display: 'flex',
      align: "center",
      marginRight: "0px",
      marginLeft:"10px",
      transition: "ease-in-out 500ms"
    },
    groupStyle: {
      padding: '20px'
    }
  }));
  
  const mockdata = [
    {
      icon: IconAppWindow,
      title: 'Responsive Website',
      description: 'Feast on the modern website of the barangay',
    },
    {
      icon: IconArchive,
      title: 'File documents online',
      description: 'make filing document transactions easier',
    },
    {
      icon: IconFaceId,
      title: 'Face recognition',
      description: 'biometrics that come in handy',
    },
    {
      icon: IconCalendarEvent,
      title: 'Events',
      description: 'See yourself the current and future events on barangay',
    },
    {
      icon: IconChartPie3,
      title: 'Reports',
      description: 'Get reports on your transaction records',
    },
    {
      icon: IconNotification,
      title: 'Notifications and Alerts',
      description: 'Get notified from important updates and events',
    },
  ];
  
  const HomeNavBar = () => {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const theme = useMantineTheme();
    const {colorScheme} = useMantineColorScheme();
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes } = useStyles();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {isAdmin, isZLeader, inSession} = useContext(AppContext);
    const [dashboardPath, setDashboardPath] = useState('');
    const location = useLocation();
    const [logoVisible, setLogoVisible] = useState(false);

    useEffect(() => {
      if(location.pathname === '/'){
      }
      if(location.pathname === '/login'){ 
      }
      if(location.pathname === '/register'){
      }
      if(location.pathname === '/about'){
      }
    }, [isAdmin, inSession])

    const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
    };

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    } 
    const goToRegister = () => {
        navigate('/register');
    }
    const goToHome = () => {
      navigate('/');
  } 
  const goToAbout = () => {
      navigate('/about');
  }
  const goToDiscussions = () => {
    navigate('/discussions');
  }
  const goToDashboard = () => {
    if (isAdmin === true) {
      setDashboardPath('/admin-dashboard')
    } else  if (isZLeader) {
      setDashboardPath('/ZoneLeader-dashboard')
    } else {
      setDashboardPath('/dashboard')
    }
    navigate(dashboardPath);
  }

  useEffect(() => {
    // When the color scheme changes, hide the logo first
    setLogoVisible(false);

    // After a short delay, update the logo source and make it visible again
    setTimeout(() => {
      setLogoVisible(true);
    }, 500); // Adjust the delay time as needed
  }, [colorScheme]);
   
    const Logo = () => {
      const logoSrc = colorScheme === 'dark' ? blackbrgyLogo : whitebrgyLogo;
    
      return <img className={classes.logoContainers} src={logoSrc} alt="Barangay Sta Ana" style={{ opacity: logoVisible ? 1 : 0 }} />;
    };
    const MblLogo = () => {
      const logoSrc = colorScheme === 'dark' ? blackbrgyLogo : whitebrgyLogo;
    
      return <img className={classes.mobileLogo} src={logoSrc} alt="Barangay Sta Ana" />;
    };
  
    const links = mockdata.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group noWrap align="flex-start">
          <ThemeIcon size={34} variant="subtle" radius="md">
            <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500} color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7]}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));
  
    return (
      <Box pb={120}>
        <Header height={100} px="md" style={{ transition: "ease-in-out 500ms" }}>
        <Group position='apart' sx={{ height: '100%', alignItems: 'center' }}>
          <div className={classes.divlogocontainer}>
            <Logo/>
          </div>
            <Group position="center" sx={{ height: '100%', alignItems: 'center' }} className={classes.hiddenMobile}>
              <a onClick={goToHome} className={classes.link}>
                Home
              </a>
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}> 
                      <p style={{ color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7] }}>Features</p>

                      </Box>
                      <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                    </Center>
                  </a>
                </HoverCard.Target>
    
  
                <HoverCard.Dropdown className={classes.dropdown} sx={{ overflow: 'hidden' }}>
                  <Group position="apart" px="md">
                    <Text marginTop={20} fw={500} color={theme.colorScheme === 'dark' ? 'white' : 'gray.7'}>Features</Text>
                  </Group>
  
                  <Divider
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.5'}
                  />
  
                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>
  
                  <div className={classes.dropdownFooter}>
                    <Group position="apart">
                      <div>
                        <Text fw={500} fz="sm" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7]}>
                          Get started
                        </Text>
                        <Text size="xs" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7]}>
                          BY REGISTERING YOUR ACCOUNT.
                        </Text>
                      </div>
                      <Button className={classes.getStarted} variant="gradient" component={Link} to={'/register'}><p color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.9'}>Get started</p></Button>
                      
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <a onClick={goToAbout} className={classes.link}>
                        About
              </a>
              <a onClick={goToDiscussions} className={classes.link}>
                        Discussions
              </a>  
            </Group>
  
            <Group position='right' className={classes.hiddenMobile}>
              <ColorScheme />
              <>
                {inSession && <Button variant='gradient' onClick={goToDashboard}>go to Dashboard</Button>}
                {!inSession &&  <> <SplitButton/>
                <Button variant='gradient' onClick={goToRegister}>Sign up</Button></>}
              </>
            </Group>
  
            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Header>
  
        <Drawer.Root
            opened={drawerOpened}
            onClose={closeDrawer}
            size="100%"
            padding="md"
            className={classes.hiddenDesktop}
            zIndex={1000000}
          >
          <Drawer.Content>
            <Group position='apart' className={classes.groupStyle}>
          <Drawer.Title>
          <Text color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7]}>
            Navigation
          </Text>
        </Drawer.Title>
        <Drawer.CloseButton>
          <div className={classes.rightPanel}>
          <ArrowBackUp size={28} strokeWidth={2} color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7]} />
          </div>
        </Drawer.CloseButton>
          </Group>
          <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Group position='apart'>
            <MblLogo/>
            <div className={classes.rightPanel}><ColorScheme/></div>
          </Group>
            <Divider color={theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[5]} />
          <a onClick={goToHome} className={classes.link}>
              Home
            </a>
            <Divider color={theme.colorScheme === 'dark' ? 'gray.8' : 'gray.5'} />
            <UnstyledButton className={classes.mobileLink} onClick={toggleDropdown}>
              <Center inline>
                <Box component="span" mr={5} className={classes.groupStyle}>
                  <p style={{ color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7] }}>Features</p>
                </Box>
                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
              </Center>
            </UnstyledButton>

            {isDropdownOpen && (
              <div className={classes.dropdown}>
                {mockdata.map((item, index) => (
                  <div key={index}>
                    <Group noWrap align="center">
                      <item.icon size={20} color={theme.fn.primaryColor()} />
                      <div>
                        <span className={classes.dropdownTitle}>{item.title}</span>
                      </div>
                    </Group>
                    <p className={classes.dropdownDescription}>{item.description}</p>
                    {index !== mockdata.length - 1 && (
                      <Divider my="sm" color={theme.colorScheme === 'dark' ? 'gray.8' : 'gray.5'} />
                    )}
                  </div>
                ))}
              </div>
            )}
            <Divider color={theme.colorScheme === 'dark' ? 'gray.8' : 'gray.5'} />
            <a onClick={goToAbout} className={classes.link}>
              About
            </a>
            <Divider color={theme.colorScheme === 'dark' ? 'gray.8' : 'gray.5'} />
            <a onClick={goToDiscussions} className={classes.link}>
                        Discussions
            </a>
              <Divider color={theme.colorScheme === 'dark' ? 'gray.8' : 'gray.5'} />

              <Group className={classes.dropdownFooter} align="center" grow pb="xl" px="md">
                {inSession && <Button variant='gradient' onClick={goToDashboard}>go to Dashboard</Button>}
                {!inSession && (
                  <>
                  <Text style={{ color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7] }}>Log in as: </Text>
                    <Flex alignItems='center' justifyContent='center' style={{ justifyContent: 'center !important' }}>
                      <Button style={{ marginRight: '5px' }} variant='gradient' component={Link} to={'/adminlogin'}>
                        Admin Login
                      </Button>
                      <Button style={{ marginRight: '5px' }} variant='gradient' component={Link} to={'/zoneleaderlogin'}>
                        ZL Login
                      </Button>
                      <Button variant='gradient' component={Link} to={'/residentuserlogin'}>
                        User Login
                      </Button>
                    </Flex>

                    <Button variant='gradient' onClick={goToRegister}>Sign up</Button>
                  </>
                )}
              </Group>
            
          </ScrollArea>
          </Drawer.Content>
        </Drawer.Root>
      </Box>
    );
  }

  export {HomeNavBar};