import React, { Component, useEffect, useRef, useState } from "react";
import { GridList, GridListTile, List, ListItem, Paper, Card, CardContent, 
	Grid, Button, ButtonGroup, Typography, TextField, FormControl } from "@material-ui/core";
import {BrowserRouter as Router,Switch,Route,Link,Redirect,useParams,
} from "react-router-dom";
import Chat from './Chat.js';
import ChatUsers from './ChatUsers.js';
import { AlwaysScrollToBottom } from "./utils/AlwaysScrollToBottom";

export function Room() {
	let params = useParams(); // params.room
	const room_code = params.room;
	const [room, setRoom] = useState(null);
	const [messages, setMessages] = useState();
	const [users, setUsers] = useState(null);
	const [messageText, setMessageText] = useState(null);
	const [ws, setWs] = useState(()=> new WebSocket(`ws://${host}/ws/messages/`))
	const updateMessageText = (e)=>setMessageText(e.target.value)


	const getRoom = () => fetch(`http://${host}/api/rooms/?code=${room_code}`)
	.then((data) => data.json()).then(data=>{
		setRoom(data[0]);
		setMessages(data[0].messages);
	});
	
	useEffect(() => getRoom(), []);

	useEffect(()=>{
		const listener = event=>event.code==="Enter"?submitMessage():null;
		document.addEventListener("keydown", listener);
		return ()=>document.removeEventListener("keydown", listener)
	}, []);

	const submitMessage = ()=>{
		console.log(messageText)
		ws.send(JSON.stringify({
			action:"create_message",
			message:messageText,
			request_id:session_key,
		}));
		setMessageText(messageText=>"");
	};

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
			// var temp = room[0].messages;
			// temp.push(data)
			// setMessages(temp)
			setMessages(oldMessages=>[...oldMessages, data]);
		}
	}
	ws.onopen = function () {
		if (room != null){
			ws.send(JSON.stringify({
				action: "subscribe_instance",
				pk: room.pk,
				request_id: session_key,
			}));
			ws.send(JSON.stringify({
				action: "subscribe_to_messages_in_room",
				pk: room.pk,
				request_id: session_key,
			}));
			ws.send(JSON.stringify({
				pk: room.pk,
				action: "join_room",
				request_id: session_key,
			}));
		}
	}
	ws.onclose = function (e) {
		console.error('Chat socket closed unexpectedly');
		setTimeout(() => ws = new WebSocket(`ws://${host}/ws/messages/`), 1000 * 10);
	};



	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><Link to={`/frontend/rooms/`}>Rooms</Link></li>
					<li class="breadcrumb-item active" aria-current="page">{room?.nombre}</li>
				</ol>
			</nav>
		<div className="container">
			<h3 className="text-capitalize">
				Room {room?.nombre}, <small className="text-muted">{room?.host.username} is the host</small>
			</h3>
			<div className="row">
				<div className="col-xl-2 col-md-12 col-sm-12">
					<ul class="list-group">
						{users?.map(user=>(
							<li class="list-group-item">{user.username}</li>
							))}
					</ul>

					<div className="form-group mt-5">
						<textarea onChange={(e)=>setMessageText(e.target.value)} value={messageText} className="form-control" rows="3" placeholder="Mensaje"/>
						<button onClick={submitMessage} className="btn btn-lg btn-dark">Enviar</button>
					</div>
				</div>
				<div className="col">
					<div className="card m-2 p-5 " style={{maxHeight: "80vh", overflow: 'auto'}}>
						{messages?.map(msj=>(
							<div className="card mb-3">
								<div className="card-body">
									<Typography>
										{msj.created_at_formatted} {msj.user?.username}: {msj.text}
									</Typography>
								</div>
							</div>
						))}
						<AlwaysScrollToBottom/>
					</div>
				</div>
			</div>
		</div>
		</div>
	);
}
export default Room;