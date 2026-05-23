import "./Footer.css";

import {

Link

}

from "react-router-dom";

const Footer = () => {

return(

<footer
className=
"footer">


<div
className=
"footer-top">


{/* BRAND */}

<div
className=
"footer-brand">

<h1>

<span>

QR

</span>

ify

</h1>


<p>

Create stylish and
professional QR codes
with templates, logos,
frames and business
cards.

</p>

</div>



{/* LINKS */}

<div
className=
"footer-links">

<h2>

Quick Links

</h2>


<ul>

<li>

<Link
to="/">

Home

</Link>

</li>


<li>

<Link
to=
"/qr-generator">

Generator

</Link>

</li>


<li>

<Link
to=
"/templates">

Templates

</Link>

</li>


<li>

<Link
to=
"/Features">

Features

</Link>

</li>

</ul>

</div>






{/* CREATOR */}

<div
className=
"footer-contact">

<h2>

Developer

</h2>


<p>

Built & Designed
by<br></br>Gaurav Tare

</p>


<p>

Web-Developer

</p>


<div
className=
"social-icons">



</div>

</div>

</div>



<div
className=
"footer-bottom">

<p>

© 2026 QRify

•

Crafted by Gaurav

•

All Rights Reserved

</p>

</div>

</footer>

);

};

export default Footer;