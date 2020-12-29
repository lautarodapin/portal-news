import React, { Component, useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography, Box, Card, CardContent, CardMedia, CardActionArea, CardActions, IconButton, CardHeader } from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import parse from 'html-react-parser';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

export function NotaList() {
	const [notas, setNotas] = useState(null);
	useEffect(()=>getNotas(), []); // ! la lista vacia hace que solo se ejecute en el inicio
	const getNotas = ()=>fetch(`/api/nota/`).then(r=>r.json()).then(data=>setNotas(data));

	
	return (
		<div className="container-fluid">
			<div className="jumbotron jumbotron-fluid">
				<Grid container justify="center" alignItems="center">
					<Typography variant="h2">
						Cree una nueva nota <Link to="/frontend/crear/nota/">aqui</Link>
					</Typography>
				</Grid>
			</div>
			<div className="container mt-2">
				<Grid container spacing={2} direction="row">
						{notas?.map(nota=>(
						<Grid key={nota.id} item xs={12} md={4} xl={3} >
							<Box component="span" display="block">
								<Card>
									<CardHeader title={nota.titulo} subheader={nota.created_at}  />
									{/* <CardActionArea> */}
										<CardContent className="text-truncate">
											<Typography paragraph>
												{parse(nota.cuerpo, {replace: node=>{
													if (node.tagName === "img") return <span></span> //? Reemplaza las imagenes
												}})}
											</Typography>
										</CardContent>
										<CardActions disableSpacing>
											<IconButton>
												<Link to={`/frontend/nota/${nota.slug}`}>
													<KeyboardArrowRightIcon/>
												</Link>
											</IconButton>
										</CardActions>
									{/* </CardActionArea> */}
								</Card>
							</Box>
						</Grid>
						))}
				</Grid>
			</div>
		</div>
	);
}
export default NotaList;