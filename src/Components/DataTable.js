import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { Actiontypes } from '../Redux/action';

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});


const DataTable = () => {
    const contacts = useSelector((state) => state.data);
    const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/users"); 
        dispatch({
          type: Actiontypes.FETCH_DATA_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
       
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);


  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
           {contacts.map((row) => (
            <TableRow key={row._id} onClick={() => handleRowClick(row)}>
               {/* <TableCell component="th" scope="row">{row._id}</TableCell>  */}
              {/* <TableCell>{row.name}</TableCell> */}
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.password}</TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
      {selectedRow && (
        <div>
          <p>Selected Row: {selectedRow.email}</p>
        </div>
      )}
    </TableContainer>
  );
};

export default DataTable;
