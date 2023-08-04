import { createStyles, Container, Group, ActionIcon, rem, useMantineTheme, useMantineColorScheme, Text } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandFacebook, IconBrandGmail, IconPhoneCall, IconLocation } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import LogoFooter from './LogoFooter';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    transition: 'ease-in-out 500ms'

  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function FooterSocial() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();
  const iconColor = theme.colorScheme === 'dark' ? theme.white : theme.black;
  const navigate = useNavigate();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <LogoFooter size={28}/>
        <Group spacing={0} className={classes.links} position="right" noWrap>
        <ActionIcon component={Link} to={'https://www.facebook.com/BrgyStaAnaTaytay/'} target={'_blank'} size="lg">
            <IconBrandFacebook size="1.05rem" stroke={1.5} color={iconColor}/>
          </ActionIcon>
          <ActionIcon component={Link} to={'mailto:brgy.sta.ana@gmail.com'} target={'_blank'} size="lg">
            <IconBrandGmail size="1.05rem" stroke={1.5} color={iconColor}/>
          </ActionIcon>
          <ActionIcon component={Link} to={'https://www.instagram.com/barangaystaana/?hl=en'} target={'_blank'} size="lg">
            <IconBrandInstagram size="1.05rem" stroke={1.5} color={iconColor}/>
          </ActionIcon>
          <ActionIcon component={Link} to={'https://www.google.com/maps/place/Barangay+Sta.Ana/@14.5401031,121.1111323,15z/data=!4m6!3m5!1s0x3397c64f810a74bb:0xe62110d95a2e22f5!8m2!3d14.5401031!4d121.1111323!16s%2Fg%2F11gs4wd534?entry=ttu'} target={'_blank'}> 
             <IconLocation size="1.05rem" stroke={1.5} color={iconColor}/>
          </ActionIcon>
          <a href="tel:+0910 233 2324">
            <ActionIcon size="lg">
              <IconPhoneCall size="1.05rem" stroke={1.5} color={iconColor} />
            </ActionIcon>
          </a>
        </Group>
      </Container>
    </div>
  );
}