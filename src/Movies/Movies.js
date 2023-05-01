import {
  Card,
  Grid,
  CardMedia,
  Typography,
  CardContent
} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import Image from "./Notebook.jpeg";
import axios from "axios";
import { useEffect } from "react";
import { fetchItem } from "../Redux/action";



export const Movies = () => {

  const carts = useSelector((state) => state.carts);
  const dispatch = useDispatch();


  const fetchItems = async () => {
    const response = await axios
      .get(`https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies`)
      .then((response) => response.data);

    dispatch(fetchItem(response));
  };

  fetchItems()

  useEffect(() => {
    fetchItem()
  },[])


  return (
    <div style={{height:'670px',backgroundColor:'black'}}>

      <div style={{ height: 70, backgroundColor: 'rgb(209 22 22)', marginTop: '-20px' }}>
        <p style={{ position: 'relative', top: '24px', marginLeft: '40px', textAlign: 'left', fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Movies</p>
      </div>
      {/* surya */}
      <Grid sx={{ flexGrow: 1, mt: 5, }} container>
        <Grid item xs={12}>
          <Grid container justifyContent="center"  spacing={1.5}>

            {carts &&
              carts.map((item, index) => (
                <Grid key={index} item>

                  <Card className='card' sx={{
                    cursor: 'pointer', width: "350", backgroundColor: 'rgb(209 22 22)', textAlign: 'center', ':hover': {
                      transform: 'scale(1.1)', transition: 'all 0.3s'
                    },
                   }}>
                    <CardMedia component="img"
                      height="350"
                      image={item.Poster ? item.Poster : Image} alt={item.Title} />

                    <CardContent>

                      <Typography variant="body2" color="white" fontWeight={"bold"} fontSize={"large"}>
                        {item.Title}
                      </Typography>

                      <Typography variant="body2" color="white" fontWeight={"bold"}>
                        {item.Year}
                      </Typography>

                      <Typography variant="body2" color="white" >
                        Runtime: {item.Runtime}
                      </Typography>

                    </CardContent>

                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <div style={{ height: 55, backgroundColor: 'rgb(209 22 22)', marginTop: '50px',fontFamily:'none' }}>
        <p style={{ position: 'relative',top:'5px', marginLeft: '40px', textAlign: 'center', color: 'white' }}>Copyright&#169;Movies.com 2020-2023 </p>
        <p style={{ position: 'relative', bottom:'4px',marginLeft: '40px', textAlign: 'center', color: 'white' }}>Powered by React.</p>
      </div>
    </div >
  )
}
