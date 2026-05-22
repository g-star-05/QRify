import {
useState,
useEffect,
useRef
}
from "react";

import {
useLocation
}
from "react-router-dom";

import axios from "axios";

import html2canvas from "html2canvas";

import FrameSelector
from "../Frames/FrameSelector";

import LogoSelector
from "../LogoSelector/LogoSelector";

import "./QRGenerator.css";


const QRGenerator = ()=>{

const location=
useLocation();

const qrDownloadRef=
useRef(null);


/* STATES */

const [text,setText]=
useState("");

const [qrColor,setQrColor]=
useState("#111827");

const [bgColor,setBgColor]=
useState("#ffffff");

const [qrImage,setQrImage]=
useState("");

const [loading,setLoading]=
useState(false);

const [addLogo,setAddLogo]=
useState(false);

const [logoPreview,
setLogoPreview]=
useState("");

const [selectedLogo,
setSelectedLogo]=
useState("");

const [selectedFrame,
setSelectedFrame]=
useState("");

const [showFrames,
setShowFrames]=
useState(false);

const [businessTitle,
setBusinessTitle]=
useState("");

const [businessSubtitle,
setBusinessSubtitle]=
useState("");



useEffect(()=>{

if(
location.state?.templateText
){

setText(
location.state.templateText
);

}

if(
location.state?.businessTitle
){

setBusinessTitle(
location.state.businessTitle
);

}

if(
location.state?.businessSubtitle
){

setBusinessSubtitle(
location.state.businessSubtitle
);

}

},
[
location.state
]);



const generateQR=
async()=>{

if(!text)
return;

try{

setLoading(
true
);

const response=
await axios.post(

`${import.meta.env.VITE_API_URL}/qr/generate`,

{

text,

color:
qrColor,

background:
bgColor

}

);

setQrImage(

`${import.meta.env.VITE_API_URL}${response.data.qr_url}`

);

}

catch(error){

console.log(
error
);

}

finally{

setLoading(
false
);

}

};



const downloadQR=
async()=>{

if(
!qrDownloadRef.current
)
return;

try{

const canvas=

await html2canvas(

qrDownloadRef.current,

{

scale:4,

useCORS:true,

allowTaint:true,

backgroundColor:null

}

);

const image=

canvas.toDataURL(
"image/png"
);

const link=

document.createElement(
"a"
);

link.href=
image;

link.download=

`qr-${
Date.now()
}.png`;

document.body
.appendChild(
link
);

link.click();

document.body
.removeChild(
link
);

}

catch(error){

console.log(
error
);

}

};



const handleLogoUpload=
(e)=>{

const file=
e.target.files[0];

if(file){

setSelectedLogo(
""
);

setLogoPreview(

URL.createObjectURL(
file
)

);

}

};



return(

<section
className=
"qr-generator-section">

<div
className=
"qr-generator-header">

<h1>

Create QR

</h1>

<p>

Professional QR Generator

</p>

</div>



<div
className=
"qr-generator-container">


<div
className=
"qr-form">


<div
className=
"input-group">

<input

type=
"text"

placeholder=
"Enter URL"

value=
{text}

onChange={(e)=>

setText(
e.target.value
)

}

/>

</div>



<div
className=
"input-group">

<label>

QR Color

</label>

<input

type=
"color"

value=
{qrColor}

onChange={(e)=>

setQrColor(
e.target.value
)

}

/>

</div>



<div
className=
"input-group">

<label>

Background

</label>

<input

type=
"color"

value=
{bgColor}

onChange={(e)=>

setBgColor(
e.target.value
)

}

/>

</div>



<label
className=
"logo-option">

<input

type=
"checkbox"

checked=
{addLogo}

onChange={()=>

setAddLogo(
!addLogo
)

}

/>

Add Logo

</label>



{

addLogo && (

<>

<LogoSelector

selectedLogo=
{selectedLogo}

setSelectedLogo=
{setSelectedLogo}

/>

<input

type=
"file"

accept=
"image/*"

onChange=
{handleLogoUpload}

/>

</>

)

}



<button

className=
"frame-toggle-btn"

onClick={()=>

setShowFrames(

!showFrames

)

}

>

{

showFrames

?

"Hide Frames"

:

"Add Frame"

}

</button>



<div

className={

showFrames

?

"frame-wrapper show"

:

"frame-wrapper"

}

>

<FrameSelector

selectedFrame=
{selectedFrame}

setSelectedFrame=
{setSelectedFrame}

/>

</div>



<div
className=
"qr-buttons">

<button

className=
"generate-btn"

onClick=
{generateQR}

>

{

loading

?

"Generating..."

:

"Generate QR"

}

</button>


<button

className=
"download-btn"

onClick=
{downloadQR}

>

Download

</button>

</div>

</div>




<div
className=
"qr-preview-card">

<div

ref=
{qrDownloadRef}

className={

`qr-frame ${selectedFrame}`

}

>

{

businessTitle && (

<h2>

{

businessTitle

}

</h2>

)

}



<div
className=
"qr-wrapper">

{

qrImage && (

<img

src=
{qrImage}

alt=
"qr"

className=
"qr-image"

crossOrigin=
"anonymous"

/>

)

}


{

addLogo

&&

(

logoPreview
||
selectedLogo

)

&&(

<img

src={
logoPreview
||
selectedLogo
}

alt=
"logo"

className=
"qr-center-logo"

/>

)

}

</div>

</div>


<h3
className=
"preview-title">

Live Preview

</h3>

</div>

</div>

</section>

);

};

export default QRGenerator;