"use client"
import React from 'react';
import { styled, Container, Box } from "@mui/material";

import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import { useAuthStore } from '@/app/_zustand/store';
import { useRouter } from 'next/navigation'
import { SystemSecurityUpdateWarningSharp } from '@mui/icons-material';

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
  marginTop: '70px',
}));

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuthStore();
  const router = useRouter();
  React.useEffect(() => {
    if (user?.token)
      router.push('/');
    else router.push('/login');
  }, [router, user])

  return (
    <MainWrapper className="mainwrapper">
      <Header />
      <PageWrapper className="page-wrapper">
        <Sidebar/>
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}

AppLayout.displayName = 'AppLayout';
export default AppLayout;