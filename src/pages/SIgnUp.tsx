import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';


const signUpSchema = z.object({
  login: z.string(),
  email: z.string().email(),
  password: z.string().min(10, "Password must be atleast 10 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword']
})
type signUpSchema = z.infer<typeof signUpSchema>


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="/">
        VigrebuhaTechnology, Inc.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function SignUp() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<signUpSchema>({ resolver: zodResolver(signUpSchema) })

  const navigate = useNavigate()

  const onSubmit = async (data: signUpSchema) => {

    const response = await fetch('https://64f8d138824680fd21801557.mockapi.io/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      // Send your data in the request body as JSON
      body: JSON.stringify(data)
    })
    if (response.ok) {
      alert('Form submited successfully')
      navigate('/Home')
      return
    } else {
      alert('Form submition failed')
      return
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  {...register('login', {
                    required: "login is required"
                  })}
                  autoComplete="login"
                  name="login"

                  fullWidth
                  id="login"
                  label="Login"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('email', {
                    required: "email is required"
                  })}

                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password', {
                    required: "passwrd is required"
                  })}

                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('confirmPassword', {
                    required: "password is required",
                  })}
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                />
                {errors.email && <p className='text-red-500'> {`${errors.email.message}`}</p>}
                {errors.password && <p className='text-red-500'> {`${errors.password.message}`}</p>}
                {errors.confirmPassword && <p className='text-red-500'> {`${errors.confirmPassword.message}`}</p>}
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>

            <Button
              disabled={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
