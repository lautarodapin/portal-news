import React, { Component, useEffect, useState } from "react";
import { GridList, GridListTile,
	Grid, Button, ButtonGroup, Typography, TextField, FormControl } from "@material-ui/core";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useParams,
} from "react-router-dom";
import Chat from './Chat.js';
import ChatUsers from './ChatUsers.js';


export function Room({ws}) {
	let params = useParams(); // params.room
	const [data, setData] = useState(null);
	const [room, setRoom] = useState(null);
	const [messages, setMessages] = useState(new Array());
	const [users, setUsers] = useState(null);
	const getRoom = () => fetch(`http://${host}/api/rooms/?code=${params.room}`)
		.then((data) => data.json());

	useEffect(() => {
		getRoom().then((data) => {
			setRoom(room => data);
			var _ = []
			data[0].messages.forEach((e)=>_.push(e));
			console.log("_", _);
			setMessages(messages=>_);
			console.log("messages", messages);
		});
	}, []);
	ws.onmessage = function (e) {
		const data = JSON.parse(e.data);
		console.log(data);
		if ("data" in data && data.data != null){
			setUsers(data.data.current_users);
		}
		if ("usuarios" in data && data.usuarios != null){
			setUsers(data.usuarios);
		}
		if (data.action === "create" && data.type==="message.activity"){
			// messages.push(data)
			// setMessages(messages)
		}
	}
	ws.onopen = function () {
		ws.send(JSON.stringify({
			action: "subscribe_instance",
			pk: "2",
			request_id: session_key,
		}));
		ws.send(JSON.stringify({
			action: "subscribe_to_messages_in_room",
			pk: "2",
			request_id: session_key,
		}));
		ws.send(JSON.stringify({
			action: "join_room",
			pk: "2",
			request_id: session_key,
		}));
	}
	ws.onclose = function (e) {
		console.error('Chat socket closed unexpectedly');
		setTimeout(() => ws = new WebSocket(socketUrl), 1000 * 10);
	};
	return (
		<div>

			{room?.map((item) => (
				<Grid container spacing={1} alignItems="center" justify="center">
					<Grid container xs={12} align="center">

						<Chat data={item}></Chat>
					</Grid>
					<Grid container xs={12} align="center">
						<FormControl>
							<TextField margin="dense" style={{ margin: 8 }} label="Mensaje" id="text" variant="standard" />
						</FormControl>
					</Grid>
					<Grid container xs={12} align="center">
						<ChatUsers data={users}></ChatUsers>
					</Grid>
				</Grid>
			))}
		</div>
	)
		;
}
export default Room;