import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./AudioTemplate.css";

const AudioTemplate = ()=>{

const navigate =
useNavigate();

const [audio,
setAudio] =
useState(null);

const generateAudioQR =
async()=>{

if(!audio){

alert(
"Select audio file"
);

return;

}

const form =
new FormData();

form.append(
"file",
audio
);

const res =
await axios.post(

`${import.meta.env.VITE_API_URL}/upload/`,

form

);

navigate(
"/qr-generator",
{
state:{
templateText:
res.data.url
}
}
);

};

return(

<div className="audio-template">

<div className="audio-template-card">

<h1>

Audio QR

</h1>

<p>

Upload audio and generate QR

</p>

<input

type="file"

accept="audio/*"

onChange={(e)=>

setAudio(
e.target.files[0]
)

}

/>

{

audio && (

<div className="selected-file">

{audio.name}

</div>

)

}

<button
onClick=
{generateAudioQR}
>

Generate QR

</button>

</div>

</div>

);

};

export default AudioTemplate;