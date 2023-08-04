import { createSlice } from "@reduxjs/toolkit";


const NavbarRedux = createSlice({
    name: 'navbar',
    initialState:{
        show: true,

    },
    reducers: {
        ShowNavbar : (state)=>{
            state.show = true;
        },
        HideNavbar : (state)=>{
            state.show = false;
        }
    }
});

export const { ShowNavbar, HideNavbar } = NavbarRedux.actions;
export default NavbarRedux.reducer;