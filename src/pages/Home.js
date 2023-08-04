import { createStyles, Overlay, Container, Title, Button, Text, rem, useMantineColorScheme, useMantineTheme, SimpleGrid, Card, Image, AspectRatio, Group } from '@mantine/core';
import { HomeNavBar } from '../components/HorizontalNavBar';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext} from '../App';
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { Badge } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://scontent.fmnl8-3.fna.fbcdn.net/v/t31.18172-8/29064239_2006915102902165_5037852773680660604_o.jpg?_nc_cat=105&ccb=1-7&_nc_sid=e3f864&_nc_ohc=2f4IWNItmnwAX-hxzlW&_nc_ht=scontent.fmnl8-3.fna&oh=00_AfBf2zcZ8tvRksoc4zBmghk9iNGLB9LKyHzDMdTD5TosJA&oe=64E76E3C)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'auto',
    top: -25,
    

  },

  container: {
    height: rem(820),
    display: 'flex',
    top: 0,
    left: -120,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start', // Align items to the left side
    paddingLeft: `calc(${theme.spacing.xl} * 3)`, // Add some left padding
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      height: rem(500),
      left: 0,
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  cardtitle: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(30),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(18),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,
    marginBottom: '20px',

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: rem(12),
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    marginBottom: '120px',

    [theme.fn.smallerThan('sm')]: {
      size: 20,
      fontSize: theme.fontSizes.sm
    },
  },
  alertcontainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    transition: 'opacity 0.5s ease', // Define the transition property
    boxShadow: '1px'
  },
  card: {
    transition: 'ease-in-out 500ms, box-shadow 150ms ease',
    

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(30),
      lineHeight: 1.2,
    },
  },

  // Update the font size of the card title here
  cardTitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
    fontSize: rem(18), // Update the font size here (you can adjust the value as needed)

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(30),
      lineHeight: 1.2,
    },
  },
}));

const mockdata = [
  {
    eventimage: "https://imgtr.ee/images/2023/08/03/090cdec3d8c20f958429e2d857d531b8.md.jpeg",
    eventname: "15th REGULAR SESSION 2023 ⚖️🇵🇭",
    eventdate: "8/3/2023",
    description: "Infrastructure projects in Lupang Arenda, Floodway Area, as well as in Central, were discussed, along with disaster response programs. Led by our Barangay Chairman Michael Tisoy Cruz and the Barangay Council Members of Sta. Ana, unity and cooperation continue to be the driving force towards the progress of our barangay.",
    location: "Municipal Hall",
    badges: [
      { emoji: "👆", label: "One Sta Ana" },
      { emoji: "⭐️", label: "Unity" },
    ],
  },
  {
    eventimage: "https://imgtr.ee/images/2023/08/03/a1c42f7f210931e9739c7897969f8e51.md.jpeg",
    eventname: "",
    eventdate: "7/31/2023",
    description: "Today, the Barangay Anti-Drug Abuse Council - BADAC, together with the BADAC of Barangay Dolores and Barangay Muzon, held a meeting for the sharing of knowledge and reporting.",
    location: "Sta Ana",
    badges: [
      { emoji: "👆", label: "One Sta Ana" },
      { emoji: "⭐️", label: "Unity" },
    ],
  },
  {
    eventimage: "https://imgtr.ee/images/2023/08/03/04d0dc1e44360ca7f1e2d96fc7334fd1.md.jpeg",
    eventname: 'Congratulations "GAIGAMAT" CLASS 58-2023! ',
    eventdate: "7/29/2023",
    description: "Over a hundred individuals completed their training in the Philippine Army at Fort Bonifacio Taguig City last month. One of our outstanding barangay members, 2LT Julius Jenno S. Lacay, is among the 106 graduates who are now part of the Philippine Army. We congratulate you on your success and honor! He was formerly a SK Kagawad (Youth Council Member) of our barangay and now he is one of the proud members of the Philippine Army.",
    location: "Sta Ana",
    badges: [
      { emoji: "👆", label: "One Sta Ana" },
      { emoji: "⭐️", label: "Unity" },
    ],
  },
  {
    eventimage: "https://imgtr.ee/images/2023/08/03/fb8c4f25ba723488d4390a016e205a53.jpeg",
    eventname: "Mr. & Ms. Teen Sta. Ana 2023 👑",
    eventdate: "7/29/2023",
    description: "The youth of Barangay Sta. Ana truly shone brightly and showcased their excellence!",
    location: "Sta Ana Court",
    badges: [
      { emoji: "👆", label: "One Sta Ana" },
      { emoji: "⭐️", label: "Unity" },
      { emoji: "🥳", label: "BanakFestival2023" },
    ],
  },
];



const Home = () => {
  const { classes } = useStyles();
  const {colorScheme} = useMantineColorScheme();
  const theme = useMantineTheme();
  const {inSession} = useContext(AppContext);
  const [closeAlert, setCloseAlert ] = useState(true);

    useEffect(() => {
    }, [inSession])

  const handleCloseAlert = () => {
    setCloseAlert(false);
  };

  const cards = mockdata.map((article) => (
    <Card key={article.title} p="xl" verticalSpacing='xl' radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.eventimage} />
      </AspectRatio>
      <Group position='apart'>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md" fontSize='sm'>
        {article.eventdate}
      </Text>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md" fontSize='sm'>
        {article.location}
      </Text>
      </Group>
      <Text className={classes.cardTitle} mt={5} fontSize='sm'>
        {article.eventname}
      </Text>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md" fontSize='sm'>
        {article.description}
      </Text>
      <Group spacing={7} mt={5}>
          {article.badges.map((badge, badgeIndex) => (
            <Badge
              color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
              key={`${badge.label}-${badgeIndex}`}
              leftSection={badge.emoji}
            >
              {badge.label}
            </Badge>
          ))}
        </Group>
    </Card>
  ));

  return (
    <>
    <HomeNavBar/>
    <div className={classes.alertcontainer}>
      {(inSession && closeAlert) && (
        <Alert
          color="blue"
          withCloseButton 
          variant="outline"
          onClose={handleCloseAlert}
        > <div>
            <Title size={'20px'}>Login Session Info</Title><br/>
            <Text>You are still signed in. If you want you to logout, please logout </Text>
            <Text>to dashboard and end the session.</Text>
          </div>
        </Alert>
      )}
    </div>
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.cardtitle}>Pamahalaang Barangay Sta Ana {'\n'} Taytay, Rizal</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Ang pag-papaunlad na proyekto mula sa mga studyante ng unibersidad ng Mapua
        </Text>

        <Button variant="gradient" size="xl" radius="xl" className={classes.control} component={Link} to={'/register'}>
          Get started
        </Button>
      </Container>

      <Container py="xl">
      <SimpleGrid cols={2} spacing={'xl'} verticalSpacing={'xl'} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
    </div>
    </>
  );
}
export default Home