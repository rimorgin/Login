import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    Anchor,
    ScrollArea,
    useMantineTheme,
    Modal,
    Button,
    Box,
    Divider,
    Flex,
    Stack,
    TextInput
  } from '@mantine/core';
  import { IconPencil, IconTrash } from '@tabler/icons-react';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ArrowBackUp } from 'tabler-icons-react';
import { db } from '../../firebase';
import EventDataService from '../../services/event.services';
import { DateTimePicker } from '@mantine/dates';

  
  interface UsersTableProps {
    data: { eventname: string; eventdate: string; description: string; location: string }[];
    onDataChange: (value: boolean) => void;
  }
  
  const jobColors: Record<string, string> = {
    tanod: 'blue',
    janitor: 'cyan',
    clerk: 'pink',
  };

  type Values = {
    eventname : string,
    description : string,
    location: string,
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

  
  export default function EventsTable({ data, onDataChange }: UsersTableProps) {
    const theme = useMantineTheme();
    const isLargeScreen = window.innerWidth >= 1024;
    const [isEditing, setIsEditing] = useState(false); 
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [value, onChange] = useState<Value>(new Date());
    const [modalData, setModalData] = useState<{ eventname: string; eventdate: string; description: string; location: string } | undefined>(undefined);
    //reference to db collection
    const eventsRef = collection(db,'events');
    const [values,setValues] = useState<Values>({
      eventname : modalData?.eventname || "",
      description : modalData?.description|| "",
      location : modalData?.location||  "",
  });
    

  
  const formatData = (dataArray) => {
    const formattedData = {
      eventname: dataArray[0] || '',
      eventdate: value || '',
      description: dataArray[1] || '',
      location: dataArray[2] || '',
    };
    return formattedData;
  };

  const handleEdit = (eventname: string) => {
    const rowData = data.find((item) => item.eventname === eventname);
    if (rowData) {
      setIsEditing(true);
      setModalData(rowData);
    }
  };

  const handleDelete = (eventname: string) => {
    const rowData = data.find((item) => item.eventname === eventname);
    if (rowData) {
      setIsDeleting(true);
      setModalData(rowData);
    }
  };

  useEffect(() => {
    
  }, [modalData]);
  useEffect(() => {
    console.log(value)  
  }, [value]);

  const handleEditEvent = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rawData = Object.values(values);
    const formattedData = formatData(rawData);
    console.log(rawData);
    console.log(formattedData);
    const eventNameField = modalData?.eventname;
    console.log(eventNameField)
    
    const queryReq = query(eventsRef, where('eventname','==',eventNameField))
    const querySnapshot = await getDocs(queryReq);
    
    if (!querySnapshot.empty) {
      const [firstDoc] = querySnapshot.docs; // Get the first (and presumably only) document
      const docId = firstDoc.id;
      try{
        await EventDataService.updateEvents(docId,formattedData)
        onDataChange(true);
        setModalData(undefined);
      }catch(error){
        console.log(error)
      }
    } else {
      console.log('document not exist')
    }
  }

  const handleDeleteEvent = async () => {
    const eventNameField = modalData?.eventname;
    const queryReq = query(eventsRef, where('eventname','==',eventNameField))
    const querySnapshot = await getDocs(queryReq);

    if (!querySnapshot.empty) {
      const [firstDoc] = querySnapshot.docs; // Get the first (and presumably only) document
      const docId = firstDoc.id;
      try{
        await EventDataService.deleteEvents(docId);
        onDataChange(true);
        setModalData(undefined);
      }catch(error){
        console.log(error)
      }
    } else {
      console.log('document not exist')
    }

  } 

  const handleModalClose = () => {
    setIsEditing(false);
    setIsDeleting(false);
    setIsPreviewing(false);
    onDataChange(false);
    setModalData(undefined); // Reset the modalData state variable when closing the modal
  };

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values,[event.target.name] : event.target.value});
  }


    const rows = data.map((item) => (
      <tr key={item.eventname}>
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500} style={{color: theme.colorScheme === 'dark' ? 'white' : 'black'}}>
              {item.eventname}
            </Text>
          </Group>
        </td>
  
        <td>
          <Badge
            size='12px'
            color={jobColors[item.eventdate]}
            variant={theme.colorScheme === 'dark' ? 'outline' : 'filled'}
          >
            {item.eventdate}
          </Badge>
        </td>
        <td>
          <Anchor component="button" size="sm">
            {item.description}
          </Anchor>
        </td>
        <td>
          <Text fz="sm" c="dimmed">
            {item.location}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => handleEdit(item.eventname)}>
              <IconPencil size="1rem" stroke={1.5} color={theme.colorScheme === 'dark' ? theme.white : theme.black}/>
            </ActionIcon>
            <ActionIcon color="red" onClick={() => handleDelete(item.eventname)}>
              <IconTrash size="1rem" stroke={1.5} color={theme.colorScheme === 'dark' ? theme.white : theme.black}/>
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ));
  
    return (
      <ScrollArea type='auto' h={'100%'}>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Event Description</th>
              <th>Event Location</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        {(modalData && isEditing) && showEditModal(onDataChange)}
        {(modalData && isDeleting) && showDeleteModal(onDataChange)}

      </ScrollArea>
    );

    function showEditModal(onDataChange) {
      const { eventname, eventdate, description, location } = modalData ?? {};
    
      return (
        <Modal.Root opened={isEditing} onClose={handleModalClose} centered>

                <Modal.Content>
                        <Modal.Header>
                            <Modal.Title><Text color={theme.colorScheme === 'dark' ? theme.white : theme.black}>Edit Staff</Text></Modal.Title>
                            <Modal.CloseButton>
                            <div>
                                <ArrowBackUp onClick={handleModalClose} size={28} strokeWidth={2} color={theme.colorScheme === 'dark' ? theme.white : theme.black} />
                            </div>
                            </Modal.CloseButton>
                        </Modal.Header>
                        <Modal.Body>
                        <Box>
                          <Stack>
                            <Flex >
                                <div>
                                  <form onSubmit={handleEditEvent} style={{ width: '100%' }}>
                                        <TextInput
                                          type="eventname"
                                          name="eventname"
                                          variant="filled"
                                          label="Enter Staff Name"
                                          placeholder={eventname}
                                          defaultValue={eventname}
                                          value={values.eventname} // Use values.name instead of name
                                          size={isLargeScreen ? 'md' : 'xs'}
                                          onChange={handleChange}
                                          required
                                        />

                                        <Divider my={'lg'} />
                                        <DateTimePicker
                                            clearable
                                            type="datetime-local"
                                            name="eventdate"
                                            valueFormat="DD MMM YYYY hh:mm A"
                                            variant="filled"
                                            aria-placeholder={eventdate}
                                            value={value}
                                            label="Pick date and time of Event"
                                            placeholder="Pick date and time of Event"
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            timeInputProps={{ 'aria-label': 'Pick time' }}
                                            onChange={onChange}/>
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="description"
                                            name="description"
                                            variant='filled'
                                            label='Enter Event Description'
                                            placeholder={description}
                                            defaultValue={description}
                                            value={values.description}
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={handleChange}
                                            required
                                            
                                            />
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="location"
                                            name="location"
                                            variant='filled'
                                            label='Enter Event Location'
                                            placeholder={location}
                                            defaultValue={location}
                                            value={values.location}
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={handleChange}
                                            required
                                            
                                            />
                                        <Divider my={'lg'} />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Button type='submit' variant='gradient'>Edit Event</Button>
                                        </div>
                                   
                                    </form>
                                    </div>
                                </Flex>
                            </Stack>
                            </Box>
                        </Modal.Body>
                        </Modal.Content>
 
                    </Modal.Root>
      );
    }

    function showDeleteModal(onDataChange) {
     const { eventname, eventdate, description, location } = modalData ?? {};
    
      return (
        <Modal.Root opened={isDeleting} onClose={handleModalClose} centered>

                <Modal.Content>
                        <Modal.Header>
                            <Modal.Title><Text color={theme.colorScheme === 'dark' ? theme.white : theme.black}>Delete Staff</Text></Modal.Title>
                            <Modal.CloseButton>
                            <div>
                              <ArrowBackUp onClick={handleModalClose} size={28} strokeWidth={2} color={theme.colorScheme === 'dark' ? theme.white : theme.black} />
                            </div>
                            </Modal.CloseButton>
                        </Modal.Header>
                        <Modal.Body>
                        <Box>
                          <Stack>
                            <Flex >
                                <div>
                                  <Text>{eventname}</Text>
                                  <br/>
                                  <Text>{eventdate}</Text>
                                  <br/>
                                  <Text>{description}</Text>
                                  <br/>
                                  <Text>{location}</Text>
                                  <br/>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Group position='apart'>
                                      <Button onClick={handleDeleteEvent} variant='gradient'>Delete Event</Button>
                                      <Button onClick={handleModalClose} variant='gradient'>Cancel</Button>
                                    </Group>
                                  </div>
                                  </div>
                                </Flex>
                            </Stack>
                            </Box>
                        </Modal.Body>
                        </Modal.Content>
 
                    </Modal.Root>
      );
    }
  }