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
    Box,
    Button,
    Divider,
    Flex,
    Modal,
    Stack,
    TextInput,
  } from '@mantine/core';
  import { IconPencil, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import OfficialsDataService from '../../services/officials.services'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { ArrowBackUp } from 'tabler-icons-react';
  
  interface UsersTableProps {
    data: { avatar: string; name: string; position: string; email: string; phone: string }[];
    onDataChange: (value: boolean) => void;
  }
  
  const jobColors: Record<string, string> = {
    captain: 'blue',
    councilor: 'cyan',
    treasurer: 'pink',
  };

  type Values = {
    name : string,
    email : string,
    position : string,
    phone: string,
  }
  export default function BrgyOfficialsTable({ data, onDataChange }: UsersTableProps) {
    const theme = useMantineTheme();
    const isLargeScreen = window.innerWidth >= 1024;
    const [isEditing, setIsEditing] = useState(false); 
    const [isDeleting, setIsDeleting] = useState(false);
    const [modalData, setModalData] = useState<{ avatar: string; name: string; position: string; email: string; phone: string } | undefined>(undefined);
    //reference to db collection
    const officialsRef = collection(db,'officials');
    const [values,setValues] = useState<Values>({
      name : modalData?.name || "",
      email : modalData?.email || "",
      position : modalData?.position || "",
      phone: modalData?.phone ||  "",
  });

  
  const formatData = (dataArray) => {
    const formattedData = {
      name: dataArray[0] || '',
      email: dataArray[1] || '',
      position: dataArray[2] || '',
      phone: dataArray[3] || '',
    };
    return formattedData;
  };

  const handleEdit = (name: string) => {
    const rowData = data.find((item) => item.name === name);
    if (rowData) {
      setIsEditing(true);
      setModalData(rowData);
    }
  };

  const handleDelete = (name: string) => {
    const rowData = data.find((item) => item.name === name);
    if (rowData) {
      setIsDeleting(true);
      setModalData(rowData);
    }
  };

  useEffect(() => {
    
  }, [modalData]);

  const handleSave = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rawData = Object.values(values)
    const formattedData = formatData(rawData);
    console.log(formattedData);
    const emailField = modalData?.email;
    console.log(emailField)
    
    const queryReq = query(officialsRef, where('email','==',emailField))
    const querySnapshot = await getDocs(queryReq);
    
    if (!querySnapshot.empty) {
      const [firstDoc] = querySnapshot.docs; // Get the first (and presumably only) document
      const docId = firstDoc.id;
      try{
        await OfficialsDataService.updateOfficial(docId,formattedData)
        onDataChange(true);
        setModalData(undefined);
      }catch(error){
        console.log(error)
      }
    } else {
      console.log('document not exist')
    }
  }

  const handleDeleteStaff = async () => {
    console.log(modalData?.email);
    const queryEmail = query(officialsRef, where('email','==', modalData?.email))
    const querySnapshot = await getDocs(queryEmail);

    if (!querySnapshot.empty) {
      const [firstDoc] = querySnapshot.docs; // Get the first (and presumably only) document
      const docId = firstDoc.id;
      try{
        await OfficialsDataService.deleteOfficial(docId);
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
    setModalData(undefined); // Reset the modalData state variable when closing the modal
  };

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values,[event.target.name] : event.target.value});
  }


    const rows = data.map((item) => (
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <Avatar size={30} src={item.avatar} radius={30} />
            <Text fz="sm" fw={500} style={{color: theme.colorScheme === 'dark' ? 'white' : 'black'}}>
              {item.name}
            </Text>
          </Group>
        </td>
  
        <td>
          <Badge
            size='12px'
            color={jobColors[item.position.toLowerCase()]}
            variant={theme.colorScheme === 'dark' ? 'outline' : 'filled'}
          >
            {item.position}
          </Badge>
        </td>
        <td>
          <Anchor component="button" size="sm">
            {item.email}
          </Anchor>
        </td>
        <td>
          <Text fz="sm" c="dimmed">
            {item.phone}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => handleEdit(item.name)}>
              <IconPencil size="1rem" stroke={1.5} color={theme.colorScheme === 'dark' ? theme.white : theme.black}/>
            </ActionIcon>
            <ActionIcon onClick={() => handleDelete(item.name)}>
              <IconTrash size="1rem" stroke={1.5} color={theme.colorScheme === 'dark' ? theme.white : theme.black}/>
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ));
  
    return (
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Barangay Official Name</th>
              <th>Barangay Official Position</th>
              <th>Email</th>
              <th>Phone</th>
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
      const { avatar, name, position, email, phone } = modalData ?? {};
    
      return (
        <Modal.Root opened={isEditing} onClose={handleModalClose} centered>

                <Modal.Content>
                        <Modal.Header>
                            <Modal.Title><Text color={theme.colorScheme === 'dark' ? theme.white : theme.black}>Edit Official</Text></Modal.Title>
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
                                  <form onSubmit={handleSave} style={{ width: '100%' }}>
                                        <TextInput
                                          type="text"
                                          name="name"
                                          variant="filled"
                                          label="Enter Official's Name"
                                          placeholder={name}
                                          defaultValue={name}
                                          value={values.name} // Use values.name instead of name
                                          onChange={handleChange}
                                          required
                                        />

                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="position"
                                            name="position"
                                            variant='filled'
                                            label="Enter Official's Position"
                                            placeholder={position}
                                            defaultValue={position}
                                            value={values.position}
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={handleChange}
                                            required
                                            
                                            />
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="email"
                                            name="email"
                                            variant='filled'
                                            label="Enter Official's Email Address"
                                            placeholder={email}
                                            defaultValue={email}
                                            value={values.email}
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={handleChange}
                                            required
                                            
                                            />
                                        <Divider my={'lg'} />
                                        <TextInput
                                            type="phone"
                                            name="phone"
                                            variant='filled'
                                            label="Enter Official's Contact Number"
                                            placeholder={phone}
                                            defaultValue={phone}
                                            value={values.phone}
                                            size={isLargeScreen ? 'md' : 'xs'}
                                            onChange={handleChange}
                                            required
                                            
                                            />
                                        <Divider my={'lg'} />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Button type='submit' variant='gradient'>Edit Official</Button>
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
      const { avatar, name, position, email, phone } = modalData ?? {};
    
      return (
        <Modal.Root opened={isDeleting} onClose={handleModalClose} centered>
          <Modal.Content>
                  <Modal.Header>
                      <Modal.Title><Text color={theme.colorScheme === 'dark' ? theme.white : theme.black}>Delete Official</Text></Modal.Title>
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
                            <Text>{name}</Text>
                            <br/>
                            <Text>{position}</Text>
                            <br/>
                            <Text>{email}</Text>
                            <br/>
                            <Text>{phone}</Text>
                            <br/>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Group position='apart'>
                                <Button onClick={handleDeleteStaff} variant='gradient'>Delete Official</Button>
                                <Button onClick={handleModalClose} variant='gradient'>cancel</Button>
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