import { useState } from 'react';
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  table: {
    width:'90%',
    height: '100%',
    transition: "ease-in-out 500ms"
  },

  header: {
    position: 'sticky',
    top: 0,
    width: '80%',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      transition: "ease-in-out 500ms",
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  tableCell: {
    padding: rem(1), // Set the padding to 1px
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black, // Set text color
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white, // Set background color
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[9]}`, // Add border
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[9]}`, // Add border
  },

  noRowsMessageCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 400px)', // Adjust this value as needed to center the message
    fontSize: rem(16),
    color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.gray[7],
  },
}));

interface TableScrollAreaProps {
  data: { name: string; purok: string; requestedDocu: string; daterequested: string; cost: string; paymentstatus: string; status: string; }[];
}

export function TableScrollArea({ data }: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.name}>
      <td className={classes.tableCell}>{row.name}</td>
      <td className={classes.tableCell}>{row.purok}</td>
      <td className={classes.tableCell}>{row.requestedDocu}</td>
      <td className={classes.tableCell}>{row.daterequested}</td>
      <td className={classes.tableCell}>{row.cost}</td>
      <td className={classes.tableCell}>{row.paymentstatus}</td>
      <td className={classes.tableCell}>{row.status}</td>
    </tr>
  ));

  const noRowsMessage = (
    <tr>
      <td colSpan={7} className={cx(classes.tableCell, classes.noRowsMessageCell)}>
        Nothing yet
      </td>
  </tr>
  );

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={600}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th className={classes.tableCell}>Resident Name</th>
            <th className={classes.tableCell}>Purok</th>
            <th className={classes.tableCell}>Requested Document</th>
            <th className={classes.tableCell}>Date Requested</th>
            <th className={classes.tableCell}>Cost</th>
            <th className={classes.tableCell}>Payment Status</th>
            <th className={classes.tableCell}>Status</th>
          </tr>
          <tr></tr>
        </thead>
        <tbody>{rows.length === 0 ? noRowsMessage : rows}</tbody>
      </Table>
    </ScrollArea>
  );
}