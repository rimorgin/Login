import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from '@mantine/core';  
import { Notifications } from '@mantine/notifications';
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store,persistor } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        breakpoints: {
          xs: '30em',
          sm: '48em',
          md: '64em',
          lg: '74em',
          xl: '90em',
        },
      }}
      styles={{
        Navbar: {
          root: { height: '100vh', width: '300px' }
        }
      }}
    > <Notifications/>
      <App /> 
    </MantineProvider>
  </BrowserRouter>
  </PersistGate>
</Provider>
);  

//  </PersistGate>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

