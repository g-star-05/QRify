import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./EmailTemplate.css";

const EmailTemplate = () => {

const navigate = useNavigate();

const [email,setEmail] =
useState("");

const [subject,setSubject] =
useState("");

const [body,setBody] =
useState("");

const generateEmailQR = ()=>{

if(!email){

alert(
"Enter email"
);

return;

}

const emailQR =

`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

navigate(
"/qr-generator",
{
state:{
templateText:
emailQR
}
}
);

};

return(

<div className="email-template">

<h1>

Email QR

</h1>

<input

type="email"

placeholder=
"example@gmail.com"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

/>

<input

type="text"

placeholder=
"Subject"

value={subject}

onChange={(e)=>

setSubject(
e.target.value
)

}

/>

<textarea

placeholder=
"Email Body"

value={body}

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

);

};

export default EmailTemplate;