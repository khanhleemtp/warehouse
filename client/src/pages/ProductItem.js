import {
  Button,
  Typography,
  Container,
  TextField,
  colors,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import AcUnitOutlinedIcon from "@material-ui/icons/AcUnitOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { makeStyles } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// return forwardRef React Note

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
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

function ProductItem() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [outPrice, setOutPrice] = useState(0);
  const [outPriceError, setOutPriceError] = useState(false);

  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const location = useLocation();
  const query = location.pathname.split("/").pop();
  const history = useHistory();

  // handle submit create product
  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(false);
    setPriceError(false);
    setDescriptionError(false);
    setOutPriceError(false);
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
      fetch("http://127.0.0.1:8000/api/v1/products/" + query, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, inPrice: price, description, outPrice }),
      }).then(() => {
        setOpenSnackbar(true);
        history.go(0);
      });
    }
  };

  //   fetch  product
  useEffect(() => {
    const ac = new AbortController();

    let fetchData = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/v1/products/" + query,
          {
            signal: ac.signal,
          }
        );
        if (!res.ok) {
          throw Error("Not found");
        }
        const data = await res.json();
        console.log(data.data);
        const product = data.data;
        setName(product.name);
        setPrice(product.inPrice);
        setDescription(product.description);
        setOutPrice(product.outPrice);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          // auto catches network / connection error
          console.log(err.message, "🧑");
        }
      }
    };
    fetchData();
    return () => {
      // abort both fetches on unmount
      ac.abort();
    };
  }, [query]);

  // snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
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
          Cập nhật thành công
        </Alert>
      </Snackbar>

      {/* Form */}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          label="Tên sản phẩm"
          color="secondary"
          fullWidth
          required
          className={classes.field}
          error={nameError}
          value={name}
        />
        <TextField
          onChange={(e) => setPrice(e.target.value)}
          label="Giá nhập"
          type="number"
          color="secondary"
          required
          className={classes.field}
          error={priceError}
          value={price}
        />
        <TextField
          onChange={(e) => setOutPrice(e.target.value)}
          label="Giá bán"
          type="number"
          color="secondary"
          required
          className={classes.field}
          error={outPriceError}
          value={outPrice}
        />
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          label="Mô tả"
          color="secondary"
          fullWidth
          required
          className={classes.field}
          error={descriptionError}
          value={description}
        />
        <Button
          className={classes.btn}
          variant="contained"
          endIcon={<SendOutlinedIcon />}
          color="secondary"
          type="submit"
        >
          Cập nhật sản phẩm
        </Button>
      </form>
    </Container>
  );
}

export default ProductItem;
