import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

const useStyles = makeStyles({
  btn: {
    fontSize: 18,
    backgroundColor: "violet",
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
  table: {
    marginTop: 12,
  },
});

export default function FormDialog({
  history,
  product,
  handleClickOpen,
  handleClose,
  open,
}) {
  const classes = useStyles();
  console.log(product);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  // handle submit create product
  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(false);
    setPriceError(false);
    setDescriptionError(false);
    if (name === "") {
      setNameError(true);
    }
    if (price <= 0) {
      setPriceError(true);
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
        body: JSON.stringify({ name, price, description }),
      }).then(() => {
        history.go(0);
      });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Chi tiết sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText>Cập nhật sản phẩm</DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
