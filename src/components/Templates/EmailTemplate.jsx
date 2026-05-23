import { useState } from "react";

import {
useNavigate
}
from "react-router-dom";

import "./EmailTemplate.css";

const EmailTemplate = ()=>{

const navigate =
useNavigate();

const [email,
setEmail] =
useState("");

const [subject,
setSubject] =
useState("");

const [body,
setBody] =
useState("");


const generateEmailQR =
()=>{

if(
!email
)
return;


const emailText =

`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


navigate(

"/qr-generator",

{

state:{

templateText:
emailText

}

}

);

};


return(

<section
className=
"email-template">

<h1>

Email QR

</h1>

<p>

Generate email QR code

</p>


<div
className=
"email-card">

<input

type=
"email"

placeholder=
"Enter Email"

value=
{email}

onChange={(e)=>

setEmail(
e.target.value
)

}

/>


<input

type=
"text"

placeholder=
"Subject"

value=
{subject}

onChange={(e)=>

setSubject(
e.target.value
)

}

/>


<textarea

placeholder=
"Message"

value=
{body}

onChange={(e)=>

setBody(
e.target.value
)

}

/>


<button

onClick=
{generateEmailQR}

>

Generate QR

</button>

</div>

</section>

);

};

export default EmailTemplate;