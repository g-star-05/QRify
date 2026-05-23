import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./PhotoTemplate.css";

const PhotoTemplate = ()=>{

const navigate =
useNavigate();

const [image,
setImage] =
useState(null);

const generatePhotoQR =
async()=>{

if(!image){

alert(
"Select image"
);

return;

}

try{

const form =
new FormData();

form.append(
"file",
image
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

}

catch(error){

console.log(
error
);

alert(
"Upload failed"
);

}

};

return(

<div className="photo-template">

<div className="photo-template-card">

<h1>

Photo QR

</h1>

<p>

Upload image and create QR

</p>

<input

type="file"

accept="image/*"

onChange={(e)=>

setImage(
e.target.files[0]
)

}

/>

{

image && (

<>

<div className="selected-file">

{image.name}

</div>

<div className="photo-preview">

<img

src={
URL.createObjectURL(
image
)
}

alt="preview"

/>

</div>

</>

)

}

<button
onClick=
{generatePhotoQR}
>

Generate QR

</button>

</div>

</div>

);

};

export default PhotoTemplate;