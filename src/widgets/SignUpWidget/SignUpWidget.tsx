import React from "react";
import { SignInUpTemplate } from "src/shared/ui/SignInUpTemplate/SignInUpTemplate";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SignUpForm } from "src/entities/SIgnUpForm/ui/SignUpForm";
import { Grid } from '@mui/material';
import { Link } from "react-router-dom";



const SignUpWidget = () => {


  return (
    <SignInUpTemplate avatar={<LockOutlinedIcon />} title={'Sign Up'}>
      <SignUpForm />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to="/SignIn">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </SignInUpTemplate>
  )
}

export default SignUpWidget
