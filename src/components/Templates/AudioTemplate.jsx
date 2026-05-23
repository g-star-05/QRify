import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AudioTemplate = ()=>{

const navigate =
useNavigate();

const [audio,
setAudio] =
useState(null);

const generateAudioQR =
async()=>{

if(!audio)
return;

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

`${import.meta.env.VITE_API_URL}${res.data.url}`

}
}
);

};

return(

<div>

<input

type="file"

accept="audio/*"

onChange={(e)=>

setAudio(
e.target.files[0]
)

}

/>

<button
onClick=
{generateAudioQR}
>

Generate QR

</button>

</div>

);

};

export default AudioTemplate;