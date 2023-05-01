import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
  TextField,
} from "@mui/material";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Actiontypes } from "../Redux/action";
import axios from "axios";

const account = [
  {
    value: "Stock",
    label: "Stock",
  },
  {
    value: "Demat",
    label: "Demat",
  },
  {
    value: "Savings",
    label: "Savings",
  },
];

export const CreateAccount = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const contacts = useSelector((state) => state.data);
  console.log(contacts);
  const dispatch = useDispatch();

  function handleUsers(event) {
    event.preventDefault();

    axios
      .post("http://localhost:5000/api/create", {
        name,
        type,
        code,
        description,
        checked,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const checkAccountName = contacts.find(
      (contact) => contact.name === name && name
    );
    const checkAccountCode = contacts.find(
      (contact) => contact.code === code && code
    );
    if (!name || !code || !type || !description) {
      return toast.error("Please fill in all fields!!");
    }
    if (checkAccountName) {
      return toast.warning("This AccountName already exists!!");
    }
    if (checkAccountCode) {
      return toast.warning("This AccountCode already exists!!");
    }

    const user = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      name,
      code,
      type,
      description,
      checked,
    };
    dispatch({ type: Actiontypes.ADD_ITEMS, payload: user });

    navigate("/user-list");
  }

  return (
    <Box>
      <Grid container justifyContent={"center"}>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          sx={{ marginTop: 1, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <Paper
            sx={{ padding: "17px", height: "fit-content", marginLeft: "7px" }}
          >
            <form onSubmit={handleUsers}>
              <Typography sx={{ fontSize: "20px" }}>Create Account</Typography>
              <Box>
                <label>
                  <Typography
                    mt={5}
                    mb={1}
                    sx={{ fontSize: "16px", color: "#BD4C46" }}
                  >
                    Account Name
                  </Typography>
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ height: "30px", width: "250px" }}
                />
              </Box>

              <Box>
                <label>
                  <Typography mt={3} mb={1} sx={{ fontSize: "16px" }}>
                    Account Code
                    <HelpOutlinedIcon
                      sx={{
                        height: "18px",
                        position: "absolute",
                        marginTop: "2px",
                      }}
                    />
                  </Typography>
                </label>

                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{ height: "30px", width: "250px" }}
                />
              </Box>

              <Box>
                <label>
                  <Typography
                    mt={3}
                    mb={1}
                    sx={{
                      fontSize: "16px",
                      color: "#BD4C46",
                    }}
                  >
                    Account Type
                  </Typography>
                </label>

                <TextField
                  select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  sx={{
                    width: 255,
                    borderRadius: "5px",
                  }}
                >
                  {account.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box>
                <label>
                  <Typography
                    mt={3}
                    mb={1}
                    sx={{ fontSize: "16px", color: "#000" }}
                  >
                    Description
                  </Typography>
                </label>

                <textarea
                  rows={3}
                  cols={25}
                  placeholder="Max 500 characters"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "2px",
                    border: "1px solid gray",
                    fontFamily: "sans-serif",
                    fontSize: "15px",
                  }}
                />
              </Box>

              <Box>
                <Typography mt={3}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onClick={handleCheckboxChange}
                  ></input>
                  <label style={{ fontFamily: "inherit", marginLeft: "5px" }}>
                    Add to the watchlist on my dashboard
                  </label>
                </Typography>
              </Box>

              <Box mt={6}>
                <button
                  style={{
                    height: "40px",
                    width: "65px",
                    backgroundColor: "#CF4B28",
                    color: "white",
                    border: "1px solid #CF4B28",
                    borderRadius: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Save
                </button>

                <button
                  style={{
                    height: "40px",
                    width: "65px",
                    marginLeft: "11px",
                    backgroundColor: "lightgrey",
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                  }}
                >
                  Cancel
                </button>
              </Box>

              <ToastContainer />
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
