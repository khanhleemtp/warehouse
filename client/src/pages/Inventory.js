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

function Inventory() {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [noti, setNoti] = useState("");
  const [from, setFrom] = useState(null);
  const [url, setUrl] = useState("http://127.0.0.1:8000/api/v1/products/");
  const { data: products, isPending, error, setData: setProducts } = useFetch(
    url
  );
  const [to, setTo] = useState(null);
  const [search, setSearch] = useState(false);
  const [errDate, setErrDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from || !to) {
      return setErrDate("Hãy nhập đủ thông tin ngày");
    }
    if (from && to) {
      setProducts(null);
      setUrl(`http://127.0.0.1:8000/api/v1/products?from=${from}&to=${to}`);
      setSearch(true);
      return setErrDate("");
    }
  };

  const history = useHistory();
  // fetch all product

  const handleDelete = async (id) => {
    try {
      await fetch("http://127.0.0.1:8000/api/v1/products/" + id, {
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
      {/* {!isPending && products ? (
        <CSVLink
          data={products?.data}
          filename={"report.csv"}
          headers={headers}
          target="_blank"
        >
          <Button>Tải xuống báo cáo</Button>
        </CSVLink>
      ) : (
        <Typography>Vui lòng lấy thông tin sản phẩm để tải báo cáo</Typography>
      )} */}

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
          type="submit"
        >
          Tìm kiếm
        </Button>
      </form>
      {products && products?.data && products?.data.length && search > 0 ? (
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
                {from && to && search && (
                  <>
                    <TableCell align="right">Nhập kho</TableCell>
                    <TableCell align="right">Xuất kho </TableCell>
                  </>
                )}
                <TableCell align="right">Tồn kho</TableCell>
                <TableCell align="right">Mô tả</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    BT_000{product.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.inPrice}</TableCell>
                  <TableCell align="right">{product.outPrice}</TableCell>
                  {from && to && search && (
                    <>
                      <TableCell align="right">{product.totalIn}</TableCell>
                      <TableCell align="right">{product.totalOut}</TableCell>
                    </>
                  )}
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
