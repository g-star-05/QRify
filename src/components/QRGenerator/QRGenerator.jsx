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

import html2canvas
from "html2canvas";

import FrameSelector
from "../Frames/FrameSelector";

import LogoSelector
from "../LogoSelector/LogoSelector";

import "./QRGenerator.css";


const QRGenerator = () => {

  const location =
  useLocation();

  const qrDownloadRef =
  useRef(null);


  /* MAIN */

  const [text,setText] =
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

  const [selectedLogo,
  setSelectedLogo] =
  useState("");


  /* FRAME */

  const [selectedFrame,
  setSelectedFrame] =
  useState("");

  const [frameBgColor,
  setFrameBgColor] =
  useState("#0f172a");

  const [frameTextColor,
  setFrameTextColor] =
  useState("#ffffff");


  /* BUSINESS */

  const [businessTitle,
  setBusinessTitle] =
  useState("");

  const [businessSubtitle,
  setBusinessSubtitle] =
  useState(
  "Visit Today"
  );



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

      "https://qrify-backend-a7vy.onrender.com/qr/generate",

      {

      text,

      color:
      qrColor,

      background:
      bgColor

      }

      );


      setQrImage(

      `http://127.0.0.1:8000${
      response.data
      .image_url
      }`

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

    try{

      if(
      !qrDownloadRef
      .current
      )
      return;


      const canvas =

      await html2canvas(

      qrDownloadRef
      .current,

      {

      backgroundColor:
      null,

      scale:3,

      useCORS:
      true,

      allowTaint:
      true

      }

      );


      const image =

      canvas.toDataURL(
      "image/png"
      );


      const link =

      document
      .createElement(
      "a"
      );


      link.href =
      image;

      link.download =

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



  /* CUSTOM LOGO */

  const handleLogoUpload =
  (e)=>{

    const file =

    e.target
    .files[0];


    if(file){

      /* REMOVE PREBUILT */

      setSelectedLogo(
      ""
      );


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

Create Your QR Code

</h1>

<p>

Generate QR instantly

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

<label>

URL Or Text

</label>

<input

type=
"text"

value=
{text}

placeholder=
"https://example.com"

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



<div
className=
"logo-option">

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

</div>



{

addLogo && (

<>

<LogoSelector

selectedLogo=
{selectedLogo}

setSelectedLogo={(logo)=>{

/* REMOVE CUSTOM */

setLogoPreview(
""
);

setSelectedLogo(
logo
);

}}

/>


<div
className=
"input-group">

<label>

Custom Logo

</label>

<input

type=
"file"

accept=
"image/*"

onChange=
{handleLogoUpload}

/>

</div>

</>

)

}



<FrameSelector

selectedFrame=
{selectedFrame}

setSelectedFrame=
{setSelectedFrame}

/>



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

businessTitle && (

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
to preview

</p>

)

}


<h3>

QR Preview

</h3>

</div>

</div>

</section>

);

};

export default QRGenerator;