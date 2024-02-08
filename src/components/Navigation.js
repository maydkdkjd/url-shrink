import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Spinner } from '../media/spinner.svg'

import {
  AppBar, Toolbar, Container, Typography, Menu, MenuItem, Button, IconButton,
  Tooltip, Avatar
} from "@mui/material";
import { Box } from "@mui/system";
import { Logo } from "./Logo";

import { AccountCircle as UserIcon, Logout as LogoutIcon } from '@mui/icons-material'
import useUser from "../contexts/user";

const NavBox = ({ children }) => (
  <Box sx={{ flexGrow: 1, display: "flex" }}>
    {children}
  </Box>
)

const Navigation = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, loading, logout } = useUser();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  }

  return (
    <AppBar elevation={2} position="fixed" color="transparent" sx={{
      backgroundColor: '#ffffffcc',
      backdropFilter: 'blur(4px)'
    }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Logo display='desktop' />
          <NavBox>
          </NavBox>
          {loading ? (
            <Button disabled component={NavLink} variant='outlined' to='/login'>
              <Spinner width={24} height={24} />
            </Button>
          ) : !user ? (
            <Button component={NavLink} variant='outlined' to='/login'>
              <Typography textAlign="center">Login</Typography>
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} sx={{ bgcolor: '#4191b7' }}>
                    <UserIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box marginX={2} marginY={2} sx={{ minWidth: 100 }}>
                  <Typography textAlign='center' variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography textAlign='center' variant="body1">
                    {user.email}
                  </Typography>
                </Box>
                <MenuItem onClick={handleLogout} sx={{ justifyContent: 'center', gap: 1 }}>
                  <LogoutIcon />
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation;