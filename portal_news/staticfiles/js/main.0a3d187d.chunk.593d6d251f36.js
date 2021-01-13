(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{121:function(e,t){var n="https:"===window.location.protocol?window.location.host:"localhost:8000",c=(window.location.protocol,window.location.protocol);"".concat(c,"//").concat(n)},241:function(e,t,n){"use strict";n.r(t);n(111);var c=n(5),a=n(1),r=n(0),o=n(19),s=n(10),i=n(9),l=n(27),u=n(257),j=n(269),d=Object(r.createContext)(),b=function(e){var t=Object(r.useState)((function(){return localStorage.getItem("token")})),n=Object(c.a)(t,2),o=n[0],s=n[1],i=Object(r.useState)(),l=Object(c.a)(i,2),u=l[0],j=l[1],b=Object(r.useState)(!1),h=Object(c.a)(b,2),O=h[0],m=h[1],f=Object(r.useState)(!1),x=Object(c.a)(f,2),v=(x[0],x[1]),p=Object(r.useState)(!1),g=Object(c.a)(p,2),N=g[0],k=g[1];Object(r.useEffect)((function(){return null!=o||void 0!=o?S():null}),[]);var S=function(){k((function(e){return!0})),fetch("/api/token-auth/refresh/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:o})}).then((function(e){if(e.ok)return e.json();throw new Error("Token expired")})).then((function(e){console.log("Refresh token",e),C(e),k((function(e){return!1}))}),(function(e){console.log("Error",e)}))},C=function(e){s((function(t){return e.token})),j((function(t){return e.user})),m((function(e){return!0})),v((function(t){return e.user.is_staff})),localStorage.setItem("token",e.token)};return Object(a.jsx)(d.Provider,{value:{user:u,loginHandler:function(e,t){k((function(e){return!0})),fetch("/api/token-auth/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})}).then((function(e){return e.json()})).then((function(e){console.log("Login handler",e),C(e),k((function(e){return!1}))}))},logoutHandler:function(){j((function(e){return null})),m((function(e){return!1})),s((function(e){return null})),v((function(e){return!1})),localStorage.removeItem("token")},isLog:O,token:o,polling:N,handleTokenData:C},children:e.children})},h=d,O=function(){return Object(a.jsxs)("div",{className:"jumbotron text-center jumbotron-fluid",children:[Object(a.jsx)("div",{className:"display-2",children:"Para acceder a esta seccion debe registrarse o loguearse"}),Object(a.jsx)("a",{href:"/frontend/login/",className:"btn btn-lg btn-dark ml-3",children:"Login"}),Object(a.jsx)("a",{href:"/frontend/register/",className:"btn btn-lg btn-dark ml-3",children:"Registrarse"})]})},m=n(100),f=n.n(m),x=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=f.a.trim(n[c]);if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t},v=function(e){var t=Object(r.useContext)(h).isLog,n=e.room,c=n.host,o=n.current_users,i=n.code;return Object(a.jsxs)("div",{className:"card m-1 p-1 mb-3",children:[Object(a.jsxs)("div",{className:"card-header",children:[c.username,"'s room"]}),Object(a.jsxs)("div",{className:"card-body",children:[Object(a.jsxs)("ul",{class:"list-group list-group-flush",children:[Object(a.jsxs)("li",{class:"list-group-item",children:['Room "',n.nombre,'"']}),null===o||void 0===o?void 0:o.map((function(e){return Object(a.jsx)("li",{class:"list-group-item",children:e.username})}))]}),t&&Object(a.jsx)(s.b,{className:"btn btn-dark mt-3",to:"/frontend/rooms/".concat(i),children:"Ingresar"})]})]})},p=function(e){var t=Object(r.useState)(""),n=Object(c.a)(t,2),o=n[0],s=n[1];return Object(a.jsxs)("div",{className:"jumbotron text-center jumbotron-fluid",children:[Object(a.jsx)("div",{className:"display-2",children:"Cree un nuevo room"}),Object(a.jsxs)("div",{className:"form-group",children:[Object(a.jsxs)("label",{children:["Nombre:",Object(a.jsx)("input",{type:"text",className:"form-control",onChange:function(e){return s(e.target.value)},value:o})]}),Object(a.jsx)("button",{onClick:function(){fetch("/api/rooms/",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-CSRFToken":x("csrftoken")},body:JSON.stringify({nombre:o})}).then((function(e){return e.json()})).then((function(t){console.log(t),e.onChange(t)}),(function(e){return null}))},className:"m-3 btn btn-lg btn-dark",children:"Crear"})]}),Object(a.jsx)("div",{className:"display-4 text-muted",children:"O ingrese a uno ya creado"})]})};var g=function(){var e=Object(r.useContext)(h),t=e.isLog,n=(e.polling,Object(r.useState)(null)),o=Object(c.a)(n,2),s=o[0],i=o[1],d=Object(r.useState)(null),b=Object(c.a)(d,2),m=(b[0],b[1],Object(r.useState)(null)),f=Object(c.a)(m,2);f[0],f[1],Object(r.useEffect)((function(){return x()}),[]);var x=function(){return fetch("/api/rooms/").then((function(e){return e.json()})).then((function(e){return i((function(t){return e}))}))};return null==s?Object(a.jsx)("div",{children:"Cargando..."}):Object(a.jsxs)(u.a,{children:[t?Object(a.jsx)(p,{onChange:function(e){i((function(t){return[e].concat(Object(l.a)(t))}))}}):Object(a.jsx)(O,{}),Object(a.jsx)(j.a,{component:"div",overflow:"auto",maxHeight:"50vh",children:null===s||void 0===s?void 0:s.map((function(e){return Object(a.jsx)(v,{room:e})}))})]})},N=n(61),k=n(244),S=(n(258),n(259),n(260)),C=n(261);function y(){var e=Object(r.useRef)();return Object(r.useEffect)((function(){return e.current.scrollIntoView()})),Object(a.jsx)("div",{ref:e})}n(121);var w=function(){var e="".concat(window.location.protocol,"//").concat("https:"===window.location.protocol?window.location.host:"localhost:8000"),t="https:"===window.location.protocol?"wss":"ws",n="https:"===window.location.protocol?window.location.host:"localhost:8000",o=Object(i.h)().room,u=Object(r.useState)(null),j=Object(c.a)(u,2),d=j[0],b=j[1],h=Object(r.useState)(),O=Object(c.a)(h,2),m=O[0],f=O[1],v=Object(r.useState)(null),p=Object(c.a)(v,2),g=p[0],k=p[1],S=Object(r.useState)(null),C=Object(c.a)(S,2),w=C[0],T=C[1],_=Object(r.useState)((function(){return new WebSocket("".concat(t,"://").concat(n,"/ws/messages/"))})),I=Object(c.a)(_,2),J=I[0],R=I[1];Object(r.useEffect)((function(){return fetch("".concat(e,"/api/rooms/?code=").concat(o)).then((function(e){return e.json()})).then((function(e){b(e[0]),f(e[0].messages)}))}),[]);var E=function(){console.log(w),null!=w&&J.send(JSON.stringify({action:"create_message",message:w,request_id:x("csrftoken")})),T("")};return J.onmessage=function(e){var t=JSON.parse(e.data);console.log(t),"data"in t&&null!=t.data&&k(t.data.current_users),"usuarios"in t&&null!=t.usuarios&&k(t.usuarios),"create"===t.action&&"message.activity"===t.type&&f((function(e){return[].concat(Object(l.a)(e),[t])}))},J.onopen=function(){null!=d&&(J.send(JSON.stringify({pk:d.pk,action:"join_room",request_id:x("csrftoken")})),J.send(JSON.stringify({action:"subscribe_instance",pk:d.pk,request_id:x("csrftoken")})),J.send(JSON.stringify({action:"subscribe_to_messages_in_room",pk:d.pk,request_id:x("csrftoken")})))},J.onclose=function(e){console.error("Chat socket closed unexpectedly"),setTimeout((function(){return R(new WebSocket("".concat(t,"://").concat(n,"/ws/messages/")))}),1e4)},Object(a.jsxs)("div",{children:[Object(a.jsx)("nav",{"aria-label":"breadcrumb",children:Object(a.jsxs)("ol",{class:"breadcrumb",children:[Object(a.jsx)("li",{class:"breadcrumb-item",children:Object(a.jsx)(s.b,{to:"/frontend/rooms/",children:"Rooms"})}),Object(a.jsx)("li",{class:"breadcrumb-item active","aria-current":"page",children:null===d||void 0===d?void 0:d.nombre})]})}),Object(a.jsxs)("div",{className:"container",children:[Object(a.jsxs)("h3",{className:"text-capitalize",children:["Room ",null===d||void 0===d?void 0:d.nombre,", ",Object(a.jsxs)("small",{className:"text-muted",children:[null===d||void 0===d?void 0:d.host.username," is the host"]})]}),Object(a.jsxs)("div",{className:"row",children:[Object(a.jsx)("div",{className:"col-xl-2 col-md-12 col-sm-12",children:Object(a.jsxs)("div",{className:"row justify-content-center",children:[Object(a.jsx)("div",{className:"col-12 mb-2",children:Object(a.jsx)("ul",{class:"list-group",children:null===g||void 0===g?void 0:g.map((function(e){return Object(a.jsx)("li",{class:"list-group-item",children:e.username})}))})}),Object(a.jsx)("div",{className:"col-12 mb-2",children:Object(a.jsx)("textarea",{onKeyDown:function(e){return 13===e.keyCode?E():null},onChange:function(e){return T(e.target.value)},value:w,className:"form-control",rows:"3",placeholder:"Mensaje"})}),Object(a.jsx)("div",{className:"col-12 mb-2",children:Object(a.jsx)("button",{onClick:E,className:"btn btn-lg btn-dark",children:"Enviar"})})]})}),Object(a.jsx)("div",{className:"col",children:Object(a.jsxs)("div",{className:"card m-2 p-5 ",style:{maxHeight:"80vh",overflow:"auto"},children:[null===m||void 0===m?void 0:m.map((function(e){var t;return Object(a.jsx)("div",{className:"card mb-3",children:Object(a.jsx)("div",{className:"card-body",children:Object(a.jsxs)(N.a,{children:[e.created_at_formatted," ",null===(t=e.user)||void 0===t?void 0:t.username,": ",e.text]})})})})),Object(a.jsx)(y,{})]})})]})]})]})},T=n(104),_=n.n(T);n(223);var I=function(){var e="".concat(window.location.protocol,"//").concat("https:"===window.location.protocol?window.location.host:"localhost:8000");console.log(e),Object(i.h)(),Object(r.useRef)(null),Object(r.useRef)(null);var t=Object(r.useState)(null),n=Object(c.a)(t,2),o=n[0],l=n[1],u=Object(r.useState)(null),j=Object(c.a)(u,2),d=j[0],b=j[1],h=Object(r.useState)(""),O=Object(c.a)(h,2),m=O[0],f=O[1];return Object(a.jsxs)("div",{children:[Object(a.jsx)("nav",{"aria-label":"breadcrumb",children:Object(a.jsxs)("ol",{class:"breadcrumb",children:[Object(a.jsx)("li",{class:"breadcrumb-item",children:Object(a.jsx)(s.b,{to:"/frontend/notas/",children:"Notas"})}),Object(a.jsx)("li",{class:"breadcrumb-item active","aria-current":"page",children:"Nueva nota"})]})}),Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("h2",{children:"Crear una nueva nota"}),Object(a.jsxs)("div",{className:"row mb-3",children:[Object(a.jsxs)("div",{className:"col",children:[Object(a.jsx)("label",{htmlFor:"",children:"Titulo"}),Object(a.jsx)("input",{type:"text",value:o,onChange:function(e){return l(e.target.value)},className:"form-control form-control-lg"})]}),Object(a.jsxs)("div",{className:"col",children:[Object(a.jsx)("label",{htmlFor:"",children:"Subtitulo"}),Object(a.jsx)("input",{type:"text",value:d,onChange:function(e){return b(e.target.value)},className:"form-control form-control-sm"})]})]}),Object(a.jsx)(_.a,{ref:function(e){e&&(e.getEditor(),e.makeUnprivilegedEditor(e.getEditor()))},theme:"snow",value:m,onChange:function(e){return function(e){return f(e)}(e)},formats:["header","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image"],modules:{toolbar:[[{header:[1,2,!1]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image"],["clean"]]}}),Object(a.jsx)("div",{className:"form-group mt-3",children:Object(a.jsx)("button",{onClick:function(){return fetch("".concat(e,"/api/nota/"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("token")),"X-CSRFToken":x("csrftoken")},body:JSON.stringify({titulo:o,subtitulo:d,cuerpo:m,autor:window.username_id})}).then((function(e){return e.json()})).then((function(e){return console.log(e)}))},className:"btn btn-lg btn-dark",children:"Guardar"})})]})]})},J=n(263),R=n(271),E=n(264),L=n(265),F=n(262),P=n(24),q=n.n(P);var H=function(e){var t=e.comentario,n=t.autor;return Object(a.jsxs)(S.a,{children:[Object(a.jsx)(F.a,{title:n.username,subheader:t.created_at}),Object(a.jsx)(C.a,{children:Object(a.jsx)(N.a,{variant:"body1",children:t.cuerpo})})]})},D=function(e){var t=Object(r.useState)(null),n=Object(c.a)(t,2),o=n[0],s=n[1];return Object(a.jsxs)(J.a,{fullWidth:!0,children:[Object(a.jsx)(R.a,{required:!0,onChange:function(e){return s(e.target.value)},value:o,placeholder:"Comentario",fullWidth:!0,margin:"dense",className:"mb-2 mt-3"}),Object(a.jsx)(E.a,{onClick:function(){return fetch("/api/comentario/",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("token"))},body:JSON.stringify({cuerpo:o,nota:e.slug})}).then((function(e){return e.json()})).then((function(t){return e.setComments((function(e){return[].concat(Object(l.a)(e),[t])}))})).then(s((function(e){return""})))},color:"secondary",variant:"contained",children:"Comentar"})]})};var W=function(){var e=Object(r.useContext)(h),t=(e.user,e.isLog),n=Object(i.h)(),o=n.slug,l=Object(r.useState)(null),u=Object(c.a)(l,2),j=u[0],d=u[1],b=Object(r.useState)(null),O=Object(c.a)(b,2),m=O[0],f=O[1];Object(r.useEffect)((function(){return x()}),[]);var x=function(){return fetch("/api/nota/".concat(o,"/")).then((function(e){return e.json()})).then((function(e){d((function(t){return e})),f((function(t){return e.comentarios}))}))};return Object(a.jsxs)("div",{children:[Object(a.jsx)("nav",{"aria-label":"breadcrumb",children:Object(a.jsxs)("ol",{class:"breadcrumb",children:[Object(a.jsx)("li",{class:"breadcrumb-item",children:Object(a.jsx)(s.b,{to:"/frontend/notas/",children:"Notas"})}),Object(a.jsx)("li",{class:"breadcrumb-item active","aria-current":"page",children:n.slug})]})}),Object(a.jsxs)("div",{className:"container mt-2",children:[Object(a.jsxs)(k.a,{elevation:3,className:"p-5 mb-5",children:[Object(a.jsx)(N.a,{variant:"h2",children:null===j||void 0===j?void 0:j.titulo}),Object(a.jsx)(N.a,{variant:"h4",children:null===j||void 0===j?void 0:j.subtitulo}),Object(a.jsx)(N.a,{variant:"subtitle2",className:"text-muted",children:null===j||void 0===j?void 0:j.created_at}),Object(a.jsx)(N.a,{variant:"body1",children:j&&q()(j.cuerpo)})]}),Object(a.jsx)(L.a,{}),Object(a.jsx)(N.a,{variant:"h4",className:"mt-2 mb-2",children:"Comentarios"}),m&&m.map((function(e){return Object(a.jsxs)("div",{children:[Object(a.jsx)(H,{comentario:e},e.id),Object(a.jsx)(L.a,{className:"m-2"})]})})),t&&Object(a.jsx)(D,{setComments:f,slug:o})]})]})},U=n(266),A=n(267),z=n(29),B=n.n(z);var X=function(){var e=Object(r.useContext)(h),t=e.isLog,n=(e.polling,Object(r.useState)(null)),o=Object(c.a)(n,2),i=o[0],l=o[1];Object(r.useEffect)((function(){return d()}),[]);var d=function(){return fetch("/api/nota/").then((function(e){return e.json()})).then((function(e){return l(e)}))};return Object(a.jsxs)("div",{className:"container-fluid",children:[t?Object(a.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(a.jsx)(u.a,{container:!0,justify:"center",alignItems:"center",children:Object(a.jsxs)(N.a,{variant:"h2",children:["Cree una nueva nota ",Object(a.jsx)(s.b,{to:"/frontend/crear/nota/",children:"aqui"})]})})}):Object(a.jsx)(O,{}),Object(a.jsx)("div",{className:"container mt-2",children:Object(a.jsx)(u.a,{container:!0,spacing:2,direction:"row",children:null===i||void 0===i?void 0:i.map((function(e){return Object(a.jsx)(u.a,{item:!0,xs:12,md:4,xl:3,children:Object(a.jsx)(j.a,{component:"span",display:"block",children:Object(a.jsxs)(S.a,{children:[Object(a.jsx)(F.a,{title:e.titulo,subheader:e.created_at}),Object(a.jsx)(C.a,{className:"text-truncate",children:Object(a.jsx)(N.a,{paragraph:!0,children:q()(e.cuerpo,{replace:function(e){if("img"===e.tagName)return Object(a.jsx)("span",{})}})})}),Object(a.jsx)(U.a,{disableSpacing:!0,children:Object(a.jsx)(A.a,{children:Object(a.jsx)(s.b,{to:"/frontend/nota/".concat(e.slug),children:Object(a.jsx)(B.a,{})})})})]})})},e.id)}))})})]})};var G=function(e){Object(i.g)();var t=Object(r.useContext)(h),n=t.user,c=t.isLog,o=t.logoutHandler;return Object(a.jsxs)("nav",{className:"navbar navbar-expand-lg sticky-top navbar-dark bg-dark",children:[Object(a.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":".dual-collapse2",children:Object(a.jsx)("span",{className:"navbar-toggler-icon"})}),Object(a.jsx)("a",{className:"navbar-brand ml-2",href:"/frontend/notas/",children:"LOGO"}),Object(a.jsx)("div",{className:"navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2",children:Object(a.jsxs)("ul",{className:"navbar-nav mr-auto",children:[Object(a.jsx)("li",{className:"nav-item",children:Object(a.jsx)("a",{className:"nav-link",href:"/frontend/notas/",children:"Notas"})}),c&&Object(a.jsx)("li",{className:"nav-item",children:Object(a.jsx)("a",{className:"nav-link",href:"/frontend/crear/nota/",children:"Crear nota"})}),Object(a.jsx)("li",{className:"nav-item",children:Object(a.jsx)("a",{className:"nav-link",href:"/frontend/rooms/",children:"Chat Rooms"})})]})}),Object(a.jsx)("div",{className:"mx-auto order-0",children:Object(a.jsx)("a",{className:"navbar-brand mx-auto",children:"Title"})}),Object(a.jsx)("div",{className:"navbar-collapse collapse w-100 order-3 dual-collapse2",children:Object(a.jsx)("ul",{className:"navbar-nav ml-auto",children:c?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("li",{className:"nav-item",children:Object(a.jsx)("a",{className:"flex-sm-fill text-sm-center nav-link disabled",href:"#",children:null===n||void 0===n?void 0:n.username})}),Object(a.jsx)("li",{className:"nav-item",children:Object(a.jsx)("a",{className:"flex-sm-fill text-sm-center nav-link",onClick:o,children:"Cerrar sesion"})})]}):Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("li",{className:"nav-item",children:Object(a.jsx)("a",{className:"flex-sm-fill text-sm-center nav-link",href:"/frontend/login/",children:"Login"})}),Object(a.jsx)("li",{className:"nav-item",children:Object(a.jsx)("a",{className:"flex-sm-fill text-sm-center nav-link",href:"/frontend/register/",children:"Registrarse"})})]})})})]})},K=n(272);var M=function(e){Object(i.g)();var t=Object(i.f)(),n=Object(r.useContext)(h).loginHandler,o=Object(r.useState)(""),s=Object(c.a)(o,2),l=s[0],j=s[1],d=Object(r.useState)(""),b=Object(c.a)(d,2),O=b[0],m=b[1];return Object(a.jsx)(u.a,{container:!0,alignItems:"center",justify:"center",style:{height:"100vh"},children:Object(a.jsx)("form",{onSubmit:function(e){n(l,O),t.push("/frontend/notas/")},children:Object(a.jsxs)(J.a,{children:[Object(a.jsx)(N.a,{variant:"h3",children:"Log In"}),Object(a.jsx)(K.a,{children:Object(a.jsx)(R.a,{autoComplete:"username",type:"text",placeholder:"Usuario",value:l,onChange:function(e){return j((function(t){return e.target.value}))}})}),Object(a.jsx)(K.a,{children:Object(a.jsx)(R.a,{autoComplete:"password",type:"password",placeholder:"Contrase\xf1a",value:O,onChange:function(e){return m((function(t){return e.target.value}))}})}),Object(a.jsx)("input",{type:"submit",className:"btn btn-lg btn-dark"})]})})})};function V(e){Object(i.g)();var t=Object(i.f)(),n=Object(r.useContext)(h).handleTokenData,o=Object(r.useState)(""),s=Object(c.a)(o,2),j=s[0],d=s[1],b=Object(r.useState)(""),O=Object(c.a)(b,2),m=O[0],f=O[1],v=Object(r.useState)([]),p=Object(c.a)(v,2),g=p[0],k=p[1],S=0;return Object(a.jsx)(u.a,{container:!0,alignItems:"center",justify:"center",style:{height:"100vh"},children:Object(a.jsx)("form",{onSubmit:function(e){e.preventDefault(),fetch("/api/users/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":x("csrftoken")},body:JSON.stringify({username:j,password:m})}).then((function(e){return S=e.status,e.json()})).then((function(e){switch(console.log(e),S){case 201:n({user:e,token:e.token}),d((function(e){return""})),f((function(e){return""})),k((function(e){return[]})),t.push("/frontend/notas/");break;default:console.log("Else",e),k((function(t){return[].concat(Object(l.a)(t),[e.detail])}))}}))},children:Object(a.jsxs)(J.a,{children:[Object(a.jsx)(N.a,{variant:"h3",children:"Registrarse"}),g&&g.map((function(e){return Object(a.jsx)("ul",{children:Object(a.jsx)("li",{children:Object(a.jsx)(N.a,{variant:"p",children:e})})})})),Object(a.jsx)(K.a,{children:Object(a.jsx)(R.a,{required:!0,autoComplete:"",type:"text",placeholder:"Usuario",value:j,onChange:function(e){return d((function(t){return e.target.value}))}})}),Object(a.jsx)(K.a,{children:Object(a.jsx)(R.a,{required:!0,autoComplete:"",type:"password",placeholder:"Contrase\xf1a",value:m,onChange:function(e){return f((function(t){return e.target.value}))}})}),Object(a.jsx)("input",{type:"submit",className:"btn btn-lg btn-dark"})]})})})}function Q(e){return Object(a.jsx)(s.a,{children:Object(a.jsxs)(b,{children:[Object(a.jsx)(G,{}),Object(a.jsxs)(i.c,{children:[Object(a.jsx)(i.a,{exact:!0,path:"/frontend/",render:function(){return Object(a.jsx)("p",{children:"Home page"})}}),Object(a.jsx)(i.a,{exact:!0,path:"/frontend/rooms/",children:Object(a.jsx)(g,{})}),Object(a.jsx)(i.a,{exact:!0,path:"/frontend/rooms/:room/",children:Object(a.jsx)(w,{})}),Object(a.jsx)(i.a,{exact:!0,path:"/frontend/notas/",component:X}),Object(a.jsx)(i.a,{exact:!0,path:"/frontend/crear/nota/",component:I}),Object(a.jsx)(i.a,{exact:!0,path:"/frontend/nota/:slug/",children:Object(a.jsx)(W,{})}),Object(a.jsx)(i.a,{exact:!0,path:"/frontend/login/",children:Object(a.jsx)(M,{})}),Object(a.jsx)(i.a,{exact:!0,path:"/frontend/register/",children:Object(a.jsx)(V,{})})]})]})})}var Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,274)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))};function Z(){var e=Object(r.useState)((function(){return!!localStorage.getItem("token")})),t=Object(c.a)(e,2),n=t[0],o=t[1],s=Object(r.useState)(""),i=Object(c.a)(s,2),l=(i[0],i[1]);return Object(a.jsx)(Q,{loggedIn:n,setLoggedIn:o,setUsername:l,handle_login:function(e,t,n,c,a){e.preventDefault(),fetch("/api/token-auth/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:n})}).then((function(e){if(!e.ok)throw e;return e.json()})).then((function(e){localStorage.setItem("token",e.token),o((function(e){return!0})),l((function(t){return e.user.username})),a.goBack()}))},handle_logout:function(){localStorage.removeItem("token"),o((function(e){return!1})),l((function(e){return""}))}})}var $=document.getElementById("root");Object(o.render)(Object(a.jsx)(Z,{}),$),Y()}},[[241,1,2]]]);
//# sourceMappingURL=main.0a3d187d.chunk.js.map