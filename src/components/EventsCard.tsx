import { IconHeart } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
  AspectRatio,
  SimpleGrid,
  Container,
  ScrollArea,
} from '@mantine/core';
import React, { useState } from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface BadgeCardProps {
  data: {
    eventimage: string;
    eventname: string;
    eventdate: string;
    description: string;
    location: string;
    badges: {
      emoji: string;
      label: string;
    }[];
  }[];
}

export function EventsCard({ data }: BadgeCardProps) {
  const { classes, theme } = useStyles();
  const [likedStatus, setLikedStatus] = useState(Array(data.length).fill(false));

  const handleLikeClick = (index) => {
    setLikedStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !newStatus[index];
      return newStatus;
    });
  };

  const cards = data.map((event, index) => (
    <Card withBorder radius="md" p="md" className={classes.card} key={index}>
      <Card.Section>
        <Image src={event.eventimage} alt={event.eventname} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {event.eventname}
          </Text>
          <Badge size="sm">{event.location}</Badge>
        </Group>
          <Text size={'xs'}>
            {event.eventdate}
          </Text>
        <Text fz="sm" mt="xs">
          {event.description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group spacing={7} mt={5}>
          {event.badges.map((badge, badgeIndex) => (
            <Badge
              color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
              key={`${badge.label}-${badgeIndex}`}
              leftSection={badge.emoji}
            >
              {badge.label}
            </Badge>
          ))}
        </Group>
      </Card.Section>

      <Group mt="xs">
       { !likedStatus ? ( 
         <ActionIcon
         bg={likedStatus[index] ? 'red' : undefined}
         onClick={() => handleLikeClick(index)}
         variant="default"
         radius="md"
         size={36}
       >
          <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
        </ActionIcon> 
        ) : (
          <ActionIcon
          bg={likedStatus[index] ? 'red' : undefined}
          onClick={() => handleLikeClick(index)}
          variant="default"
          radius="md"
          size={36}
        >
          <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
        </ActionIcon> 
        )}
      </Group>
    </Card>
  ));

  return (
    <ScrollArea type='auto' h={'100%'} >
      <Container py="xl">
        <SimpleGrid cols={2} spacing={'xl'} verticalSpacing={'xl'} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </Container>
    </ScrollArea>
  );
}