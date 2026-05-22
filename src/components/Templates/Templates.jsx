import "./Templates.css";

import { useNavigate }

from "react-router-dom";

const Templates = () => {

const navigate =
useNavigate();

const templates = [

{

title:
"Phone Call",

category:
"Contact",

icon:"📞",

fields:[

{
label:
"Phone Number",

type:
"text",

name:
"phone"
}

]

},

{

title:
"WhatsApp",

category:
"Social",

icon:"💬",

fields:[

{
label:
"Country Code",

type:
"text",

name:
"countryCode"
},

{
label:
"Phone Number",

type:
"text",

name:
"phone"
},

{
label:
"Message",

type:
"text",

name:
"message"
}

]

},

{

title:
"WiFi",

category:
"Network",

icon:"📶",

fields:[

{
label:
"WiFi Name",

type:
"text",

name:
"ssid"
},

{
label:
"Password",

type:
"password",

name:
"password"
}

]

},

{

title:
"Email",

category:
"Mail",

icon:"📧",

fields:[

{
label:
"Email",

type:
"email",

name:
"email"
},

{
label:
"Subject",

type:
"text",

name:
"subject"
}

]

},

{

title:
"Website",

category:
"Web",

icon:"🌐",

fields:[

{
label:
"Website URL",

type:
"text",

name:
"url"
}

]

},

{

title:
"Business Card",

category:
"Professional",

icon:"💼",

fields:[

{
label:
"Name",

type:
"text",

name:
"name"
},

{
label:
"Phone",

type:
"text",

name:
"phone"
},

{
label:
"Email",

type:
"email",

name:
"email"
},

{
label:
"Website URL",

type:
"text",

name:
"url"
},

{
label:
"Business Name",

type:
"text",

name:
"businessName"
},

{
label:
"Subtitle",

type:
"text",

name:
"subtitle",

default:
"Visit Today"
}

]

}

];


const openTemplate=
(template)=>{

navigate(

"/template-form",

{

state:{

template

}

}

);

};


return(

<section
className=
"templates-section">

<div
className=
"templates-header">

<h1>

QR Templates

</h1>

<p>

Choose template
and fill details

</p>

</div>


<div
className=
"templates-grid">

{

templates.map(

(item,index)=>(

<div

key=
{index}

className=
"template-card"

>

<div
className=
"template-placeholder">

{

item.icon

}

</div>


<div
className=
"template-content">

<span
className=
"template-category">

{

item.category

}

</span>


<h2>

{

item.title

}

</h2>


<button

onClick={()=>

openTemplate(
item
)

}

>

Use Template

</button>

</div>

</div>

)

)

}

</div>

</section>

);

};

export default Templates;