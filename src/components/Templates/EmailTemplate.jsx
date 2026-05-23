import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EmailTemplate = () => {

const navigate = useNavigate();

const [email,setEmail] =
useState("");

const [subject,setSubject] =
useState("");

const generateEmailQR = ()=>{

const emailText =

`mailto:${email}?subject=${encodeURIComponent(subject)}`;

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

<div>

<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>
setEmail(
e.target.value
)
}

/>

<input

type="text"

placeholder="Subject"

value={subject}

onChange={(e)=>
setSubject(
e.target.value
)
}

/>

<button
onClick=
{generateEmailQR}
>

Generate

</button>

</div>

);

};

export default EmailTemplate;