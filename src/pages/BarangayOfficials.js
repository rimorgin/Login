import React, { useState, useEffect } from "react";
import { Container, Header, Paper, createStyles, useMantineColorScheme, useMantineTheme, rem, Title, TextInput, Modal, Stack, Flex, Divider, Group, Button, Text, Loader, Box } from "@mantine/core";
import ColorScheme from "../components/ColorScheme";
import { ArrowBackUp } from "tabler-icons-react";
import LogoHeader from "../components/LogoHeader";
import { SideNavContainer, SideNavContainerAdmin } from "../components/SideNavContainerAdmin";
import BrgyOfficialsTable from "../components/Admin-DashboardOTHER/BarangayOfficialsTable.tsx";
import { useNavigate } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import OfficialsDataService from '../services/officials.services'
import { useForm, isEmail } from "@mantine/form";

const useStyles = createStyles ((theme) => ({
    root: {
        fontFamily: "Regular",
        width: "90dvw",
        minHeight: "80dvh",
        maxHeight: 'fit-content',
        bominrderRadius: `10px`,
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


  const data = [
    {
      avatar: "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "John Joseph Dela Cruz",
      position: "Engineer",
      email: "rob_wolf@gmail.com",
      phone: "+44 (452) 886 09 12"
    },
    {
      avatar: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Jill Jailbreaker",
      position: "Engineer",
      email: "jj@breaker.com",
      phone: "+44 (934) 777 12 76"
    },
    {
      avatar: "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Henry Silkeater",
      position: "Designer",
      email: "henry@silkeater.io",
      phone: "+44 (901) 384 88 34"
    },
    {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Bill Horsefighter",
      position: "Designer",
      email: "bhorsefighter@gmail.com",
      phone: "+44 (667) 341 45 22"
    },
    {
      avatar: "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Jeremy Footviewer",
      position: "Manager",
      email: "jeremy@foot.dev",
      phone: "+44 (881) 245 65 65"
    }
  ];


function BarangayOfficials () {
    const {classes} = useStyles();
    const theme = useMantineTheme();
    const {colorScheme} = useMantineColorScheme();
    const isLargeScreen = window.innerWidth >= 1024;
    const [opened, {open,close}] = useDisclosure(false);
    const [officialsData, setOfficialsData] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [officialsName, setOfficialsName] = useState('');
    const [officialsPosition, setOfficialsPosition] = useState('');
    const [officialsEmail, setOfficialsEmail] = useState('');
    const [officialsPhone, setOfficialsPhone] = useState('');
    const [onOfficialsDataChanged, setOfficialsDataChange] = useState(false);
    const avatarIcon = 'https://cdn-icons-png.flaticon.com/512/9148/9148619.png';
    const [officialsCount, setOfficialsCount] = useState(0);
    const [addMore,setAddMore] = useState(false);
    const navigate = useNavigate();

    const handleDataChange = (onDataChange) => {
      setOfficialsDataChange(onDataChange);
    };

    useEffect(() => {
      console.log('brgy',onOfficialsDataChanged)
    },[onOfficialsDataChanged])

    useEffect(() => {
      console.log(officialsCount)
    },[officialsCount])

    useEffect(() => {
      addNewRow();
    }, [officialsName, officialsPosition, officialsEmail, officialsPhone]);

    const addNewRow = () => {

      if (officialsName !== '' &&  officialsPosition !== '' && officialsEmail !== '' && officialsPhone !== ''){
      const newRow = {
        name: `${officialsName}`,
        avatar: `${avatarIcon}`,
        position: `${officialsPosition}`,
        email: `${officialsEmail}`,
        phone: `${officialsPhone}`,
      };

      try{
      OfficialsDataService.addOfficial(newRow)
      } catch (error) {
      console.log(error)
      } 
      setOfficialsData((prevData) => [...prevData, newRow]);
    };
  }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = form.values;
        setOfficialsName(values.name);
        setOfficialsEmail(values.email);
        setOfficialsPosition(values.position);
        setOfficialsPhone(values.number);
        setAddMore(true);
        form.reset();
    }

    const formatData = (fetchedData) => {
      return fetchedData.map((item) => ({
          name: item.name || '',
          avatar: item.avatar || '',
          position: item.position || '',
          email: item.email || '',
          phone: item.phone || '',
      }));
      };
      useEffect(() => {
        async function fetchData() {
          try {
            setIsFetching(true);
            const querySnapshot = await OfficialsDataService.getAllOfficials();
            const officialsDataFetch = querySnapshot.docs.map((doc) => doc.data());
            const count = officialsDataFetch.length;
            setOfficialsCount(count);
            const formattedData = await formatData(officialsDataFetch);
            setOfficialsData(formattedData);
            //console.log(formattedData)
            setIsFetching(false);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
        if (onOfficialsDataChanged === true) {
          fetchData();
          setOfficialsDataChange(false);
        }
      }, [onOfficialsDataChanged]);

      useEffect(() => {
        setTimeout(() => {
          setIsLoading(false); // Data fetching is complete after 3s
        }, 3000);
      }, []); 

      const form = useForm({
        initialValues: {
          name: '',
          position: '',
          email: '',
          number: '',

        },
  
        validate: {
          email: isEmail('Enter Valid Email'),
        }
      });


    return (
        <><div><HeaderDashBoard/></div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", top: '80%', marginTop: '50px' }}>
            <div className={classes.root}>
                <Container fluid="true" pt="lg">
                    <Paper>
                    <Group position="apart">
                    <Title>Barangay Officials Management</Title><br/>
                    <Modal.Root opened={opened} onClose={close} centered size="auto" >
                     <Modal.Overlay overlayProps={{
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                        opacity: 0.55,
                        blur: 3,
                        }}/>
                        <Modal.Content>
                        <Modal.Header>
                            <Modal.Title><Text color={theme.colorScheme === 'dark' ? theme.white : theme.black}>Add Official</Text></Modal.Title>
                            <Modal.CloseButton>
                            <div>
                                <ArrowBackUp size={28} strokeWidth={2} color={theme.colorScheme === 'dark' ? theme.white : theme.black} />
                            </div>
                            </Modal.CloseButton>
                        </Modal.Header>
                        <Modal.Body>
                        <Box width="100%" display="flex" alignItems="center" justifyContent="center">
                          <Stack spacing={4} maxWidth={400} width="100%">
                            <Flex >
                                <div>
                                    <form style={{ width: '100%' }}>
                                    <TextInput
                                            type="name"
                                            name="name"
                                            variant='filled'
                                            label="Enter Official's Name"
                                            placeholder="Official's Name"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={(e) => setOfficialsName(e.target.value)}
                                            required
                                            {...form.getInputProps('name')} />
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="role"
                                            name="role"
                                            variant='filled'
                                            label="Enter Official's Position"
                                            placeholder="Official's Position"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={(e) => setOfficialsPosition(e.target.value)}
                                            required
                                            {...form.getInputProps('position')} />
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="email"
                                            name="email"
                                            variant='filled'
                                            label="Enter Official's Email Address"
                                            placeholder="name@email.com"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            defaultValue={"your_email@email.com"}
                                            onChange={(e) => setOfficialsEmail(e.target.value)}
                                            required
                                            {...form.getInputProps('email')} />
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="number"
                                            name="number"
                                            variant='filled'
                                            label="Enter Official's Contact Number"
                                            placeholder="Official's Number"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={(e) => setOfficialsPhone(e.target.value)}
                                            required
                                            {...form.getInputProps('number')} />
                                        <Divider my={'lg'} />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {!addMore ? (
                                            <Button onClick={handleSubmit} variant='gradient' type='submit'>Add Official</Button>
                                        ) : (
                                            <>
                                            <Button onClick={() => { form.reset(); setAddMore(false) } } variant='gradient' type='submit'>Add More</Button>
                                            <Button onClick={close} variant='gradient' type='submit'>Exit</Button>
                                            </>
                                        )}
                                        </div>
                                    </form>
                                    </div>
                                </Flex>
                            </Stack>
                            </Box>
                        </Modal.Body>
                        </Modal.Content>
                    </Modal.Root>
                    <Group position="right">
                        <Button onClick={open}>Add Official</Button>
                    </Group>
                    </Group>
                    {(isLoading && isFetching) ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height:670 }}>
                            <Loader/> <Text>Barangay Officials Data is Loading...</Text>
                        </div> ) : callTable() }
                    </Paper>
                </Container>
            </div>
            </div>
        </>
    )    

    function callTable() {
      if (officialsCount > 0) {
        return <BrgyOfficialsTable data={officialsData} onDataChange={handleDataChange} />;
      } else {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 670, top: 30 }}>
            <Text>No Barangay Officials Data</Text>
          </div>
        );
      }
    }
}



export default BarangayOfficials