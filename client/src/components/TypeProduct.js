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
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { CSVLink } from "react-csv";
import useFetch from "../hooks/useFetch";
import moment from "moment";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// return forwardRef React Note

const headers = [
  { label: "Tên sản phẩm", key: "name" },
  { label: "Giá nhập", key: "inPrice" },
  { label: "Mô tả", key: "description" },
];

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
    margin: 10,
    display: "block",
  },
  table: {
    marginTop: 12,
  },
  formControl: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  selectEmpty: {
    margin: 10,
  },
  select: {
    minWidth: 200,
  },
  product: {
    margin: 10,
    width: 100,
  },
  total: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 10,
  },
});

function TypeProduct({ type }) {
  const classes = useStyles();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [productChoice, setProductChoice] = useState({});
  const [customer, setCustomer] = useState("");
  const [employee, setEmployee] = useState("");
  const [productsChoice, setProductsChoice] = useState([]);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorQty, setErrorQty] = useState("");
  const [errorEmtpy, setErrorEmpty] = useState("");

  console.log(productsChoice);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [noti, setNoti] = useState("");

  const history = useHistory();
  // let typeInvoice = history.location.pathname;
  let typeInvoice = type;
  console.log(typeInvoice);
  // fetch all product
  const { data: products, isPending, error } = useFetch(
    "http://127.0.0.1:8000/api/v1/products/"
  );

  let typeProduct = typeInvoice === "in" ? "inPrice" : "outPrice";

  console.log(
    productsChoice
      .map((product) => product.quantity * product[typeProduct])
      .reduce((a, b) => a + b, 0)
  );

  // handle submit create product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !customer || !employee) {
      setErrorEmpty("Vui lòng nhập đầy đủ thông tin 👾  ");
    }
    if (title && customer && employee && date && productsChoice) {
      setErrorEmpty("");
      fetch("http://127.0.0.1:8000/api/v1/invoices", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          employee,
          customer,
          type: typeInvoice,
          timeCreate: date,
          history: productsChoice,
          totalPrice: productsChoice
            .map((product) => product.quantity * product[typeProduct])
            .reduce((a, b) => a + b, 0),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNoti("Tạo hóa đơn thành công");
          console.log("data:", data);
          setOpenSnackbar(true);
          history.push("/invoices/" + data.invoiceId);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (id) => {
    const newArr = productsChoice.filter(
      (product) => product.id * 1 !== id * 1
    );
    setProductsChoice(newArr);
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
      {!isPending && (
        <CSVLink
          data={products?.data}
          filename={"report.csv"}
          headers={headers}
          target="_blank"
        >
          <Button>Tải xuống báo cáo</Button>
        </CSVLink>
      )}

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
      <Typography variant="h6" color="error">
        {errorQty}
      </Typography>
      <Typography variant="h6" color="error">
        {errorEmtpy}
      </Typography>
      <Typography variant="h6" color="error">
        {error ? error : null}
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            label="Tiêu đề"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            className={classes.field}
          />

          <TextField
            onChange={(e) => setEmployee(e.target.value)}
            label="Nhân viên"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            className={classes.field}
          />

          <TextField
            onChange={(e) => setCustomer(e.target.value)}
            label="Khách hàng"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            className={classes.field}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            // onChange={(e) => setOutPrice(e.target.value)}
            label="Số lượng trong kho"
            disabled
            variant="outlined"
            color="secondary"
            value={productChoice?.avaiable ? productChoice?.avaiable : 0}
            className={classes.field}
          />

          {/* <div>
              <div>Số lượng trong kho: {productChoice?.avaiable} </div>
            </div> */}

          <TextField
            // onChange={(e) => setOutPrice(e.target.value)}
            label="Kiểu đơn"
            disabled
            variant="outlined"
            color="secondary"
            value={typeInvoice === "in" ? "Nhập hàng" : "Xuất hàng"}
            className={classes.field}
          />
        </div>
        <TextField
          id="date"
          label="Thời gian tạo đơn: "
          type="date"
          defaultValue={date}
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Chọn sản phẩm</InputLabel>
          <Select
            className={classes.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={name}
            onChange={(e) => {
              let id = e.target.value;
              const product = products?.data.filter((p) => p.id === id)[0];
              setName(id);
              if (typeInvoice === "out" && product.avaiable < quantity) {
                return setErrorQty(
                  "Số lượng sản phẩm không vượt quá trong kho"
                );
              }

              setProductChoice({ ...product });
            }}
            autoWidth={true}
          >
            {products?.data.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            // onChange={(e) => setOutPrice(e.target.value)}
            label="Số lượng"
            variant="outlined"
            color="secondary"
            type="number"
            error={errorQty ? true : false}
            value={quantity}
            className={classes.product}
            onChange={(e) => {
              setQuantity(e.target.value);
              if (e.target.value <= 0) {
                setErrorQty("Số lượng sản phẩm phải > 0");
              } else if (
                typeInvoice === "out" &&
                e.target.value > productChoice?.avaiable
              ) {
                setErrorQty("Số lượng sản phẩm xuất không vượt quá trong kho");
              } else {
                setErrorQty("");
              }
              console.log(e.target.value * 1);
              setProductChoice((prev) => ({
                ...prev,
                quantity: e.target.value * 1,
              }));
            }}
          />

          <TextField
            // onChange={(e) => setOutPrice(e.target.value)}
            label="Giá"
            disabled
            variant="outlined"
            color="secondary"
            className={classes.product}
            value={productChoice?.inPrice ? productChoice?.inPrice : " "}
          />

          <Button
            className={classes.btn}
            variant="contained"
            endIcon={<SendOutlinedIcon />}
            color="secondary"
            disabled={
              productChoice?.id && parseInt(quantity) > 0 && !errorQty
                ? false
                : true
            }
            onClick={() => {
              setProductsChoice((prev) => {
                // [...prev, { ...productChoice }]
                if (prev.length === 0) {
                  return [{ ...productChoice }];
                }
                const hasProduct = prev.find(
                  (product) => product.id === productChoice.id
                );
                if (hasProduct) {
                  const newArr = prev.map((product) => {
                    if (product.id === productChoice.id) {
                      if (
                        typeInvoice === "out" &&
                        product.quantity * 1 + productChoice.quantity * 1 >
                          product.avaiable
                      ) {
                        return setErrorQty(
                          "Số lượng sản phẩm trong kho không đủ"
                        );
                      }
                      return {
                        ...productChoice,
                        quantity:
                          product.quantity * 1 + productChoice.quantity * 1,
                      };
                    }
                    return product;
                  });
                  return newArr;
                }
                return [...prev, { ...productChoice }];
              });
              setProductChoice({});
              setName("");
              setQuantity("");
            }}
          >
            Thêm
          </Button>
        </FormControl>

        <Button
          disabled={productsChoice.length > 0 ? false : true}
          className={classes.btn}
          variant="contained"
          endIcon={<SendOutlinedIcon />}
          color="secondary"
          type="submit"
        >
          {typeInvoice === "in" ? "Nhập kho" : "Xuất kho"}
        </Button>
      </form>

      <TableContainer component={Paper} className={classes.table}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell align="right">Mô tả</TableCell>
              <TableCell align="right">Giá mua</TableCell>
              <TableCell align="right">Giá bán</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Thành tiền</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsChoice.length > 0 &&
              productsChoice.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    BT_{product.id}
                  </TableCell>
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell align="right">{product.description}</TableCell>
                  <TableCell align="right">{product.inPrice}</TableCell>
                  <TableCell align="right">{product.outPrice}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">
                    {typeInvoice === "in"
                      ? product.quantity * 1 * product.inPrice
                      : product.quantity * 1 * product.outPrice}
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

      <Typography variant="h4" color="secondary" className={classes.total}>
        {productsChoice && productsChoice.length > 0
          ? `Tổng tiền: ` +
            productsChoice
              .map((product) => product.quantity * product[typeProduct])
              .reduce((a, b) => a + b, 0) +
            ` VND`
          : null}
      </Typography>
    </Container>
  );
}

export default TypeProduct;
