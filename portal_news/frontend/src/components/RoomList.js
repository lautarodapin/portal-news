import React, { Component, useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";


const Room = (props) => {
	const room = props.room;
	const host = room.host;
	const current_users = room.current_users;
	const code = room.code;
	return (
		<div className="card m-1 p-1 mb-3">
			<div className="card-header">
				{host.username}'s room
		</div>
			<div className="card-body">
				<ul class="list-group list-group-flush">
					<li class="list-group-item">
						Room "{room.nombre}"
					</li>
					{current_users?.map(user => (
						<li class="list-group-item">
							{user.username}
						</li>
					))}
				</ul>
				<Link className="btn btn-dark mt-3" to={`/frontend/rooms/${code}`}>Ingresar</Link>
			</div>
		</div>

	);
};

const RoomForm = (props) => {
	const [nombre, setNombre] = useState("")
	const submitHandler = () => {
		fetch(`http://${host}/api/rooms/`, {
			method: "POST",
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRFToken': $(token).val(), },
			body: JSON.stringify({ nombre: nombre })
		})
			.then(response => response.json())
			.then(data => { console.log(data); props.onChange(data); }, (error) => null);
	};
	return (
		<div className="form-group">
			<label>
				Nombre: 
			<input type="text" className="form-control" onChange={(e) => setNombre(e.target.value)} value={nombre} />
			</label>
			<button onClick={submitHandler} className="m-3 btn btn-lg btn-dark">Crear</button>
		</div>
	);
};
export function RoomList() {

	const [room, setRoom] = useState(null);
	const [nombre, setNombre] = useState(null);
	const [roomCreado, setRoomCreado] = useState(null);
	useEffect(() => getRoom(), []);

	const getRoom = () => fetch(`http://${host}/api/rooms/`).then((r) => r.json()).then(data => setRoom(room => data));
	if (room == null) return (
		<div>Cargando...</div>
	);
	const newRoom = (data) => { setRoom((room => [data, ...room])) };
	return (
		<Grid>{
			room?.map((item) => (
				<Room room={item} />
			))
		}
			<RoomForm onChange={newRoom} />
		</Grid>
	);
}
export default RoomList;