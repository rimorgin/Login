import { useState,useEffect } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import React from 'react';

const useStyles = createStyles((theme) => ({

  table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width:'100%',
    height: '100%',
    marginBottom: '1rem',
    padding: '0.5rem',
    border: '1px solid #ddd',
    textAlign: 'left',
    fontWeight: 700,
  },
  th: {
    padding: '30px',
    border: '1px solid #ddd,'
  },

  td: {
    textAlign: 'left',
    fontWeight: 700,
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

interface RowData {
  username: string,
  firstname:string,
  middlename: string,
  lastname: string,
  suffix: string,
  contacts: string,
  birthday: string,
  gender: string,
  email: string,
  password: string,
  civilstatus: string,
  citizenship: string,
  purok: string,
  address: string
}
    
interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(query)
    )
  );
}


function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export default function BrgyResidentTable({ data }: TableSortProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Data fetching is complete after 3s (adjust this value as needed)
    }, 3000);
  }, []);

  const rows = sortedData.map((row) => (
    <tr key={row.username}>
      <td>{row.username}</td>
      <td>{row.firstname}</td>
      <td>{row.middlename}</td>
      <td>{row.lastname}</td>
      <td>{row.suffix}</td>
      <td>{row.contacts}</td>
      <td>{row.birthday}</td>
      <td>{row.gender}</td>
      <td>{row.email}</td>
      <td>{row.password}</td>
      <td>{row.civilstatus}</td>
      <td>{row.citizenship}</td>
      <td>{row.purok}</td>
      <td>{row.address}</td>
    </tr>
  ));

  return (
    <ScrollArea type='auto' h={'100%'} 
    offsetScrollbars
    styles={(theme) => ({
      scrollbar: {
        '&, &:hover': {
          background:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
          backgroundColor: theme.colors.red[6],
        },

        '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
          backgroundColor: theme.colors.blue[6],
        },
      },

      corner: {
        opacity: 1,
        background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    })}
  >
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
        style={{ position:'sticky' }}
      />
      
      <Table horizontalSpacing="xl" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'auto' }}>
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'username'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('username')}
            >
              username
            </Th>
            <Th
              sorted={sortBy === 'firstname'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('firstname')}
            >
              firstname
            </Th>
            <Th
              sorted={sortBy === 'middlename'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('middlename')}
            >
              middlename
            </Th>
            <Th
              sorted={sortBy === 'lastname'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('lastname')}
            >
              lastname
            </Th>
            <Th
              sorted={sortBy === 'suffix'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('suffix')}
            >
              suffix
            </Th>
            <Th
              sorted={sortBy === 'contacts'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('contacts')}
            >
              contacts
            </Th>
            <Th
              sorted={sortBy === 'birthday'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('birthday')}
            >
              birthday
            </Th>
            <Th
              sorted={sortBy === 'gender'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('gender')}
            >
              gender
            </Th>
            <Th
              sorted={sortBy === 'email'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('email')}
            >
              email
            </Th>
            <Th
              sorted={sortBy === 'password'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('password')}
            >
              password
            </Th>
            <Th
              sorted={sortBy === 'civilstatus'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('civilstatus')}
            >
              civilstatus
            </Th>
            <Th
              sorted={sortBy === 'citizenship'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('citizenship')}
            >
              citizenship
            </Th>
            <Th
              sorted={sortBy === 'purok'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('purok')}
            >
              purok
            </Th>
            <Th
              sorted={sortBy === 'address'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('address')}
            >
              address
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}