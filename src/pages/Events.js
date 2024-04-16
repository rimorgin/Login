import React, { useState, useEffect } from "react";
import { Container, Header, Paper, createStyles, useMantineColorScheme, useMantineTheme, rem, Title, Loader, Text, Group, Modal, Box, Stack, Flex, Divider, TextInput, Button, Image, SimpleGrid, Textarea} from "@mantine/core";
import { DateTimePicker } from '@mantine/dates';
import ColorScheme from "../components/ColorScheme";
import LogoHeader from "../components/LogoHeader";
import { SideNavContainer } from "../components/SideNavContainer";
import { useNavigate } from "react-router";
import { TableScrollArea } from "../components/TransactionsInfo.tsx";
import { AppContext } from "../App";
import { useContext } from "react";
import { SideNavContainerAdmin } from "../components/SideNavContainerAdmin";
import { db, storage } from "../firebase";
import { collection,query, where, getDocs } from "firebase/firestore";
import EventDataService from '../services/event.services.js'
import { useForm } from "@mantine/form";
import EventsTable from "../components/Admin-DashboardOTHER/EventsTable.tsx";
import { useDisclosure } from "@mantine/hooks";
import { ArrowBackUp } from "tabler-icons-react";
import { ImageDropzone } from "../components/ImageDropzone.tsx";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { EventsCard } from "../components/EventsCard.tsx";
import moment from "moment";
import { ShowPreviewEventCard } from "../modals/eventPreviewModal";
import { notifications } from "@mantine/notifications";
import { Badge } from "tabler-icons-react";

const useStyles = createStyles ((theme) => ({
  root: {
    fontFamily: "Regular",
    width: "90dvw",
    minHeight:'80dvh',
    maxHeight: 'fit-content',
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

function Events () {
    const {classes} = useStyles();
    const theme = useMantineTheme();
    const {colorScheme} = useMantineColorScheme();
    const isLargeScreen = window.innerWidth >= 1024;
    const [eventImage, setEventImage] = useState();
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventLoc, setEventLoc] = useState('');
    const [badgeEmoji, setBadgeEmoji] = useState('');
    const [badgeLabel, setBadgeLabel] = useState('');
    const navigate = useNavigate();
    const [eventsData, setEventsData] = useState('');
    const [eventsDataCards, setEventsDataCards] = useState('');
    const {isAdmin, loggedInUserUID, isZLeader} = useContext(AppContext);
    const [isFetching, setIsFetching] = useState(true);
    const [eventRowsCounter, setEventRowsCounter] = useState(0);
    const [onEventsDataChanged, setEventsDataChange] = useState(false);
    const [addMore, setAddMore] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [previews, setPreviews] = useState([]);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [eventsDataPreview, setEventsDataPreview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    
    const showNotif = (title,msg) => {
      notifications.show({
        title: title,
        message: msg,
        icon: <Badge
        size={60}
        strokeWidth={3}
        color={'black'}
      />
      });
    };

    const handleDataChange = (onDataChange) => {
      setEventsDataChange(onDataChange);
    };

    useEffect(() => {
        console.log(eventRowsCounter)
    },[eventRowsCounter])
    

    const formatData = (EventsData) => {
      return EventsData.map((item) => ({ 
          eventname: item.eventname || '',
          eventdate: moment.unix(item.eventdate).subtract(1969, 'years').format('llll') || '',
          description: item.description || '',
          location: item.location || '',
      }));
    };

    const formatCardsData = (EventsData) => {
      return EventsData.map((item) => ({ 
          eventimage: item.eventimage || '',
          eventname: item.eventname || '',
          eventdate: moment.unix(item.eventdate).subtract(1969, 'years').format('llll') || '',
          description: item.description || '',
          location: item.location || '',
          badges: item.badges || '',
      }));
    };

    useEffect(() => {
        async function AllEventsData(){
          try{
            const query = await EventDataService.getAllEvents();
            const eventsDataFetch = query.docs.map((doc) => doc.data());
            //console.log(eventsDataFetch);
            const count = eventsDataFetch.length;
            setEventRowsCounter(count);
            //console.log("Total documents retrieved:", eventRowsCounter);
            
            if (count > 0 ) {
                const formattedData = formatData(eventsDataFetch)
                setEventsData(formattedData);
                const formattedCardsData = formatCardsData(eventsDataFetch);
                setEventsDataCards(formattedCardsData);
            }
            setIsFetching(false);
          } catch (error) {
            console.log('error fetching data: ', error);
          }
      }
      AllEventsData();
      if (onEventsDataChanged === true){
        AllEventsData();
        setEventsDataChange(false);
      }
    }, [onEventsDataChanged]);


    const form = useForm({
        initialValues: {
          eventimage: '',
          eventname: '',
          eventdate: '',
          description: '',
          location: '',
          badges: [
            {
              emoji: '',
              label: '',
            },
          ],
        },
      });
    

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        showNotif('Uploading...','Please Wait for the Message Success before CLOSING.')

        const values = form.values;

        const imageRef = ref(storage, `eventImages/${values.eventname}`);
        await uploadBytes(imageRef, eventImage, 'data_url')
        await getDownloadURL(ref(storage, `eventImages/${values.eventname}`))
        .then((url) => {
          form.setFieldValue('eventimage', url)

          setEventName(values.eventname);
          setEventDate(values.eventdate);
          setEventDesc(values.description);
          setEventLoc(values.location);
        })
        .catch((error) => {
          console.log(error);
        });

    }

    useEffect(() => {
        addNewRow();
      }, [eventName, eventDate, eventDesc, eventLoc]);

    const addNewRow = async () => {
        if (eventName !== '' && eventDate !== '' && eventDesc !== '' && eventLoc !== ''){
        const newRow = {
          eventname: `${eventName}`,
          eventdate: `${eventDate}`,
          description: `${eventDesc}`,
          location: `${eventLoc}`,
        };

        const newEventDoc = form.values

        try{
            await EventDataService.addEvents(newEventDoc);
        } catch (error) {
        console.log(error)
        } 
        setEventsData((prevData) => [...prevData, newRow]);
        setIsLoading(false);
        showNotif('Success','Uploaded Image and Files, you can now close this window')
      };
    }

    const handleUpload = async (files) => {
        try {
            
            //display image
            const newPreviews = files.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            setEventImage(file)
            //display image
            return (
                <Image
                key={index}
                src={imageUrl}
                imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                alt=''
                />
            );
            
            });
            setPreviews(newPreviews);
            
          
        } catch (error) {
          console.error('Error uploading image:', error);
        } 
      };
      useEffect(()=> {
        //console.log(eventImage)
        //console.log('form eventimage value',form.values.eventimage);
      },[eventImage])

    const handleReset = () => {
        setPreviews([])
        setEventImage('');
    }

    const handleAddBadge = () => {
        form.setFieldValue('badges', [...form.values.badges, { emoji: '', label: '' }]);
    };
    
      const handleRemoveBadge = (index) => {
        form.setFieldValue('badges', form.values.badges.filter((_, i) => i !== index));
    };

    const handleShowEventCards = () => {
      setIsPreviewing(true);
    }
    const handleCloseEventCards = () => {
      setIsPreviewing(false);
    }

    return (
        <><div><HeaderDashBoard/></div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", top: '80%', marginTop: '50px' }}>
            <div className={classes.root}>
                <Container fluid="true" pt="lg">
                    <Paper>
                    <Group position="apart">
                        <Title>All Events Information</Title>
                        
                    <Modal.Root opened={opened} onClose={close} centered size="auto" >
                     <Modal.Overlay overlayProps={{
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                        opacity: 0.55,
                        blur: 3,
                        }}/>
                        {isLoading ? <Loader/> : (
                        <Modal.Content>
                        <Modal.Header>
                            <Modal.Title><Text color={theme.colorScheme === 'dark' ? theme.white : theme.black}>Add Events</Text></Modal.Title>
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
                                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                    {previews.length === 0 ? <ImageDropzone onDrop={handleUpload} /> : 
                                    (
                                        <>
                                          <SimpleGrid
                                            cols={2}
                                            breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                                            mt={previews.length > 0 ? 'xl' : 0}
                                          >
                                            {previews}
                                          </SimpleGrid>
                                          <br/>
                                          <Button variant='gradient' onClick={handleReset}>
                                            Retry
                                          </Button>
                                          <Divider my={'lg'} />
                                        </>
                                      )}
                                    <TextInput
                                            type="eventname"
                                            name="eventname"
                                            variant='filled'
                                            label='Enter Event Name'
                                            placeholder="Event Name"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={(e) => setEventName(e.target.value)}
                                            required
                                            {...form.getInputProps('eventname')} />
                                        <Divider my={'lg'} />
                                        <DateTimePicker
                                            clearable
                                            type="datetime-local"
                                            name="eventdate"
                                            valueFormat="DD MMM YYYY hh:mm A"
                                            variant="filled"
                                            defaultValue={new Date()}
                                            label="Pick date and time of Event"
                                            placeholder="Pick date and time of Event"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            timeInputProps={{ 'aria-label': 'Pick time' }}
                                            {...form.getInputProps('eventdate')} />
                                        
                                        <Divider my={'lg'} />
                                        <Textarea
                                            autosize
                                            type="description"
                                            name="description"
                                            variant='filled'
                                            label='Enter Event Description'
                                            placeholder="Event Description"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={(e) => setEventDesc(e.target.value)}
                                            required
                                            {...form.getInputProps('description')} />
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="location"
                                            name="location"
                                            variant='filled'
                                            label='Enter Event Location'
                                            placeholder="Event Location"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={(e) => setEventLoc(e.target.value)}
                                            required
                                            {...form.getInputProps('location')} />
                                        <Divider my={'lg'} />
                                        <Text style={{color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[7]}}>Badges/Tags</Text>
                                        <Flex>
                                            <Group position="apart">
                                            {form.values.badges.map((badge, index) => (
                                                <div key={index}>
                                                <TextInput
                                                    label={`Badge ${index + 1} Emoji`}
                                                    placeholder="Emoji"
                                                    value={badge.emoji}
                                                    onChange={(event) => form.setFieldValue(`badges.${index}.emoji`, event.target.value)}
                                                    required
                                                />
                                                <TextInput
                                                    label={`Badge ${index + 1} Label`}
                                                    placeholder="Label"
                                                    value={badge.label}
                                                    onChange={(event) => form.setFieldValue(`badges.${index}.label`, event.target.value)}
                                                    required
                                                />
                                                <Button type="button" onClick={() => handleRemoveBadge(index)}>
                                                    Remove Badge
                                                </Button>
                                                </div>
                                            ))}
                                            </Group>
                                        </Flex>
                                        <br/>
                                        <Button type="button" onClick={handleAddBadge}>
                                            Add Badge
                                        </Button>
                                        <Divider my={'lg'} />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {!addMore ? (
                                            <>
                                                <Button style={{ marginRight:'10px' }} variant='gradient' type='submit'>Add Event</Button>
                                                <Button style={{ marginRight:'10px' }} onClick={close} variant='gradient' >Cancel</Button>
                                            </>
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
                        )}
                    </Modal.Root>
                    {isAdmin === true && 
                      <Group position="right">
                          <Button variant='gradient' onClick={open}>Add Event</Button>
                          {isPreviewing ? <Button onClick={handleCloseEventCards} variant="gradient">Close Events Cards</Button> : <Button onClick={handleShowEventCards} variant="gradient">Show Events Cards</Button>}
                      </Group>
                    }
                    {!isAdmin && 
                      <Group position="right">
                          {isPreviewing ? <Button onClick={handleCloseEventCards} variant="gradient">Close Events Cards</Button> : <Button onClick={handleShowEventCards} variant="gradient">Show Events Cards</Button>}
                      </Group>
                    }
                    </Group>
                    {eventRowsCounter === 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 670 }}>
                        <Text>No Events Yet</Text>
                        </div>
                       
                    )}
                    {(eventRowsCounter > 0 && !isPreviewing && isAdmin) && showEventsDataTable()}
                    {(eventRowsCounter > 0 && isPreviewing) && showEventsCards()}
                    </Paper>
                </Container>
            </div>
            </div>
        </>
    )  
    
    function showEventsDataTable () {
        return(
            <EventsTable data={eventsData} onDataChange={handleDataChange}/>
        )
    }
    function showEventsCards () {
      return(
          <EventsCard data={eventsDataCards}/>
      )
  }
    
}
export default Events