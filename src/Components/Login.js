import React,{useState} from 'react'
import axios from 'axios'
import { Paper,Grid,Box } from '@mui/material';
import { useNavigate } from 'react-router';
import {ToastContainer,toast} from "react-toastify";

const Login = () => {


  const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios
      .post("http://localhost:5000/auth/login", {
        email,password
      })
      .then((res) => {
        console.log(res.data);
        navigate('/data-table')
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {      
          return toast.error("Incorrect password. Please try again.");
        } else {
           return toast.error("Please check your email and password");
         }
      });
      console.log(`Submitting email ${email} and password ${password}`);
      

      
    }

  return (
    <Box>
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} sm={8} md={5} sx={{ marginTop: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <Paper
          sx={{ padding: '17px', height: 'fit-content', marginLeft: '7px' }}
        >
        <h2>Login</h2>
    <form onSubmit={handleSubmit}>
    <input
      label="Email"
      placeholder='Email'
      type="email"
      value={email}
      style={{height:'34px',width:'260px',border:'1px solid lightgray',borderRadius:'7px'}}
      onChange={(event) => setEmail(event.target.value)}
      required
    /><br/><br/>
    <input
      label="Password"
      type="password"
      placeholder='Password'
      value={password}
      style={{height:'34px',width:'260px',border:'1px solid lightgray',borderRadius:'7px'}}
      onChange={(event) => setPassword(event.target.value)}
      required
    /><br/><br/>
    <button type="submit"   style={{height:'34px',width:'268px',backgroundColor:'#1877F2',border:'none',borderRadius:'7px',color:'white'}}>Login</button>
  </form>
  </Paper>
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  )
}

export default Login;