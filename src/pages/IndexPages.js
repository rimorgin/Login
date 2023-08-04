import React, {useState, useEffect} from "react";
import { HomeNavBar } from "../components/HorizontalNavBar";
import PreLoader from "../components/Loader";
import { useMediaQuery } from '@mantine/hooks';

const Index= () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
        setIsLoading(false);
        }, 5000);
    }, []);


    return (
        <>{isLoading ? (
            <PreLoader />
          ) : (
            <HomeNavBar/>
          )}
        </>
        
    );
}
export default Index;