import React, { useState, useEffect } from "react";
import { Container, Header, Paper, createStyles, useMantineColorScheme, useMantineTheme, rem, Title, Loader, Text } from "@mantine/core";
import ColorScheme from "../components/ColorScheme";
import LogoHeader from "../components/LogoHeader";
import { SideNavContainer } from "../components/SideNavContainer";
import { useNavigate } from "react-router";
import { TableScrollArea } from "../components/TransactionsInfo.tsx";
import { AppContext } from "../App";
import { useContext } from "react";
import { SideNavContainerAdmin } from "../components/SideNavContainerAdmin";
import { db } from "../firebase";
import { collection,query, where, getDocs } from "firebase/firestore";
import RequestDataService from '../services/requestDocu.services'

const useStyles = createStyles ((theme) => ({
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

const mockdata = [
    {
        name: 'John Joseph Dela Cruz',
        purok: 'dupax 1',
        requestedDocu: '4sTransfery',
        daterequested: 'July 27, 2023',
        cost: '500',
        paymentstatus: 'to pay',
        status: 'pending',
      },
    {
      name: 'John Joseph Dela Cruz',
      purok: 'dupax 1',
      requestedDocu: '4sTransfery',
      daterequested: 'July 25, 2023',
      cost: '500',
      paymentstatus: 'paid',
      status: 'Processing',
    },
    {
      name: 'John Joseph Dela Cruz',
      purok: 'dupax 1',
      requestedDocu: 'Barangay Clearance',
      daterequested: 'August 10, 2022',
      cost: '500',
      paymentstatus: 'paid',
      status: 'Finished',
    },
    {
      name: 'John Joseph Dela Cruz',
      purok: 'dupax 1',
      requestedDocu: 'Philsys',
      daterequested: 'April 10, 2021',
      cost: '500',
      paymentstatus: 'paid',
      status: 'Finished',
    },
    {
      name: 'John Joseph Dela Cruz',
      purok: 'dupax 1',
      requestedDocu: 'Ched Scholar',
      daterequested: 'December 10, 2020',
      cost: '500',
      paymentstatus: 'paid',
      status: 'Finished',
    },
    
  ];

function Transactions () {
    const {classes} = useStyles();
    const theme = useMantineTheme();
    const {colorScheme} = useMantineColorScheme();
    const isLargeScreen = window.innerWidth >= 1024;
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const {isAdmin, loggedInUserUID, isZLeader} = useContext(AppContext);
    const [isFetching, setIsFetching] = useState(true);

    const formatData = (RequestedTransaction) => {
      return RequestedTransaction.map((item) => ({
          name: item.clientname || '',
          purok: item.purok || '',
          requestedDocu: item.lettername || '',
          daterequested: item.dateRequested || '',
          cost: item.letterprice || '',
          paymentstatus: item.paymentstatus || 'pending',
          status: item.status || 'pending',
      }));
      };

    useEffect(() => {
        async function RequestedTransaction(){
        if (isAdmin) {
          try{
            const query = await RequestDataService.getAllRequests();
            const transacData = query.docs.map((doc) => doc.data());
            const allTransacFormattedData = await formatData(transacData);
            setData(allTransacFormattedData);
            setIsFetching(false);
          } catch (error) {
            console.log('error fetching data: ', error);
          }
        } else {
            try {
              const requestRef = collection(db, 'requestedDocuments');
              const requestQuery = query(requestRef, where('loggedInUserUID' ,'==', loggedInUserUID))
              const queryResult = await getDocs(requestQuery);
              const transactionsDataFetch = queryResult.docs.map((doc) => doc.data());
              const formattedData = await formatData(transactionsDataFetch);
              setData(formattedData);
              //console.log(formattedData)
              setIsFetching(false);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
      }
      RequestedTransaction();
      
    }, []);

    

    const HeaderDashBoard = () => {
        return(
          <Header height={100} color={colorScheme === 'dark' ? 'dark' : 'white'}>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
              <LogoHeader />
              <div>
                {(isAdmin && !isZLeader) ? <SideNavContainerAdmin navigate={navigate} /> : <SideNavContainer navigate={navigate} />}
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
                    <Paper>
                    {isAdmin ? <Title>All Resident Transaction Information</Title> :  <Title>Your Transaction Information</Title>}
                   <br/>
                    {isFetching ? <>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 670 }}>
                            <Loader />
                            <Text mt="sm">Loading Your Transactions</Text>
                      </div></> : <TableScrollArea data={data}/>
                    }
                    </Paper>
                </Container>
            </div>
            </div>
        </>
    )    
}
export default Transactions