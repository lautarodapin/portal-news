import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import RoomList from "./RoomList";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
			<HomePage />
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
