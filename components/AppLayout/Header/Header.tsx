"use client"

import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';
import { loginUser, logoutUser } from '@/api/auth';


import ConnectWallet from '@/components/ConnectWallet/ConnectWallet';
import { useAuthStore } from '@/app/_zustand/store';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  boxShadow: 'none',
  background: theme.palette.background.paper,
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  [theme.breakpoints.up('lg')]: {
    minHeight: '70px',
  },
  width: '100%',
}));
const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: 'fit-content',
  float: 'right',
  color: theme.palette.text.secondary,
}));

const Header = () => {
  const {setUser} = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (address: string) => {
      return loginUser(address);
    },
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem('token', data.token);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      return logoutUser();
    },
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem('token');
    }
  });

  const onConnectWallet = React.useCallback((address: string) => {
    loginMutation.mutate(address);
  }, [loginMutation]);

  const onDisconnectWallet = React.useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <Stack spacing={1} direction="row" alignItems="center">
          <ConnectWallet onConnect={onConnectWallet} onDisconnect={onDisconnectWallet}/>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;