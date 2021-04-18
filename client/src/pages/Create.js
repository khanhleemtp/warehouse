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
    "&:hover": {
      backgroundColor: colors.pink[400],
    },
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

function Create() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [outPrice, setOutPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [outPriceError, setOutPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [noti, setNoti] = useState("");

  const history = useHistory();
  // fetch all product

  // handle submit create product
  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(false);
    setPriceError(false);
    setOutPriceError(false);
    setDescriptionError(false);
    if (name === "") {
      setNameError(true);
    }
    if (price <= 0) {
      setPriceError(true);
    }
    if (outPrice <= 0) {
      setOutPriceError(true);
    }
    if (description === "") {
      setDescriptionError(true);
    }
    if (name && price && description) {
      console.log(name, price, description);
      fetch("http://127.0.0.1:8000/api/v1/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          inPrice: price,
          outPrice: outPrice,
          description: description,
        }),
      })
        .then(() => {
          setNoti("Thêm sản phẩm thành công");
          setOpenSnackbar(true);
          history.push("/inventory");
        })
        .catch((err) => console.log(err));
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
      <Typography variant="h6" component="h2" color="secondary" gutterBottom>
        Thêm sản phẩm
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
          onChange={(e) => setName(e.target.value)}
          label="Tên sản phẩm"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          className={classes.field}
          error={nameError}
        />
        <TextField
          onChange={(e) => setPrice(e.target.value)}
          label="Giá nhập"
          variant="outlined"
          color="secondary"
          type="number"
          required
          className={classes.field}
          error={priceError}
        />
        <TextField
          onChange={(e) => setOutPrice(e.target.value)}
          label="Giá bán"
          variant="outlined"
          color="secondary"
          type="number"
          required
          className={classes.field}
          error={outPriceError}
        />
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          label="Mô tả"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          className={classes.field}
          error={descriptionError}
        />
        <Button
          className={classes.btn}
          variant="contained"
          endIcon={<SendOutlinedIcon />}
          color="secondary"
          type="submit"
        >
          Thêm sản phẩm
        </Button>
      </form>
    </Container>
  );
}

export default Create;
