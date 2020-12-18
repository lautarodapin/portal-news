import React, { Component, useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
export function RoomList() {
	const [room, setRoom] = useState(null);
	const [nombre, setNombre] = useState(null);
	const [roomCreado, setRoomCreado] = useState(null);
	const getRoom = () => fetch(`http://${host}/api/rooms/`).then((r)=>r.json());


	function createRoom(){
		var request = {
			method:"POST",
			headers:{
				'Accept':'application/json',
				'Content-Type': 'application/json',
				'X-CSRFToken': $(token).val(),
			},
			body:JSON.stringify({
				nombre:nombre,
			}),
		};
		fetch(`http://${host}/api/rooms/`, request)
		.then((data)=>data.json())
		.then((data)=>setRoomCreado(data));
	}
	

	useEffect(() => {
		getRoom().then((data) => setRoom(data))
	  }, [])

	function update(event) {
        setNombre(event.target.value);
        if (typeof onChange === "function") {
            onChange(event.target.value);
        }
    }
	if (room == null) return (
		<div>No hay rooms disponibles</div>
	);

	function roomCreated(){
		if (roomCreado == null) return;
		return (
			<div>
				<Button color="success" variant="container" to={`/frontend/rooms/${roomCreado.code}`} component={Link}>Ir al room {roomCreado.nombre}</Button>
			</div>
		);
	}

    return (
		<Grid>{
			room?.map((item)=>(
				<div>
					{item.nombre}
				</div>
			))
			}
			<div>prueba: {nombre}</div>

			<input type="text" name="nombre" id="id_nombre" onChange={update} value={nombre}/>
			<Button color="primary" variant="container" onClick={createRoom}>Crear</Button>

			<div>
				{roomCreated()}
			</div>
		</Grid>
		);
}
export default RoomList;