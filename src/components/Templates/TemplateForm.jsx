import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./TemplateForm.css";

const TemplateForm = () => {

const location = useLocation();

const navigate = useNavigate();

const template =
location.state?.template;


const [

formData,

setFormData

] = useState({});


const handleChange =
(e)=>{

const {

name,
value,
files,
type

} = e.target;

setFormData({

...formData,

[ name ]:

type==="file"

?

files[0]

:

value

});

};



const generateQR =
async()=>{

let qrText = "";


switch(
template.title
){

case "Phone Call":

qrText =

`tel:${formData.phone}`;

break;



case "WhatsApp":

const fullNumber =

`${

formData.countryCode

||

"+91"

}${

formData.phone

||

""

}`

.replace("+","")

.replace(/\s/g,"");


qrText =

`https://wa.me/${fullNumber}?text=${encodeURIComponent(formData.message||"")}`;

break;



case "WiFi":

qrText =

`WIFI:S:${formData.ssid};T:WPA;P:${formData.password};;`;

break;



case "Email":

qrText =

`mailto:${formData.email}?subject=${encodeURIComponent(formData.subject||"")}&body=${encodeURIComponent(formData.body||"")}`;

break;



case "Website":

let site =
formData.url?.trim();

if(

site

&&

!site.startsWith(
"http://"
)

&&

!site.startsWith(
"https://"
)

){

site =

`https://${site}`;

}

qrText =
site ||

"https://google.com";

break;



case "Audio QR":

if(
!formData.audio
){

alert(
"Upload audio"
);

return;

}

const audioForm =
new FormData();

audioForm.append(

"file",

formData.audio

);

const audioResponse =

await axios.post(

`${import.meta.env.VITE_API_URL}/media/upload-audio`,

audioForm

);

qrText =

`${import.meta.env.VITE_API_URL}${audioResponse.data.url}`;

break;



case "Photo QR":

if(
!formData.image
){

alert(
"Upload image"
);

return;

}

const imageForm =
new FormData();

imageForm.append(

"file",

formData.image

);

const imageResponse =

await axios.post(

`${import.meta.env.VITE_API_URL}/media/upload-image`,

imageForm

);

qrText =

`${import.meta.env.VITE_API_URL}${imageResponse.data.url}`;

break;



case "Business Card":

let website =
formData.url?.trim();

if(
!website
){

alert(
"Please enter website URL"
);

return;

}

if(

!website.startsWith(
"http://"
)

&&

!website.startsWith(
"https://"
)

){

website =

`https://${website}`;

}

navigate(

"/qr-generator",

{

state:{

templateText:
website,

businessTitle:

formData.businessName

||

formData.name

||

"Business",

businessSubtitle:

formData.subtitle

||

"Visit Today"

}

}

);

return;



default:

qrText="";

}


navigate(

"/qr-generator",

{

state:{

templateText:

qrText

}

}

);

};



if(
!template
){

return(

<h2>

Template not found

</h2>

);

}



return(

<section className="template-form-section">

<div className="template-form-card">

<h1>

{template.icon}

{" "}

{template.title}

QR

</h1>



<div className="template-fields">

{

template.fields.map(

(field,index)=>(

<div

key={index}

className="form-group"

>

<label>

{field.label}

</label>


{

field.type==="textarea"

?

(

<textarea

name={field.name}

placeholder={field.label}

rows="5"

onChange={handleChange}

/>

)

:

(

<input

type={field.type}

name={field.name}

accept={field.accept}

placeholder={field.label}

onChange={handleChange}

/>

)

}

</div>

)

)

}

</div>



<button

className="generate-template-btn"

onClick={generateQR}

>

Generate QR

</button>

</div>

</section>

);

};

export default TemplateForm;