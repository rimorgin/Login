import React, {useEffect, useState} from "react";
import { Container, Header, Paper, createStyles, useMantineColorScheme, useMantineTheme, rem, Title, Text } from "@mantine/core";
import ColorScheme from "../components/ColorScheme";
import LogoHeader from "../components/LogoHeader";
import { SideNavContainer, SideNavContainerAdmin } from "../components/SideNavContainerAdmin";
import  BarangayResidentsTable from "../components/Admin-DashboardOTHER/BarangayResidentsTable.tsx";
import { useNavigate } from "react-router";
import BrgyResidentTable from "../components/Admin-DashboardOTHER/BarangayResidentsTable.tsx";
import UserDataService from '../services/user.services'
import { Loader } from "@mantine/core";

const useStyles = createStyles ((theme) => ({
    root: {
        fontFamily: "Regular",
        width: "90dvw",
        minHeight: "80dvh",
        maxHeight: 'fit-content',
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


  const ddata = [
    {
    avatar: '../images/staff.png',
    username: "sojo",
    firstname: "rohn Joseph",
    middlename: 'Jojo',
    lastname: "Dela Cruz",
    suffix: "N/A",
    contacts: "09000000000",
    birthday: "12/19/82",
    gender: "Male",
    email: "jojo@gmail.com",
    password: 'jojo',
    civilstatus: "single",
    citizenship: "filipino",
    purok: "Mulawin",
    address: "Mulawin St. Barangay Sta Ana"
    },
      {
    avatar: '../images/staff.png',
    username: "rojo",
    firstname: "John Joseph",
    middlename: 'Jojo',
    lastname: "Dela Cruz",
    suffix: "N/A",
    contacts: "09000000000",
    birthday: "12/19/82",
    gender: "Male",
    email: "jojo@gmail.com",
    password: 'jojo',
    civilstatus: "single",
    citizenship: "filipino",
    purok: "Mulawin",
    address: "Mulawin St. Barangay Sta Ana"
    },
      {
    avatar: '../images/staff.png',
    username: "jojo",
    firstname: "sohn Joseph",
    middlename: 'Jojo',
    lastname: "Dela Cruz",
    suffix: "N/A",
    contacts: "09000000000",
    birthday: "12/19/82",
    gender: "Male",
    email: "jojo@gmail.com",
    password: 'jojo',
    civilstatus: "single",
    citizenship: "filipino",
    purok: "Mulawin",
    address: "Mulawin St. Barangay Sta Ana"
    },

  ];


function BarangayResidents () {
    const {classes} = useStyles();
    const theme = useMantineTheme();
    const {colorScheme} = useMantineColorScheme();
    const isLargeScreen = window.innerWidth >= 1024;
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(true);

const formatData = (fetchedData) => {
    return fetchedData.map((item) => ({
        username: item.userUname || '',
        firstname: item.userFname || '',
        middlename: item.userMname || '',
        lastname: item.userLname || '',
        suffix: item.userSuffix || 'N/A',
        contacts: item.userContact ? item.userContact.toString() : '',
        birthday: item.userBirthday ? item.userBirthday.toDate().toLocaleDateString() : '',
        gender: item.userGender || '',
        email: item.userEmail || '',
        password: item.userPassword || '',
        civilstatus: item.userCivilStatus || '',
        citizenship: item.userCitizenship || '',
        purok: item.purok || '',
        address: item.userAddress || '',
    }));
    };
      
    useEffect(() => {
        async function fetchData() {
          try {
            const querySnapshot = await UserDataService.getAllUsers();
            const usersData = querySnapshot.docs.map((doc) => doc.data());
            const formattedData = await formatData(usersData);
            setData(formattedData);
            console.log(formattedData)
            //console.log(formattedData)
            setIsFetching(false);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
        
      }, []);

      useEffect(() => {
        setTimeout(() => {
          setIsLoading(false); // Data fetching is complete after 3s
        }, 3000);
      }, []); 

    const HeaderDashBoard = () => {
        return(
          <Header height={100} color={colorScheme === 'dark' ? 'dark' : 'white'}>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
              <LogoHeader />
              <div>
                <SideNavContainerAdmin navigate={navigate} />
              </div>
            </div>
            <div>
              {isLargeScreen ? <ColorScheme /> : <div></div>}
            </div>
          </div>
        </Header>
        )
      }

    return (
        <><div><HeaderDashBoard/></div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", top: '80%', marginTop: '50px' }}>
            <div className={classes.root}>
                <Container fluid="true" pt="lg">
                    <Paper style={{ height: 670}}>
                    <Title>Barangay Residents</Title><br/>
                        {(isLoading && isFetching) ? 
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 670 }}>
                            <Loader />
                            <Text mt="sm">Loading Residents Data</Text>
                        </div> : <BrgyResidentTable data={data}/>}
                    </Paper>
                </Container>
            </div>
            </div>
        </>
    )    
}



export default BarangayResidents