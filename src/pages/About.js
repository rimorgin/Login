import React, {useState, useEffect} from "react";
import { HomeNavBar } from "../components/HorizontalNavBar";
import PreLoader from "../components/Loader";
import { useMediaQuery } from '@mantine/hooks';
import { Divider, Group, ScrollArea, Text, Title, createStyles, useMantineColorScheme, useMantineTheme, Box, Flex } from "@mantine/core";
import { TableOfContentsFloating } from "../components/ContentsTable.tsx";

const useStyles = createStyles((theme) => ({
    container: {
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: 0.7,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
        height:'fit-content',
        width: '90vw',
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.md,
        transition: 'ease-in-out 500ms'
      },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        flexDirection: 'column'
    },
    headline: {
        display: 'fixed',
        padding: theme.spacing.lg,
        paddingTop: '250px',
        paddingRight: '300px',
        fontSize: theme.fontSizes.sm,
        fontFamily: 'times-new-roman'
    },
    contentText: {
        display: 'fixed',
        padding: theme.spacing.lg,
        paddingRight: '50px',
        fontSize: theme.fontSizes.sm,
        fontFamily: 'times-new-roman'
    },
    box: {
        display: "float",
        flexDirection: "column",
        border: `1px solid ${theme.colors.gray[3]}`,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        alignItems: 'flex-start',
        top: -50,
        right: theme.spacing.md,
        float: 'right',
        width: '15%'
      },
    label: {
        fontWeight: 500,
        marginBottom: theme.spacing.xl,
        fontSize: theme.fontSizes.sm
    },
        value: {
        marginBottom: theme.spacing.sm,
    },
    rightTableContents: {
        display: 'block',
        position: 'absolute',
        top: '140px',
        right: theme.spacing.md, 
      },
    
      
}))
const links = [
    { label: 'About', link: '#about', order: 1 },
    { label: 'History', link: '#history', order: 1 },
    { label: 'Demographics', link: '#demographics', order: 1 },
    { label: 'Location', link: '#location', order: 1 },
    { label: 'Adjacent Barangays', link: '#adjacentbrgy', order: 1 },
  ];

const About = () => {
    const {classes} = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const theme = useMantineTheme();
    const colorScheme = useMantineColorScheme();

    const largeScreen = useMediaQuery('(min-width: 60em)');

    useEffect(() => {
        setTimeout(() => {
        setIsLoading(false);
        }, 5000);
    }, []);

    
        
    
    return (
        <>
        <HomeNavBar/>
        <ScrollArea h={'100%'}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <Title>Sta Ana{'\n'}</Title>
                    <Title fw={500} size={'18px'}>Municipality of Taytay</Title>
                    <Title fw={500} size={'18px'}>Province of Rizal</Title>
                </div>
                <Divider my={"xs"} size={'xs'}/>
                <div id="about">
                    
                    <div className={classes.rightTableContents}>
                        <TableOfContentsFloating links={links} />
                    </div>
                    
                    <Text className={classes.headline}>
                        Santa Ana is a barangay in the municipality of Taytay, in the province of Rizal. Its population as determined by the 2020 Census was 107,415. This represented 27.80% of the total population of Taytay. <br /><br />
                        The Sangguniang Barangay of Sta. Ana located at the heart of the Municipality of Taytay, Rizal has been one of the largest populations in the municipality, covering the controversial area of Lupang Arenda which a lot of officials think is a political burden, despite its emerging potentials. The new set of barangay officials, however, sees this population issue as an advantage, provided that they’d be able to involve the people with projects that directly and indirectly affect them. With this in mind, the Sanggunian with the help of the people, had been able to launch several projects that are first of its kind to the barangay and to the municipality as well.
                    </Text>

                    <div>
                        <Box className={classes.box}>
                            <Text className={classes.label}>Type: Barangay</Text>
                            <Text className={classes.label}>Island group: Luzon</Text>
                            <Text className={classes.label}>Region: CALABARZON (Region IV‑A)</Text>
                            <Text className={classes.label}>Province: Rizal</Text>
                            <Text className={classes.label}>Municipality: Taytay</Text>
                            <Text className={classes.label}>Postal code: 1920</Text>
                            <Text className={classes.label}>Population (2020): 107,415</Text>
                            <Text className={classes.label}>Philippine major island(s): Luzon</Text>
                            <Text className={classes.label}>Coordinates: 14.5374, 121.1099 (14° 32' North, 121° 7' East)</Text>
                            <Text className={classes.label}>Estimated elevation above sea level: 3.2 meters (10.5 feet)</Text>
                        </Box>
                    </div>    
                   
                </div>
                <div id="history" >
                <Title>History</Title> <br/>
                    <Group>
                        <Text className={classes.contentText}>
                            History of barangay Sta. Ana, Taytay, Rizal. Ana de Sapa in 1579. Journey to the Past. Heritage advocates stressed its a historical landmark that has been witness to the city's significant events and changes through the years. The latest census figures in 2020 denote a positive growth rate of 411 or an increase of 67,347 people from the previous population of 319,104 in 2015. Good Day! We are from the Sangguniang Bayan Secretariat of Taytay, Rizal. Since her family moved to Brgy. On June 11, 1901, Taytay became part of the newly created Province of Rizal by virtue of Act No. Pre-Spanish and Spanish Era. Volunteers get ready to clean the Mahabang Sapa Stream using bokashi balls at Purok Lupang Mitra, Barangay Sta. 137 enacted by the First Philippine Commission. Taytay traces its faith journey from the Spanish era. Taytay, Rizal, tagged as Garments Capital of the Philippines, is one of the 14 towns that can be found in the Province of Rizal.
                        </Text>
                        <Text className={classes.contentText}>
                            The town's first church, Visita de Sta. Upon the arrival of the Spaniards, the Franciscans proceeded to evangelize the inhabitants there and established a parish named Visita de Sta. Tobit Cruz, a native of Santa Ana, his grandfather was barangay captain in the 80s and an Ayala Young Leader, is responsible for first bringing the 3. Pedro Chirino who documented the Tagalog language as well as the way of life of Filipinos from his. It narrates the evangelizing mission of the Church. What is the history of Taytay, Rizal. Ana, a relocation site in Taytay, Rizal, has been flooded for one year, earning the ire of its residents. After the clean-up, Professor Pallant lectured on river rehabilitation at Taytay Municipal Hall with local government leaders and community members. It is believed that the name came from words like tayutay, hintay-hintay, and itay-itay, which arose when the village or barangay was doing trade with Chinese traders as did other lake towns around Laguna de Bay.
                        </Text>
                        <Text className={classes.contentText}>
                            The book is more than just a record of the past. List of barangays of Rizal. All-three barangays—Santa Ana, San Juan, and Bangyad—constituted the early town of Taytay as a juridical entity and specific territory. As prescribed by Republic Act 10533, known as Basic Education Act of 2013, which ensures that students are equipped for workforce readiness and that the country's educational system won't lag behind world standards. Apparently, an old municipal building that has stood there for over six decades is being demolished for the Rizal Provincial Hospital System-Taytay Annex. Now the site of San Juan Taytay Bridge at Rizal Avenue, Brgy. Its population as determined by the 2020 Census was 127,999. This represented 27.80% of the total population of Taytay. Our historic past is kept secret and unknown for centuries.
                        </Text>
                        <Text className={classes.contentText}>
                            Santa Ana, the mother of the Blessed Virgin Mary and grandmother of Jesus Christ. Its population as determined by the 2020 Census was 75,504. Santa Ana is a barangay in the municipality of Taytay, in the province of Rizal.
                        </Text>
                        <Text className={classes.contentText}>
                            Historical population The population of Taytay grew from 6,067 in 1903 to 386,451 in 2020, an increase of 380,384 people over the course of 117 years. Its local garments are the bread and butter of the town's people—the heart and soul. In 1903, Taytay was merged with the neighboring towns of Cainta and Angono by virtue of Act No. Sta Ana, Taytay, Rizal East Ortigas Mansion - 2 Bedroom 2 211 IBIZA East Ortigas Mansion, Ortigas Ave., Manila Distinct Living Condominium Unit 311 Hampton Gardens Condominium C. Santa Ana connecting Maria Clara Street and 1901. The history of tiangge is very rich in culture that it. Incidentally, both Taguig town (now a city) and Barangay Santa Ana of Taytay were among the earliest farming and fishing villages that became encomiendas under Santa Ana de Sapa which honor and celebrate the same patron saint. Tanchoco Avenue, El Monteverde Subdivision, Taytay, Rizal.
                        </Text>
                        <Text className={classes.contentText}>
                            The inhabitants of Rizal province of yore enjoyed the best of two shores -- the seashore of Manila Bay on its western fringes with its famous sunset and the lakeshore of Laguna de Bai at its eastern border noted for its picturesque view of the. This represented 1954 of the total population of Taytay. A street in Barangay Sta. Raymundo Ave Maybunga Pasig City Manila. According to former Mayor Felix M. And Taytay Elementary School TES 1914 at L. Sanvictores 1925-1931 Lupang Arenda was donated by Juan Valerio Gonzales and Cristobal Paramdam to the Municipio in 1740. Cruz St Tudela Barangay Sta. We would like to request a record of all the elected and Appointed Barangay Officials Barangay Captains Kagawads and SK Chairmans of all the 5 barangays of Taytay Rizal namely Dolores San Isidro Muzon San Juan and Sta. This represented 3312 of the total population of Taytay. Cruz Bridge at Brgy. Its population as determined by the 2020 Census was 107415. Taytay began as a settlement situated near the Laguna de Bay that formed part of the Kingdom of Namayan whose seat of power was situated in what is now Sta. 120th Founding Anniversary of Rizal Province June 11 2021. Chinese sailing vessels would dock at Manila Bay to conduct trade with the thriving barangays of Maynilad and Tondo and go up the Pasig River to do more barter trade. As of 2020 the province of Rizal has 189 barangays as shown in the following list. San Juan is a barangay in the municipality of Taytay in the province of Rizal. DepEd Rizal took its part in laying down the foundation in the implementation of establishing Taytay Senior High School Stand-Alone. It is hardly revealed in standard history textbooks nor taught in. Dolores formerly Poblacion is a barangay in the municipality of Taytay in the province of Rizal. © History Of Barangay Sta Ana Taytay Rizal
                        </Text> 
                    </Group>
                </div>
                <div id="demographics">
                    
                </div>
                <div id="location">
                    
                </div>
                <div id="adjacentbrgy">
                    
                </div>
            </div>  
        </ScrollArea>
        </>
        
    );
}

export default About;