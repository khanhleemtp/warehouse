import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "@loadable/component";
import pMinDelay from "p-min-delay";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";
// import Layout from "./components/Layout";
import ProductItem from "./pages/ProductItem";
import Loading from "./components/Loading";
import InvocePage from "./pages/InvocePage";

const Layout = lazy(() => pMinDelay(import("./components/Layout"), 500));
const Notes = lazy(() => pMinDelay(import("./pages/Notes"), 500));
const Create = lazy(() => pMinDelay(import("./pages/Create"), 500));
const Inventory = lazy(() => pMinDelay(import("./pages/Inventory"), 500));
const InProduct = lazy(() => pMinDelay(import("./pages/InProduct"), 500));
const OutProduct = lazy(() => pMinDelay(import("./pages/OutProduct"), 500));

// overide default themes
const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[400],
    },
    secondary: {
      main: pink[400],
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

console.log(`${process.env.PUBLIC_URL}`);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            <Layout>
              <Route exact path="/">
                <Notes />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/products/:id">
                <ProductItem />
              </Route>
              <Route path="/inventory">
                <Inventory />
              </Route>
              <Route path="/invoices/:id">
                <InvocePage />
              </Route>
              <Route path="/in">
                <InProduct />
              </Route>
              <Route path="/out">
                <OutProduct />
              </Route>
            </Layout>
          </Switch>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;