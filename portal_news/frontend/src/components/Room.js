import React, { Component, useEffect, useState } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
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


export function Room() {
	let params = useParams(); // params.room
	const [room, setRoom] = useState(null);
	const getRoom = ()=>fetch(`http://${host}/api/rooms/?code=${params.room}`)
		.then((data)=>data.json());

	useEffect(()=>{
		getRoom().then((data)=>setRoom(data));
	}, []);

    return (
      <div>
		  
		  {room?.map((item)=>(
			  <div>
				<div>
					{item.code}
				</div>
				<ChatUsers data={item}></ChatUsers>
				<Chat data={item}></Chat>  
			  </div>
		  ))}
      </div>
      )
    ;
  }
  export default Room;