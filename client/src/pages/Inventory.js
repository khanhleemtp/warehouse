import {
  Button,
  Typography,
  Container,
  colors,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";

import Paper from "@material-ui/core/Paper";
import { DeleteOutlineOutlined, CreateOutlined } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// import { CSVLink } from "react-csv";
import useFetch from "../hooks/useFetch";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Report from "../components/Report";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// return forwardRef React Note

// const headers = [
//   { label: "Tên sản phẩm", key: "name" },
//   { label: "Giá nhập", key: "inPrice" },
//   { label: "Giá bán", key: "outPrice" },
//   { label: "Số lượng", key: "avaiable" },
//   { label: "Mô tả", key: "description" },
// ];

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

const currencies = [
  {
    value: "0,10",
    label: " Ít hơn 10",
  },
  {
    value: "20,50",
    label: "Từ 20 đến 50",
  },
  {
    value: "50,100",
    label: "Từ 50 đến 100",
  },
  {
    value: "100,10000",
    label: "Lớn hơn 100",
  },
];

function Inventory() {
  let baseUrl = `http://127.0.0.1:8000/api/v1/products`;
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [noti, setNoti] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [errDate, setErrDate] = useState("");
  const [name, setName] = useState("");
  const [avaiable, setAvaiable] = useState("");
  const [url, setUrl] = useState(`${baseUrl}?avaiable[gt]=0&avaiable[lt]=10`);
  const { data: products, isPending, error, setData: setProducts } = useFetch(
    url
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts(null);
    let arrAvaiable = avaiable.split(",");
    console.log("arr", arrAvaiable);
    setUrl(
      `${baseUrl}?avaiable[gt]=${arrAvaiable[0] * 1}&avaiable[lt]=${
        arrAvaiable[1] * 1
      }&name=${name}&from=${from}&to=${to}`
    );
  };

  const history = useHistory();
  // fetch all product

  const handleDelete = async (id) => {
    try {
      await fetch(`${baseUrl}/` + id, {
        method: "DELETE",
      });
      setOpenSnackbar(true);
      setNoti("Xóa sản phẩm thành công");
      history.go(0);
    } catch (err) {
      console.log(err);
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
        Kho hàng
      </Typography>
      <Typography variant="h6" component="h6" color="error" gutterBottom>
        {errDate}
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="date"
          label="Nhập từ: "
          type="date"
          defaultValue={from}
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setFrom(e.target.value);
          }}
        />
        <TextField
          id="date"
          label="Đến ngày: "
          type="date"
          defaultValue={to}
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setTo(e.target.value);
          }}
        />
        <Button
          className={classes.btn}
          variant="contained"
          endIcon={<SendOutlinedIcon />}
          color="secondary"
          disabled={from && to ? false : true}
          onClick={() => {
            setProducts(null);
            if (from && to) {
              setProducts(null);
              setUrl(`${baseUrl}?from=${from}&to=${to}`);
            }
          }}
        >
          Tìm kiếm
        </Button>

        <TextField
          className={classes.field}
          id="standard-multiline-static"
          label="Tìm theo tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          className={classes.btn}
          variant="contained"
          endIcon={<SendOutlinedIcon />}
          color="secondary"
          disabled={name ? false : true}
          onClick={() => {
            setProducts(null);
            setUrl(`${baseUrl}?name=${name}`);
          }}
        >
          Tìm kiếm
        </Button>
        <TextField
          id="standard-select-currency"
          select
          label="Tồn kho"
          style={{
            paddingLeft: 40,
          }}
          value={avaiable}
          onChange={(e) => setAvaiable(e.target.value)}
          helperText="Kiểm tra hàng tồn"
          className={classes.field}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          className={classes.btn}
          variant="contained"
          endIcon={<SendOutlinedIcon />}
          color="secondary"
          disabled={avaiable ? false : true}
          onClick={() => {
            setProducts(null);
            let arrAvaiable = avaiable.split(",");
            console.log("arr", arrAvaiable);
            setUrl(
              `${baseUrl}?avaiable[gt]=${arrAvaiable[0] * 1}&avaiable[lt]=${
                arrAvaiable[1] * 1
              }`
            );
          }}
        >
          Tìm kiếm
        </Button>

        <Button
          className={classes.btn}
          variant="contained"
          endIcon={<SendOutlinedIcon />}
          color="secondary"
          disabled={avaiable && name && from && to ? false : true}
          type="submit"
        >
          Tìm kiếm theo tất cả tùy chọn
        </Button>
      </form>
      {products && products?.data && products?.data.length > 0 ? (
        <Button>
          <PDFDownloadLink
            document={<Report productsList={products.data} />}
            fileName="report.pdf"
            style={{
              padding: 12,
              textDecoration: "none",
            }}
          >
            {({ loading }) => (loading ? "Loading ..." : "Tải báo cáo ngay")}
          </PDFDownloadLink>
        </Button>
      ) : null}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {noti}
        </Alert>
      </Snackbar>

      {error && <h4>{error}</h4>}
      {isPending && !products ? (
        <div>Loading.....</div>
      ) : (
        <TableContainer component={Paper} className={classes.table}>
          <Typography align="center" variant="h5">
            Các mặt hàng{" "}
          </Typography>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mã sản phẩm</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell align="right">Giá mua</TableCell>
                <TableCell align="right">Giá bán</TableCell>
                <TableCell align="right">Nhập kho</TableCell>
                <TableCell align="right">Xuất kho </TableCell>

                <TableCell align="right">Tồn kho</TableCell>
                <TableCell align="right">Mô tả</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    BT_{product.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.inPrice}</TableCell>
                  <TableCell align="right">{product.outPrice}</TableCell>
                  <TableCell align="right">{product.totalIn}</TableCell>
                  <TableCell align="right">{product.totalOut}</TableCell>
                  <TableCell align="right">{product.avaiable}</TableCell>
                  <TableCell align="right" title={product.description}>
                    {product.description}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleDelete(product.id)}
                      title="Xóa sản phẩm"
                    >
                      <DeleteOutlineOutlined />
                    </Button>
                    <Button
                      onClick={() => history.push("/products/" + product.id)}
                      title="Chi tiết sản phẩm"
                    >
                      <CreateOutlined />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Inventory;
