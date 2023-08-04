import React, {useState, useEffect, useRef, createContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import ZoneLeaderDashboard from './pages/ZLDashboard';
import NotFoundImage from './pages/PageNotFound';
import AdminDashboard from './pages/AdminDashboard';
import Documents from './pages/Documents'
import Transactions from './pages/Transactions';
import { LoginUser, LogoutUser } from './redux/UserRedux';
import { auth } from './firebase';
import { database } from './firebase';
import { Database } from 'firebase/database';
import { Modal } from '@mantine/core';
import {
  MantineProvider,
  ColorSchemeProvider,
  AppShell,
} from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import PreLoader from "./components/Loader";
import { useColorScheme } from '@mantine/hooks';
import gsap from "gsap";
import { AnimatePresence } from "framer-motion";
import { useHotkeys, useLocalStorage, useViewportSize } from "@mantine/hooks";
import { Routes, Route, useLocation, useNavigate, useHistory } from "react-router-dom";
import { createStyles, getBreakpointValue, rem, em, Alert } from '@mantine/core';
import {
  Abroad,
  BarangayAcceptance,
  BarangayAcceptance2,
  BIRpattern,
  BrgyCertification2,
  BrgyCertification3,
  BrgyCertificationMultiPurpose,
  BuildingPermit,
  BurialAssistanceRelatives,
  BusinessClosure,
  BusinessClosurePSA,
  CaapAccessPass,
  CertificationLowIncome,
  CertificationStranded,
  ChedScholar,
  Clearance,
  DeathCertificate,
  ElectricMeter,
  FourPsTransfery,
  GoodMoral,
  JobSeeker,
  Livelihood,
  LowIncomeSubsidized,
  MinorVaccination,
  Pabahay,
  PhilHealth,
  PhilSys,
  SoloParent,
  TravelCertificate,
  WaterConnection,
  WaterConnectionDiscount,
} from "./BrgyFiles";

import {
  AbroadDirect,
  BarangayAcceptanceDirect,
  BarangayAcceptance2Direct,
  BIRpatternDirect,
  BrgyCertificationMultiPurposeDirect,
  BuildingPermitDirect,
  BurialAssistanceRelativesDirect,
  BusinessClosureDirect,
  BusinessClosurePSADirect,
  CertificationLowIncomeDirect,
  CertificationStrandedDirect,
  ChedScholarDirect,
  ClearanceDirect,
  ElectricMeterDirect,
  FourPsTransferyDirect,
  JobSeekerDirect,
  LivelihoodDirect,
  LowIncomeSubsidizedDirect,
  PabahayDirect,
  PhilHealthDirect,
  TravelCertificateDirect,
  WaterConnectionDirect,
  WaterConnectionDiscountDirect,
  GoodMoralDirect,
  CaapAccessPassDirect,
  BrgyCertification2Direct,
  BrgyCertification3Direct,
  DeathCertificateDirect,
  MinorVaccinationDirect,
  PhilSysDirect,
  SoloParentDirect,
} from "./BrgyFilesDirect/indexDirect";

import "./styles/app.scss"
import { HomeNavBar } from './components/HorizontalNavBar';
import BarangayOfficials from './pages/BarangayOfficials';
import BarangayResidents from './pages/BarangayResidents';
import BarangayStaffs from './pages/BarangayStaffs';
import axios from 'axios';
import Events from './pages/Events';
import AdminLogin from './pages/AdminLogin';
import ResidentLogin from './pages/ResidentLogin';
import ZoneLeaderLogin from './pages/ZoneLeaderLogin';
import { FooterSocial } from './components/footer';
import DiscussionBoard from './pages/DiscussionBoard';

export const AppContext = createContext();

const useStyles = createStyles((theme) => ({
  container: {
    height: rem(100),
    backgroundColor: theme.colors.blue[6],

    // Media query with value from theme
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.xl) - 1)})`]: {
      backgroundColor: theme.colors.pink[6],
    },

    // Simplify media query writing with theme functions
    [theme.fn.smallerThan('lg')]: {
      backgroundColor: theme.colors.yellow[6],
    },

    // Static media query
    [`@media (max-width: ${em(800)})`]: {
      backgroundColor: theme.colors.orange[6],
    },
  },
}));
const RoutesNavigation = [
  {
    path: `/4PsTransfery`,
    element: <FourPsTransfery />,
  },
  {
    path: "/BrgyAcceptance",
    element: <BarangayAcceptance />,
  },
  {
    path: "/BrgyAcceptance2",
    element: <BarangayAcceptance2 />,
  },
  {
    path: "/BusinessClosure",
    element: <BusinessClosure />,
  },
  {
    path: "/BusinessClosurePSA",
    element: <BusinessClosurePSA />,
  },
  {
    path: "/BurialAssistanceRelatives",
    element: <BurialAssistanceRelatives />,
  },
  {
    path: "/BuildingPermit",
    element: <BuildingPermit />,
  },
  {
    path: "/TravelCertificate",
    element: <TravelCertificate />,
  },
  {
    path: "/CertificateAbroad",
    element: <Abroad />,
  },
  {
    path: "/CertificateBirPattern",
    element: <BIRpattern />,
  },
  {
    path: "/CertificateWaterConnection",
    element: <WaterConnection />,
  },
  {
    path: "/CertificateStranded",
    element: <CertificationStranded />,
  },
  {
    path: "/JobSeeker",
    element: <JobSeeker />,
  },
  {
    path: "/Clearance",
    element: <Clearance />,
  },
  {
    path: "/CertificateWaterConnectionDiscount",
    element: <WaterConnectionDiscount />,
  },
  {
    path: "/CertificationLowIncome",
    element: <CertificationLowIncome />,
  },
  {
    path: "/PhilHealth",
    element: <PhilHealth />,
  },
  {
    path: "/LowIncomeSubsidized",
    element: <LowIncomeSubsidized />,
  },
  {
    path: "/ChedScholar",
    element: <ChedScholar />,
  },
  {
    path: "/BrgyCertification",
    element: <BrgyCertificationMultiPurpose />,
  },
  {
    path: "/Livelihood",
    element: <Livelihood />,
  },
  {
    path: "/CertificationPabahay",
    element: <Pabahay />,
  },
  {
    path: "/ElectricConnection",
    element: <ElectricMeter />,
  },
  {
    path: "/GoodMoral",
    element: <GoodMoral />
  },
  {
    path: "/CaapAccessPass",
    element: <CaapAccessPass />
  },
  {
    path: "/BrgyCertification2",
    element: <BrgyCertification2 />
  },
  {
    path: "/BrgyCertification3",
    element: <BrgyCertification3 />
  },
  {
    path: "/DeathCertificate",
    element: <DeathCertificate />,
  },
  {
    path: "/MinorVaccination",
    element: <MinorVaccination />
  },
  {
    path: "/PhilSys",
    element: <PhilSys />
  },
  {
    path: "/SoloParent",
    element: <SoloParent />
  },


  {
    path: "/4PsTransferyDirect",
    element: <FourPsTransferyDirect />,
  },
  {
    path: "/BrgyAcceptanceDirect",
    element: <BarangayAcceptanceDirect />,
  },
  {
    path: "/BrgyAcceptance2Direct",
    element: <BarangayAcceptance2Direct />,
  },
  {
    path: "/BusinessClosureDirect",
    element: <BusinessClosureDirect />,
  },
  {
    path: "/BusinessClosurePSADirect",
    element: <BusinessClosurePSADirect />,
  },
  {
    path: "/BurialAssistanceRelativesDirect",
    element: <BurialAssistanceRelativesDirect />,
  },
  {
    path: "/BuildingPermitDirect",
    element: <BuildingPermitDirect />,
  },
  {
    path: "/TravelCertificateDirect",
    element: <TravelCertificateDirect />,
  },
  {
    path: "/CertificateAbroadDirect",
    element: <AbroadDirect />,
  },
  {
    path: "/CertificateBirPatternDirect",
    element: <BIRpatternDirect />,
  },
  {
    path: "/CertificateWaterConnectionDirect",
    element: <WaterConnectionDirect />,
  },
  {
    path: "/CertificateStrandedDirect",
    element: <CertificationStrandedDirect />,
  },
  {
    path: "/JobSeekerDirect",
    element: <JobSeekerDirect />,
  },
  {
    path: "/ClearanceDirect",
    element: <ClearanceDirect />,
  },
  {
    path: "/CertificateWaterConnectionDiscountDirect",
    element: <WaterConnectionDiscountDirect />,
  },
  {
    path: "/CertificationLowIncomeDirect",
    element: <CertificationLowIncomeDirect />,
  },
  {
    path: "/PhilHealthDirect",
    element: <PhilHealthDirect />,
  },
  {
    path: "/LowIncomeSubsidizedDirect",
    element: <LowIncomeSubsidizedDirect />,
  },
  {
    path: "/ChedScholarDirect",
    element: <ChedScholarDirect />,
  },
  {
    path: "/BrgyCertificationDirect",
    element: <BrgyCertificationMultiPurposeDirect />,
  },
  {
    path: "/LivelihoodDirect",
    element: <LivelihoodDirect />,
  },
  {
    path: "/CertificationPabahayDirect",
    element: <PabahayDirect />,
  },
  {
    path: "/ElectricConnectionDirect",
    element: <ElectricMeterDirect />,
  },
  {
    path: "/GoodMoralDirect",
    element: <GoodMoralDirect />,
  },
  {
    path: "/CaapAccessPassDirect",
    element: <CaapAccessPassDirect />,
  },
  {
    path: "/BrgyCertification2Direct",
    element: <BrgyCertification2Direct />,
  },
  {
    path: "/BrgyCertification3Direct",
    element: <BrgyCertification3Direct />,
  },
  {
    path: "/DeathCertificateDirect",
    element: <DeathCertificateDirect />,
  },
  {
    path: "/MinorVaccinationDirect",
    element: <MinorVaccinationDirect />

  },
  {
    path: "/PhilSysDirect",
    element: <PhilSysDirect />,
  },
  {
    path: "/SoloParentDirect",
    element: <SoloParentDirect />,
  }
];

function App() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userDispatched = useSelector((state) => state.user.email);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isLoggedIn = useSelector((state) => state.user.loginStatus);
  const inSession = useSelector((state) => state.user.inSession);
  const isZLeader = useSelector((state) => state.user.isZLeader)
  const [userPrivilege, setUserPrivilege] = useState('');
  const [loggedInUserUID, setLoggedInUserUID] = useState('');
  const [loggedInUserIMG, setLoggedInUserIMG] = useState('');
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [userVerifiedCount, setUserVerifiedCount] = useState(0);
  const [altUserName, setAltUserName] = useState('');

  const location = useLocation();
  let cursorRef = useRef();
  let cursorRef2 = useRef();

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
    console.log('isUserAdmin:', isAdmin);
    console.log('isUserZoneLeader:', isZLeader);
    console.log('in session:', inSession);
    if (isAdmin){
      setUserPrivilege('/admin-dashboard/documents')
    } else if (isZLeader) {
      setUserPrivilege('/ZoneLeader-dashboard/documents')
    } else {
      setUserPrivilege('/dashboard/documents')
    }
  }, [isLoggedIn, isAdmin, isZLeader, inSession]); 

  // Modify the RoutesNavigation array to use the userPrivilege state variable
  const updatedRoutesNavigation = RoutesNavigation.map((route) => ({
    ...route,
    path: `${userPrivilege}${route.path}`, // Dynamically set the route pathname
  }));
  //console.log(updatedRoutesNavigation)

 
  useEffect(() => {
    // set viewport width, for mobile devices.
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // custom cursor
    const cursorList = document.addEventListener("mousemove", (e) => {
      cursorRef.current.setAttribute(
        "style",
        `transform: translate3d(${e.pageX - 10}px, ${e.pageY - 10}px, 0px)`
      );
      cursorRef2.current.setAttribute(
        "style",
        `transform: translate3d(${e.pageX + 10}px, ${e.pageY + 10}px, 0px)`
      );
    });

    return () => {
      document.removeEventListener("mousemove", cursorList);
    };
  }, []);
  
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
  });

  const toggleColorScheme = () =>
  setColorScheme((current) => (current === "dark" ? "light" : "dark"));
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const theme = {
    colorScheme,
    spacing: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 64 },
    colors: {
      darktheme: [
        "#00897B",
        "#05181C",
        "#0E1B23",
        "#060D12",
        "#78919C",
        "#14252F",
        "#587583",
        "#314792",
        "#B64834",
      ],
      lighttheme: [
        "#FFFFFF",
        "#E0F2F1",
        "#ECEFF1",
        "#607D8B",
        "#212121",
        "#6D81C1",
        "#CF8071",
      ],
    },
  };

  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const idToken = await user.getIdToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
            
            setLoggedInUserUID(user.uid);

            const chkUserName = user.displayName;
            const validEmail = user.email;
            

            if (chkUserName === '') {
              validEmail = validEmail.split('@')
              setLoggedInUserName(validEmail[0])
            } else {
              setLoggedInUserName(user.displayName)
            }
            setLoggedInUserEmail(user.email);
            setLoggedInUserIMG(user.photoURL);
          } catch (error) {
            // Handle errors here
            console.error('Error fetching ID token:', error);
            // Logout the user if there's an error
            dispatch(LogoutUser());
          }
        } else {
          // Logout the user if not authenticated
          dispatch(LogoutUser());
        }
      });
  
      // Cleanup function
      return () => {
        unsubscribe();
      };
    }, [dispatch]);

    useEffect(() => {
      console.log(loggedInUserIMG);
    },[loggedInUserUID, loggedInUserName, loggedInUserIMG, loggedInUserEmail])

  return (
    <>
    <div ref={cursorRef} className="cursor"></div>
    <div ref={cursorRef2} className="cursor cursor2"></div>
  <AppContext.Provider value={{isAdmin, isZLeader, inSession, userPrivilege, loggedInUserUID, loggedInUserName, loggedInUserIMG, loggedInUserEmail}}>
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={theme}>
        <AppShell footer={<FooterSocial/>}>
        
          <AnimatePresence initial={false}>
          <Routes location={location} key={location.pathname}>
            {isLoggedIn && (
                <>
                 {updatedRoutesNavigation.map((route) => (
                 <Route key={route.path} path={route.path} element={route.element} />
                  ))}
                <Route path='/discussions' element={<DiscussionBoard/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/*" element={<NotFoundImage />} />
                {(isAdmin && !isZLeader) && (
                  <>
                  <Route path="/admin-dashboard/events/*" element={<Events />} />
                  <Route path="/admin-dashboard/residents/*" element={<BarangayResidents />} />
                  <Route path="/admin-dashboard/staffs-list/*" element={<BarangayStaffs />} />
                  <Route path="/admin-dashboard/Barangay-officials/*" element={<BarangayOfficials />} />
                  <Route path="/admin-dashboard/transactions/*" element={<Transactions />} />
                  <Route path="/admin-dashboard/documents/*" element={<Documents />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  </>
                )} 
                 {(isZLeader && !isAdmin) && (
                  <>
                  <Route path="/ZoneLeader-dashboard/events/*" element={<Events />} />
                  <Route path="/ZoneLeader-dashboard/transactions/*" element={<Transactions />} />
                  <Route path="/ZoneLeader-dashboard/documents/*" element={<Documents />} />
                  <Route path="/ZoneLeader-dashboard/*" element={<ZoneLeaderDashboard />} />
                  </>
                )}
                {(!isZLeader && !isAdmin) && (
                  <>
                  <Route path="/dashboard/events/*" element={<Events />} />
                  <Route path="/dashboard/transactions/*" element={<Transactions />} />
                  <Route path="/dashboard/documents/*" element={<Documents />} />
                  <Route path="/dashboard/*" element={<Dashboard />} />
                  </>
                )}
              </>
            )}
            {!isLoggedIn && (
              <>
              <Route path='/discussions' element={<DiscussionBoard/>} />
              <Route path='/adminlogin' element={<AdminLogin/>} />
              <Route path='/zoneleaderlogin' element={<ZoneLeaderLogin/>} />
              <Route path='/residentuserlogin' element={<ResidentLogin/>} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register/>} />
              <Route path="/*" element={<NotFoundImage />} />
              </>
            )}

          </Routes>
          
          </AnimatePresence>
        </AppShell>
        
      </MantineProvider>
    </ColorSchemeProvider>
    </AppContext.Provider>
    </>
  );
};

export default App;
