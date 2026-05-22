import {
useState,
useEffect,
useRef
} from "react";

import {
useLocation
} from "react-router-dom";

import axios from "axios";

import FrameSelector
from "../Frames/FrameSelector";

import "./QRGenerator.css";

const QRGenerator = ()=>{

const location =
useLocation();

const qrDownloadRef =
useRef(null);


/* MAIN */

const [text,
setText] =
useState("");

const [qrColor,
setQrColor] =
useState("#0f172a");

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


/* FRAME */

const [selectedFrame,
setSelectedFrame] =
useState("");

const [showFrames,
setShowFrames] =
useState(false);


/* BUSINESS */

const [frameBgColor,
setFrameBgColor] =
useState("#020617");

const [frameTextColor,
setFrameTextColor] =
useState("#ffffff");

const [businessTitle,
setBusinessTitle] =
useState("");

const [businessSubtitle,
setBusinessSubtitle] =
useState("");


useEffect(()=>{

if(
location.state
?.templateText
){

setText(

location.state
.templateText

);

}

if(
location.state
?.businessTitle
){

setBusinessTitle(

location.state
.businessTitle

);

}

if(
location.state
?.businessSubtitle
){

setBusinessSubtitle(

location.state
.businessSubtitle

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
()=>{

if(!qrImage)
return;

const link =

document
.createElement(
"a"
);

link.href =
qrImage;

link.download =

`qr-${
Date.now()
}.png`;

link.click();

};



/* LOGO */

const handleLogoUpload =
(e)=>{

const file =

e.target
.files[0];

if(file){

setLogoPreview(

URL
.createObjectURL(
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
"color-picker-row">

<div
className=
"color-box">

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
"color-box">

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

</div>


<div
className=
"color-picker-row">

<div
className=
"color-box">

<label>

Template BG

</label>

<input

type=
"color"

value=
{frameBgColor}

onChange={(e)=>

setFrameBgColor(
e.target.value
)

}

/>

</div>


<div
className=
"color-box">

<label>

Text Color

</label>

<input

type=
"color"

value=
{frameTextColor}

onChange={(e)=>

setFrameTextColor(
e.target.value
)

}

/>

</div>

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

<input

type=
"file"

accept=
"image/*"

onChange=
{handleLogoUpload}

/>

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

className=
{`qr-frame ${selectedFrame}`}

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

{businessTitle}

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
"QR"

className=
"qr-image"

/>

)

}


{

addLogo

&&

logoPreview

&& (

<img

src=
{logoPreview}

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

{businessSubtitle}

</p>

)

}

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