import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Bot from "./views/Bot";

import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

import "./App.css";
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { user, isLoading, error, loginWithRedirect, logout } = useAuth0();

  console.log("Current user =", user);
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />

        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/bot" component={Bot} />
          </Switch>

        </Container>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
