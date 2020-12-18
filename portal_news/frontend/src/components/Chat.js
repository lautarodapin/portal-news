import React, { Component, useState, useEffect} from "react";
import { Grid, Paper,Button, ButtonGroup, Typography, Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";
/*
*
*/
function Chat({data}) { // se puede usar props sin llaves tmb
	const params = useParams(); // contiene los parametros del url
	console.log(data);
	return (
		<Paper>
			{data?.messages.map((msj)=>
				(<div>
					<Card variant="outlined" className="mb-5" id={msj.id}>
						<CardContent>
							<Typography>
								{msj.created_at_formatted} {msj.user.username}: {msj.text}
							</Typography>
						</CardContent>
					</Card>
				</div>)
			)}
		</Paper>
	);
}
export default Chat;