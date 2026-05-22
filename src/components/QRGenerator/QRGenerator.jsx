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

const location =
useLocation();

const qrDownloadRef =
useRef(null);


/* MAIN */

const [text,setText] =
useState("");

const [qrColor,
setQrColor] =
useState("#111827");

const [bgColor,
setBgColor] =
useState("#ffffff");

const [qrImage,
setQrImage] =
useState("");

const [loading,
setLoading] =
useState(false);


/* LOGO */

const [addLogo,
setAddLogo] =
useState(false);

const [logoPreview,
setLogoPreview] =
useState("");

const [selectedLogo,
setSelectedLogo] =
useState("");


/* FRAME */

const [selectedFrame,
setSelectedFrame] =
useState("");

const [showFrames,
setShowFrames] =
useState(false);


const [frameBgColor,
setFrameBgColor] =
useState("#071126");

const [frameTextColor,
setFrameTextColor] =
useState("#ffffff");


/* BUSINESS */

const [businessTitle,
setBusinessTitle] =
useState("");

const [businessSubtitle,
setBusinessSubtitle] =
useState("Visit Today");



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


/* GENERATE */

const generateQR =
async()=>{

if(!text)
return;

try{

setLoading(
true
);

const response =
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



/* DOWNLOAD */

const downloadQR =
async()=>{

if(
!qrDownloadRef.current
)
return;

try{

const canvas =

await html2canvas(

qrDownloadRef.current,

{

scale:3,

useCORS:true,

backgroundColor:null

}

);

const image =

canvas.toDataURL(
"image/png"
);

const link =
document.createElement(
"a"
);

link.href =
image;

link.download =

`qr-${
Date.now()
}.png`;

link.click();

}

catch(error){

console.log(
error
);

}

};



const handleLogoUpload =
(e)=>{

const file =
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

Create Your QR

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



<label>

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



<div
className=
"mobile-frame-section">

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


{

showFrames && (

<FrameSelector

selectedFrame=
{selectedFrame}

setSelectedFrame=
{setSelectedFrame}

/>

)

}

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

Download QR

</button>

</div>

</div>




<div
className=
"qr-preview-card">

{

qrImage ?

(

<div

ref=
{qrDownloadRef}

className={

`qr-frame
${selectedFrame}`

}

style={{

background:
frameBgColor

}}

>

{

businessTitle && (

<h2
style={{
color:
frameTextColor
}}
>

{
businessTitle
}

</h2>

)

}



<div
className=
"qr-wrapper">

<img

src=
{qrImage}

alt=
"QR"

className=
"qr-image"

/>


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



{

businessSubtitle && (

<p
style={{
color:
frameTextColor
}}
>

{
businessSubtitle
}

</p>

)

}

</div>

)

:

(

<p>

Generate QR

</p>

)

}



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