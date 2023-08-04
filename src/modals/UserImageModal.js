import { useDisclosure } from '@mantine/hooks';
import { Modal, useMantineTheme, Group, Button, Text, useMantineColorScheme } from '@mantine/core';

const ViewImage = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  const { colorScheme } = useMantineColorScheme();
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        title="Your Image"
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        centered>
         <img src={props.image}/>
      </Modal>

      <Group position="center">
        <Button variant='outline' size='xs' onClick={open}><Text color={iconColor}>view image</Text></Button>
      </Group>
    </>
  );
}
export default ViewImage