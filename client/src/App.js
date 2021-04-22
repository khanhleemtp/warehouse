import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "@loadable/component";
import pMinDelay from "p-min-delay";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { pink, yellow } from "@material-ui/core/colors";
// import Layout from "./components/Layout";
import ProductItem from "./pages/ProductItem";
import Loading from "./components/Loading";
import InvocePage from "./pages/InvocePage";
import ProtectedRoute from "./hoc/ProtectedRoute";

const Layout = lazy(() => pMinDelay(import("./components/Layout"), 500));
const Notes = lazy(() => pMinDelay(import("./pages/Notes"), 500));
const Create = lazy(() => pMinDelay(import("./pages/Create"), 500));
const Inventory = lazy(() => pMinDelay(import("./pages/Inventory"), 500));
const InProduct = lazy(() => pMinDelay(import("./pages/InProduct"), 500));
const OutProduct = lazy(() => pMinDelay(import("./pages/OutProduct"), 500));
const Home = lazy(() => pMinDelay(import("./pages/Home"), 500));

// overide default themes
const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[400],
    },
    secondary: {
      main: yellow[900],
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightMedium: 600,
    fontWeightRegular: 500,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            <Layout>
              <Route
                exact
                path="/"
                render={(props) => {
                  if (!localStorage.getItem("tokenAdmin")) {
                    return <Notes {...props} />;
                  } else {
                    return <Redirect to="home" />;
                  }
                }}
              />

              <ProtectedRoute component={Create} path="/create" />
              {/* <Route path="/create">
                <Create />
              </Route> */}
              <ProtectedRoute component={Home} path="/home" />

              <ProtectedRoute component={ProductItem} path="/products/:id" />
              {/* <Route path="/products/:id">
                <ProductItem />
              </Route> */}
              <ProtectedRoute component={Inventory} path="/inventory" />
              {/* <Route path="/inventory">
                <Inventory />
              </Route> */}
              <ProtectedRoute component={InvocePage} path="/invoices/:id" />
              {/* <Route path="/invoices/:id">
                <InvocePage />
              </Route> */}
              <ProtectedRoute component={InProduct} path="/in" />
              <ProtectedRoute component={OutProduct} path="/out" />

              {/* <Route path="/in">
                <InProduct />
              </Route> */}
              {/* <Route path="/out">
                <OutProduct />
              </Route> */}
            </Layout>
          </Switch>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
