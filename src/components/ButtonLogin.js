import { createStyles, Button, Menu, Group, ActionIcon, rem, useMantineTheme, useMantineColorScheme, Text, Divider } from '@mantine/core';
import { IconTrash, IconBookmark, IconCalendar, IconChevronDown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`,
  },
  menuItem: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
}));

export function SplitButton() {
  const { classes} = useStyles();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();
  const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6];

  return (
    <Group noWrap spacing={0}>
      <Button variant='gradient' className={classes.button}>Login as</Button>
      <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
        <Menu.Target>
          <ActionIcon
            variant="filled"
            color={theme.primaryColor}
            size={36}
            className={classes.menuControl}
          >
            <IconChevronDown size="1rem" stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} to="/adminlogin" icon={<IconCalendar size="1rem" stroke={1.5} color={menuIconColor} />}>
            <Text className={classes.menuItem}>Admin</Text>
          </Menu.Item>
            <Divider style={{ color: theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.black, }} my={'xs'} size={'xs'}/>
          <Menu.Item className={classes.menuItem} component={Link} to="/zoneleaderlogin" icon={<IconBookmark size="1rem" stroke={1.5} color={menuIconColor} />}>
          <Text className={classes.menuItem}>Zone Leader</Text>
          </Menu.Item>
            <Divider style={{ color: theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.black, }} my={'xs'} size={'xs'}/>
          <Menu.Item className={classes.menuItem} component={Link} to="/residentuserlogin" icon={<IconTrash size="1rem" stroke={1.5} color={menuIconColor} />}>
          <Text className={classes.menuItem}>Resident User</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}