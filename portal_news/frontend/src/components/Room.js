import React, { Component } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

const QUERY_ROOMS = gql`
	query	{
		listRooms {
			slug
			nombre
			host	{
				username
			}
		}
	}
  `;

export function Room() {
	let params = useParams();

    return (
      <div>
		  {params.room}
      </div>
      )
    ;
  }
  export default Room;