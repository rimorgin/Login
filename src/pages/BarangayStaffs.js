import React, {useState, useEffect} from "react";
import { Container, Header, Paper, createStyles, useMantineColorScheme, useMantineTheme, rem, Title, Group, Modal, Button, Text, Box, Flex, Stack, TextInput, Divider, Loader } from "@mantine/core";
import ColorScheme from "../components/ColorScheme";
import LogoHeader from "../components/LogoHeader";
import { SideNavContainer, SideNavContainerAdmin } from "../components/SideNavContainerAdmin";
import BrgyStaffsTable from "../components/Admin-DashboardOTHER/BarangayStaffsTable.tsx";
import { useNavigate } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { ArrowBackUp } from "tabler-icons-react";
import { useForm, isEmail } from "@mantine/form";
import { Users } from "tabler-icons-react";
import StaffDataService from "../services/staff.services.js";

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


function BarangayStaffs () {

    const {classes} = useStyles();
    const theme = useMantineTheme();
    const {colorScheme} = useMantineColorScheme();
    const isLargeScreen = window.innerWidth >= 1024;
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const [staffName, setStaffName] = useState("");
    const [staffRole, setStaffRole] = useState("");
    const [staffEmail, setStaffEmail] = useState("");
    const [staffNo, setStaffNo] = useState("");
    const [addMore, setAddMore] = useState(false);
    // State to hold the data for officials
    const [staffsData, setStaffsData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(true);
    const [onStaffsDataChanged, setStaffsDataChange] = useState(false);

    const handleDataChange = (onDataChange) => {
      setStaffsDataChange(onDataChange);
    };

    useEffect(() => {
      console.log(onStaffsDataChanged)
    },[onStaffsDataChanged])

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
        setStaffName(values.name);
        setStaffEmail(values.email);
        setStaffRole(values.role);
        setStaffNo(values.number);
        setAddMore(true);
        form.reset();
        
    }

    useEffect(() => {
        addNewRow();
      }, [staffName, staffRole, staffEmail, staffNo]);

      const addNewRow = () => {

        if (staffName !== '' && staffEmail !== '' && staffNo !== '' && staffRole !== ''){
        const newRow = {
          name: `${staffName}`,
          avatar: 'https://cdn-icons-png.flaticon.com/512/10808/10808212.png',
          job: `${staffRole}`,
          email: `${staffEmail}`,
          phone: `${staffNo}`,
        };

        try{
        StaffDataService.addStaff(newRow)
        } catch (error) {
        console.log(error)
        } 
        setStaffsData((prevData) => [...prevData, newRow]);
      };
    }

      const formatData = (fetchedData) => {
        return fetchedData.map((item) => ({
            name: item.name || '',
            avatar: item.avatar || '',
            job: item.job || '',
            email: item.email || '',
            phone: item.phone || '',
        }));
        };
      useEffect(() => {
        async function fetchData() {
          try {
            const querySnapshot = await StaffDataService.getAllStaffs();
            const staffsDataFetch = querySnapshot.docs.map((doc) => doc.data());
            const formattedData = await formatData(staffsDataFetch)
            setStaffsData(formattedData);
            //console.log(formattedData)
            setIsFetching(false)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
        if (onStaffsDataChanged === true) {
          fetchData();
          setStaffsDataChange(false);
        }
      }, [onStaffsDataChanged]);

      useEffect(() => {
        setTimeout(() => {
          setIsLoading(false); // Data fetching is complete after 3s
        }, 3000);
      }, []); 


    const form = useForm({
        initialValues: {
          name: '',
          role: '',
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
                    <Title>Barangay Staffs Management</Title><br/>
                    <Modal.Root opened={opened} onClose={close} centered size="auto" >
                     <Modal.Overlay overlayProps={{
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                        opacity: 0.55,
                        blur: 3,
                        }}/>
                        <Modal.Content>
                        <Modal.Header>
                            <Modal.Title><Text color={theme.colorScheme === 'dark' ? theme.white : theme.black}>Add Staff</Text></Modal.Title>
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
                                            label='Enter Staff Name'
                                            placeholder="Staff Name"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={(e) => setStaffName(e.target.value)}
                                            required
                                            {...form.getInputProps('name')} />
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="role"
                                            name="role"
                                            variant='filled'
                                            label='Enter Staff Role'
                                            placeholder="Staff Role"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={(e) => setStaffRole(e.target.value)}
                                            required
                                            {...form.getInputProps('role')} />
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="email"
                                            name="email"
                                            variant='filled'
                                            label='Enter Staff Email Address'
                                            placeholder="name@email.com"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            defaultValue={"your_email@email.com"}
                                            onChange={(e) => setStaffEmail(e.target.value)}
                                            required
                                            {...form.getInputProps('email')} />
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="number"
                                            name="number"
                                            variant='filled'
                                            label='Enter Staff Number'
                                            placeholder="Staff Number"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={(e) => setStaffNo(e.target.value)}
                                            required
                                            {...form.getInputProps('number')} />
                                        <Divider my={'lg'} />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {!addMore ? (
                                            <Button onClick={handleSubmit} variant='gradient' type='submit'>Add Staff</Button>
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
                        <Button onClick={open}>Add Staff</Button>
                    </Group>
                    </Group>
                    {(isLoading && isFetching) ?<>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height:670 }}>
                            <Loader/> <Text>Staffs Data is Loading...</Text>
                        </div></> : <BrgyStaffsTable data={staffsData} onDataChange={handleDataChange}/>}
                    </Paper>
                </Container>
            </div>
            </div>
        </>
    )    
}



export default BarangayStaffs