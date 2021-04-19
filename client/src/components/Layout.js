import {
  Box,
  Drawer,
  makeStyles,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  AppBar,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import UpdateIcon from "@material-ui/icons/Update";
import { useHistory, useLocation } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useState } from "react";

const drawWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    page: {
      width: "100%",
      padding: theme.spacing(2),
      background: "#f9f9f9",
    },
    drawer: {
      width: drawWidth,
    },
    drawerPaper: {
      width: drawWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawWidth}px)`,
      background:
        "linear-gradient(to right top, #c18448, #ca8447, #d38347, #dc8247, #e58048)",
      // "linear-gradient(to right top, #ff6e9c, #f677b0, #e980c0, #db8acd, #cc93d7)",
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flex: 1,
    },
    avatar: {
      marginLeft: theme.spacing(1),
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const menuItem = [
    {
      text: "Trang chủ",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Thêm sản phẩm",
      icon: <AddCircleOutlined color="secondary" />,
      path: "/create",
    },
    {
      text: "Kho hàng",
      icon: <MenuBookIcon color="secondary" />,
      path: "/inventory",
    },
    {
      text: "Xuất hàng",
      icon: <ShoppingCartIcon color="secondary" />,
      path: "/out",
    },
    {
      text: "Nhập hàng",
      icon: <UpdateIcon color="secondary" />,
      path: "/in",
    },
  ];

  const [err, setErr] = useState("");
  console.log("token", localStorage.getItem("tokenAdmin"));
  return (
    <div className={classes.root}>
      {/* appbar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>
            {/* Today is the {moment().format("LLLL")} */}
          </Typography>
          <Typography variant="h6">Hi</Typography>
          <Avatar className={classes.avatar}>T</Avatar>
        </Toolbar>
      </AppBar>

      {/* side drawler */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            color="secondary"
            align="center"
            paragraph={true}
            className={classes.title}
          >
            VNPost
          </Typography>
        </Box>
        <List>
          {menuItem.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => {
                let token = localStorage.getItem("tokenAdmin");
                if (item.path === "/") {
                  return setErr("");
                }
                if (token == null) {
                  return setErr("Hãy đăng nhập trước khi dùng");
                }
                setErr("");
                history.push({ pathname: item.path });
              }}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {localStorage.getItem("tokenAdmin") ? (
            <ListItem
              button
              onClick={() => {
                localStorage.removeItem("tokenAdmin");
                history.push("/");
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Đăng xuất"} />
            </ListItem>
          ) : null}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Typography variant="h6" color="error">
          {err}
        </Typography>
        {children}
      </div>
    </div>
  );
};

export default Layout;
