import { useLocation }

from "react-router-dom";

import {

useState

}

from "react";

import {

useNavigate

}

from "react-router-dom";

import "./TemplateForm.css";

const TemplateForm = () => {

const location =
useLocation();

const navigate =
useNavigate();

const template =

location.state
?.template;


const [

formData,

setFormData

] =

useState({});


const handleChange=

(e)=>{

setFormData({

...formData,

[

e.target
.name

]:

e.target
.value

});

};


const generateQR=
()=>{

let qrText=
"";


switch(

template
.title

){


case
"Phone Call":

qrText=

`tel:${
formData.phone
}`;

break;



case
"WhatsApp":

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

.replace(
"+",
""
)

.replace(
/\s/g,
""
);


qrText=

`https://wa.me/${

fullNumber

}?text=${

encodeURIComponent(

formData.message

||

""

)

}`;

break;



case
"WiFi":

qrText=

`WIFI:S:${

formData.ssid

};T:WPA;P:${

formData.password

};;`;

break;



case
"Email":

qrText=

`mailto:${

formData.email

}?subject=${

formData.subject

||

""

}`;

break;



case
"Website":

let site =

formData.url
?.trim();


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

site=

`https://${site}`;

}


qrText=

site ||

"https://google.com";

break;



case
"Business Card":


let website =

formData.url
?.trim();


if(
!website
){

alert(

"Please enter website URL"

);

return;

}


/* AUTO HTTPS */

if(

!website.startsWith(
"http://"
)

&&

!website.startsWith(
"https://"
)

){

website=

`https://${website}`;

}


/* GO TO QR PAGE */

navigate(

"/qr-generator",

{

state:{

templateText:

website,

businessTitle:

formData
.businessName

||

formData.name

||

"Business",


businessSubtitle:

formData
.subtitle

||

"Visit Today"

}

}

);

return;



default:

qrText=
"";

}


/* OTHER TEMPLATES */

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

<section
className=
"template-form-section">

<div
className=
"template-form-card">


<h1>

{

template.icon

}

{

template.title

}

QR

</h1>



<div
className=
"template-fields">


{

template.fields
.map(

(field,index)=>(

<div

key=
{index}

className=
"form-group"

>

<label>

{

field.label

}

</label>


<input

type=
{

field.type

}

name=
{

field.name

}

placeholder=
{

field.label

}

onChange=
{

handleChange

}

/>

</div>

)

)

}


</div>



<button

className=
"generate-template-btn"

onClick=
{

generateQR

}

>

Generate QR

</button>


</div>

</section>

);

};

export default TemplateForm;