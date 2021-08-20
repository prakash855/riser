import React, { useEffect, useState } from "react";
// import Loader from "react-loader-spinner";
import "./User.css";
import {
  Button,
  Input,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const User = () => {
  const [userData, setUserData] = useState({});
  const [inputData, setInputData] = useState("");

  console.log(userData);

  const onchangeHandler = (e) => {
    setInputData(e.target.value);
  };
  async function fetchUser() {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${inputData}`
    );
    const user = await response.json();
    // waits until the request completes...
    setUserData(user.items);
  }
  useEffect(() => {
    fetchUser();
  }, []);

  console.log(inputData);

  const submitHandler = (e) => {
    e.preventDefault();
    fetchUser();
    setInputData("");
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  return (
    <div className="form">
      <h1 style={{ marginBottom: "2rem" }}>Enter Search Text</h1>
      <form onClick={submitHandler}>
        <div className="header">
          <Input
            style={{ marginRight:"2rem" }}
            type="text"
            onChange={onchangeHandler}
            value={inputData}
          />
          <Button variant="contained" color="primary">
            Search
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ color: "white" }}>
              <TableRow style={{ background: "teal", fontWeight: "700" }}>
                <TableCell align="left">Sr. No.</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Stars</TableCell>
                <TableCell align="left">Forks</TableCell>
              </TableRow>
            </TableHead>
            {userData?.length > 0 && (
              <TableBody>
                {userData.map((row, id) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {id + 1}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.stargazers_count}</TableCell>
                    <TableCell align="left">{row.forks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </form>
    </div>
  );
};

export default User;
