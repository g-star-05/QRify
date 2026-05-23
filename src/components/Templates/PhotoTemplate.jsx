import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PhotoTemplate = ()=>{

const navigate =
useNavigate();

const [image,
setImage] =
useState(null);

const generatePhotoQR =
async()=>{

if(!image)
return;

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

`${import.meta.env.VITE_API_URL}${res.data.url}`

}
}
);

};

return(

<div>

<input

type="file"

accept="image/*"

onChange={(e)=>

setImage(
e.target.files[0]
)

}

/>

<button
onClick=
{generatePhotoQR}
>

Generate QR

</button>

</div>

);

};

export default PhotoTemplate;