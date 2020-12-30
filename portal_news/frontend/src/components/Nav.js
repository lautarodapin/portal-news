import React, { Component, useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography, Box, Card, CardContent, CardMedia, CardActionArea, CardActions, IconButton, CardHeader, Paper, Divider, FormControl, Input } from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import Comentario from "./Comentario";
import parse from 'html-react-parser';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
 
export function  Nav(props) {
    let location = useLocation();
    const logged_out_nav = (
      <ul>
        <li>
          <Link to="/frontend/login/">Login</Link>
        </li>
      </ul>
    );
  
    const logged_in_nav = (
      <ul>
        <li onClick={props.handle_logout}>logout</li>
      </ul>
    );
    return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}
export default Nav;
