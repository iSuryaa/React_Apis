import { Grid, Paper, Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./UserList.css";
import { Actiontypes } from "../Redux/action";
import { useEffect } from "react";
import axios from "axios";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
  },
}));

export const UserList = () => {
  const contacts = useSelector((state) => state.data);
  const dispatch = useDispatch();
 
 const deleteAccount = (id) => {
    axios
      .delete(`http://localhost:5000/api/delete/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));

    dispatch({ type: Actiontypes.DELETE_CONTACT, payload: id });
 };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items"); 
        dispatch({
          type: Actiontypes.FETCH_CONTACTS_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        // dispatch({
        //   type: Actiontypes.FETCH_CONTACTS_FAILURE,
        //   payload: error.message,
        // });
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

 
  

  return (
    <div>
      <Typography
        sx={{
          mt: 3,
          textAlign: "center",
          fontSize: "35px",
          fontFamily: "sans-serif",
        }}
      >
        Account Datas
      </Typography>
      <Box>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={8}
            md={7}
            sx={{
              marginTop: 3,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Paper
              sx={{
                padding: "17px",
                height: "fit-content",
                width: "max-content",
                ml: 20,
              }}
            >
              <Link to="/">
                <button
                  style={{
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#CF4B28",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    <AddIcon
                      sx={{ position: "relative", top: "3px", height: "20px" }}
                    />
                    Add user
                  </Typography>
                </button>
              </Link>

              <Link to="/movies">
                <button
                  style={{
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#CF4B28",
                    color: "white",
                    borderRadius: "5px",
                    marginTop: 3,
                    float: "right",
                  }}
                >
                  {" "}
                  <Typography sx={{ fontWeight: "bold" }}>Movies</Typography>
                </button>
              </Link>

              <div>
                <table style={{ marginTop: 5, width: "100%" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#CF4B28", color: "white" }}>
                      <th>id</th>
                      <th>Account Name</th>
                      <th>Account Code</th>
                      <th>Account Type</th>
                      <th>Description</th>
                      <th>status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.length > 0 ? (
                      contacts.map((contact, id) => (
                        <tr key={id}>
                          <td>{id + 1}</td>
                          <td>{contact.name}</td>
                          <td>{contact.code}</td>
                          <td>{contact.type}</td>
                          <td>{contact.description}</td>
                          <td>{contact.checked ? "Accepted" : "Rejected"}</td>

                          <td>
                            <Link to={`/edit/${contact._id}`}>
                              <button
                                style={{
                                  border: "none",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "#CF4B28",
                                  }}
                                >
                                  <BootstrapTooltip
                                    title="Edit"
                                    placement="top-start"
                                    arrow
                                  >
                                    <EditIcon sx={{ cursor: "pointer" }} />
                                  </BootstrapTooltip>
                                </Typography>
                              </button>
                            </Link>

                            <button
                              type="button"
                              style={{ border: "none" }}
                              onClick={() => deleteAccount(contact._id)}
                            >
                              <Typography
                                sx={{
                                  color: "#CF4B28",
                                }}
                              >
                                <BootstrapTooltip
                                  title="Delete"
                                  placement="top-start"
                                  arrow
                                >
                                  <DeleteIcon sx={{ cursor: "pointer" }} />
                                </BootstrapTooltip>
                              </Typography>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <th>No contacts found</th>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
