import React, { useEffect } from "react";
import '../styles/loader.css';
import { preLoaderAnim } from "../animations/PreLoaderAnim";


const PreLoader = () => {
    useEffect(()=>{
        preLoaderAnim()
    },[]);
    return (
        <>
        <div className="preloader">
             <div className="loader">
                <div className="texts-container">
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <span>Just</span>
                    <span>wait</span>
                    <span>a</span>
                    <span>sec...</span>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </div>
            </div>
        </div>
        </>
    );
}

export default PreLoader;