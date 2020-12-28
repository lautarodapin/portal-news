import React, { Component, useEffect, useRef, useState } from "react";
import { GridList, GridListTile, List, ListItem, Paper, Card, CardContent, 
	Grid, Button, ButtonGroup, Typography, TextField, FormControl, useScrollTrigger } from "@material-ui/core";
import {BrowserRouter as Router,Switch,Route,Link,Redirect,useParams,
} from "react-router-dom";
import { AlwaysScrollToBottom } from "./utils/AlwaysScrollToBottom";

export function NotaPage() {
    let params = useParams(); 
    
    const [imagen, setImagen] = useState(null)
    const [imagenes, setImagenes] = useState(null);
    useEffect(()=>getImagenes(), []);
    const uploadFile = (e)=>{
        setImagen(e.target.files[0])
        const formData = new FormData()
        formData.append("imagen", e.target.files[0])
        fetch(`/api/imagen/`, {
            method:"POST", 
            body:formData,
        }).then(r=>r.json()).then(data=>console.log(data)) // {imagen:"url"}
        setImagen(null);
        
    }
    const getImagenes = ()=>fetch('/api/imagen/').then(r=>r.json()).then(data=>setImagenes(data));
	return (
        <div>
            <input type="file" value={imagen} onChange={(e) => uploadFile(e)}  />
            {/* <button onClick={uploadFile}>subir</button> */}
            {imagenes?.map(imagen=>(
                <img src={imagen.imagen} alt=""/>
            ))}
		</div>
	);
}
export default NotaPage;