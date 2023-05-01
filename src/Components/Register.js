import React,{useState} from 'react'
import axios from 'axios'
import { Paper,Grid,Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { Actiontypes } from '../Redux/action';


const Register = () => {
  // const contacts = useSelector((state) => state.data);
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios
      .post("http://localhost:5000/auth", {
        email,password
      })
      .then((res) => {
        console.log(res.data);      
      })
      .catch((err) => {
        console.log(err);   
      });
      console.log(`Registering email ${email} and password ${password}`);
     
      // const checkAccountName = contacts.find(
      //   (contact) => contact.email === email && email
      // );

      // if (!checkAccountName) {
      //   return alert("This AccountName already exists!!");
      // }
     
      // const user = {
      
      //   email,
      //   password
      // };
      //  dispatch({ type: Actiontypes.AUTH_ITEMS, payload: user });
      navigate('/login')
    }

  return (
    <Box>
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} sm={8} md={5} sx={{ marginTop: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <Paper
          sx={{ padding: '17px', height: 'fit-content', marginLeft: '7px' }}
        >
        <h2>Regiser Page</h2>
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
    </Box>
  )
}

export default Register;