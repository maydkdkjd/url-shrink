import React from "react"
import { ReactComponent as ShortUrlLarge } from '../media/short-url.svg';
import { ReactComponent as ShortUrlLogo } from "../media/short-url-h.svg"
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";

const Logo = () => (
    <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: 'none'
    }} component={NavLink} to='/'>
        <Box sx={{ height: 64, mr: 1, padding: '8px 0' }}>
            <ShortUrlLogo style={{ height: '100%', width: 'fit-content' }} />
        </Box>
    </Box>)

const LogoLarge = () => (
    <Box sx={{ pb: 4 }}>
        <ShortUrlLarge height={128} />
    </Box>
)

export { Logo, LogoLarge };