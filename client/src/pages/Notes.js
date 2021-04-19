import {
  Button,
  Typography,
  Container,
  TextField,
  colors,
} from "@material-ui/core";
import React, { useState } from "react";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  btn: {
    display: "flex",
    fontSize: 15,
    color: "#fff",
    "&:hover": {
      backgroundColor: colors.pink[300],
    },
    marginTop: 12,
  },
  title: {
    textDecoration: "underline",
    marginBottom: 20,
  },
  field: {
    marginTop: 16,
    marginBottom: 16,
    display: "block",
  },
  table: {
    marginTop: 12,
  },
});

function Notes() {
  const classes = useStyles();
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [noti, setNoti] = useState("");

  const history = useHistory();
  // fetch all product

  // handle submit create product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      return setError("Hãy nhập tài khoản");
    }
    if (!password) {
      return setError("Hãy nhập mật khẩu");
    }
    if (username && password) {
      setError("");
      fetch("http://127.0.0.1:8000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      })
        .then((res) => {
          // console.log(res.json())
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.status === "error") {
            setError(data.message);
          }
          if (data.status === "success") {
            localStorage.setItem("tokenAdmin", data.token);
            history.push("/inventory");
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  // snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setNoti("");
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" color="secondary" gutterBottom>
        Đăng nhập
      </Typography>
      <Typography variant="h6" component="h6" color="error" gutterBottom>
        {error}
      </Typography>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {noti}
        </Alert>
      </Snackbar>

      {/* Form */}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setUserName(e.target.value)}
          label="Tên khoản"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          className={classes.field}
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Mật khẩu"
          variant="outlined"
          color="secondary"
          type="password"
          fullWidth
          required
          multiline
          className={classes.field}
        />
        <Button
          className={classes.btn}
          variant="contained"
          endIcon={<SendOutlinedIcon />}
          color="secondary"
          type="submit"
        >
          Đăng nhập
        </Button>
      </form>
    </Container>
  );
}

export default Notes;
