import  blackbrgyLogo  from '../images/black-brgy-tagname.png';
import  whitebrgyLogo  from '../images/white-brgy-tagname.png';
import { useMantineColorScheme } from '@mantine/core';

const LogoHeader = () => {

    const {colorScheme} = useMantineColorScheme();
    const logoSrc = colorScheme === 'dark' ? blackbrgyLogo : whitebrgyLogo;

return <img style={{ transition: "ease-in-out 500ms", height:('80px'),  marginTop:'10px',marginLeft: '10px',width:('260px')}} src={logoSrc} alt="Barangay Sta Ana" />;

};

export default LogoHeader
