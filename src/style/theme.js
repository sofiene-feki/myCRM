import {  createTheme } from "@mui/material"




const baseTheme = createTheme({
    // typography: {
        
    //     body2: {
    //       fontWeight: 600,
    //     },
       
    //   },
components : {
    
    MuiSelect : {
        defaultProps : {
            sx: {
                backgroundColor : "white"
            }
        }
    },

    MuiTextField: {
        defaultProps : {
            sx: {
                backgroundColor : "white"
            }
        }
    },
   

  

   
}
})

export default baseTheme