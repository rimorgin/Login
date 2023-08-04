import { Modal, Text, Box, Stack, Flex, Divider, Group, useMantineColorScheme, useMantineTheme, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArrowBackUp } from "tabler-icons-react";
import { EventsCard } from "../components/EventsCard.tsx";
import { useEffect, useState } from "react";

export function ShowPreviewEventCard(eventsDataPreview) {
    const theme = useMantineTheme();
    const {colorScheme} = useMantineColorScheme
    const [opened, { open, close }] = useDisclosure(false);
    const [eventsData, setEventsData] = useState('');

    useEffect(() => {
        console.log('modal',eventsDataPreview);
        setEventsData(eventsDataPreview);
    }, eventsDataPreview)

    return (
        <>
      <Modal.Root opened={opened} onClose={close} centered>
        <Modal.Overlay overlayProps={{
                     color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                     opacity: 0.55,
                     blur: 3,
                     }}>
         <Modal.Content>
             <Modal.Header>
                 <Modal.Title><Text color={theme.colorScheme === 'dark' ? theme.white : theme.black}>Delete Staff</Text></Modal.Title>
                   <Modal.CloseButton>
                     <div>
                       <ArrowBackUp onClick={close} size={28} strokeWidth={2} color={theme.colorScheme === 'dark' ? theme.white : theme.black} />
                     </div>
                   </Modal.CloseButton>
             </Modal.Header>
                 <Modal.Body>
                 <Box>
                   <Stack>
                     <Flex >
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Group position='apart'>
     
                         </Group>
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Group position='apart'>
                           <Button onClick={close} variant='gradient'>Cancel</Button>
                         </Group>
                       </div>
                     </Flex>
                 </Stack>
                 </Box>
             </Modal.Body>
           </Modal.Content>
           </Modal.Overlay>
         </Modal.Root>
         <Group position="center">
         <Button onClick={open}>Open modal</Button>
       </Group>
      </>
    );
  }