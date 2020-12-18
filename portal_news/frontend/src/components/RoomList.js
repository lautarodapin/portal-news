import React, { Component } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

const QUERY_ROOMS = gql`
	query	{
		allRooms {
			edges {
			  node {
				slug
				nombre
				host {
				  id
				  username
				}
			  }
			}
		  }
	}
  `;

export function RoomList() {
    const { loading, error, data } = useQuery(QUERY_ROOMS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
      <Grid>{
			data && data.allRooms && data.allRooms.edges && data.allRooms.edges.map(
				room =>  ( 
				<Grid>
					<a href={`/chat/rooms/${room.node.slug}/`}>
						<Typography>
							{room.node.slug}
							{room.node.nombre}
							{room.node.host.username}
						</Typography>
					</a>
				</Grid>
				)
			)
        }
      </Grid>
      )
    ;
  }
  export default RoomList;