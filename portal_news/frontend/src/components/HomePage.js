import React, { Component } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import RoomList from "./RoomList";
import Room from "./Room";
import NotaPage from "./NotaPage";
import Nota from "./Nota";
import NotaList from "./NotaList";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/frontend/"
            render={() => {
              return (
                <p>Home page</p>
              );
            }}
          />
          <Route exact path="/frontend/rooms/">
            <RoomList />
          </Route>
          <Route exact path="/frontend/rooms/:room/">
            <Room></Room>
          </Route>
          <Route exact path="/frontend/notas/" component={NotaList} />
          <Route exact path="/frontend/crear/nota/" component={NotaPage} />
          <Route exact path="/frontend/nota/:slug/" component={Nota} />
        </Switch>
      </Router>
    );
  }
}
