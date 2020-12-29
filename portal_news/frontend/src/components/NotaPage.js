import React, { Component, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
    GridList, GridListTile, List, ListItem, Paper, Card, CardContent,
    Grid, Button, ButtonGroup, Typography, TextField, FormControl, useScrollTrigger
} from "@material-ui/core";
import {
    BrowserRouter as Router, Switch, Route, Link, Redirect, useParams,
} from "react-router-dom";
import { AlwaysScrollToBottom } from "./utils/AlwaysScrollToBottom";


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function NotaPage() {
    let params = useParams();
    const [imagen, setImagen] = useState(null)
    const [imagenes, setImagenes] = useState(null);
    const [value, setValue] = useState('');
    var editor = useRef(null);
    var editorRef = useRef(null);
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    };
    useEffect(() => getImagenes(), []);
    // useEffect(()=>{
    //     editorRef = editor.current.getEditor();
    //     console.log(editorRef)
    // }, []);
    const uploadFile = (e) => {
        setImagen(e.target.files[0])
        const formData = new FormData()
        formData.append("imagen", e.target.files[0])
        fetch(`/api/imagen/`, {
            method: "POST",
            body: formData,
        }).then(r => r.json()).then(data => console.log(data)) // {imagen:"url"}
        setImagen(null);

    }
    const getImagenes = () => fetch('/api/imagen/').then(r => r.json()).then(data => setImagenes(data));

    const submitEditor = ()=>{
        var html = editorRef.getHTML()
        fetch("/api/test/", {
            method:"post", 
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRFToken': $(token).val(), },
            body:JSON.stringify({
                html:html,
            })
        })

    };
    const editorChange = (e)=>{
        setValue(e)
        const parser = new DOMParser()
        const doc = parser.parseFromString(e, 'text/html')
        var img = doc.querySelector("img")
        console.log(img.getAttribute("src"))
        
    };
    return (
        <div>
            <input type="file" value={imagen} onChange={(e) => uploadFile(e)} />
            {imagenes?.map(imagen => (
                <img src={imagen.imagen} alt="" />
            ))}

            <div id="markdown">
            <ReactQuill ref={(ele)=>{if(ele){editor=ele.getEditor(); editorRef=ele.makeUnprivilegedEditor(ele.getEditor())}}} theme="snow" value={value} onChange={(e) => editorChange(e)} formats={formats} modules={modules} />
            <button onClick={submitEditor}>AASD</button>
            </div>
        </div>
    );
}
export default NotaPage;