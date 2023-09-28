
import { Avatar, Box, Container, CssBaseline, Typography } from "@mui/material";
import React, { ReactNode } from "react";


type SignInUpTemplateProps = {
  avatar: ReactNode
  title: ReactNode
  children: ReactNode
};

export const SignInUpTemplate = (props: SignInUpTemplateProps) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {props.avatar}
        </Avatar>
        <Typography component="h1" variant="h5">
          {props.title}
        </Typography>
        {props.children}
      </Box>
    </Container>)
};
