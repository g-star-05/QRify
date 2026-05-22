import "./Hero.css";

import {

Link

}

from "react-router-dom";

const Hero = () => {

return(

<section
className=
"hero-section">

<div
className=
"hero-container">


{/* LEFT */}

<div
className=
"hero-content">


<div
className=
"hero-badge">

🚀 Smart QR Platform

</div>


<h1>

Create Beautiful

<span>

 QR Codes

</span>

For Business,
Brands &
Creators

</h1>


<p>

Generate stylish QR codes
with frames, templates,
logos and business cards.

</p>


<div
className=
"hero-buttons">

<Link
to=
"/qr-generator">

<button
className=
"hero-btn-primary">

Create QR

</button>

</Link>


<Link
to=
"/templates">

<button
className=
"hero-btn-secondary">

Explore Templates

</button>

</Link>

</div>



<div
className=
"hero-stats">

<div>

<h2>

50+

</h2>

<p>

Templates

</p>

</div>


<div>

<h2>

20+

</h2>

<p>

Frames

</p>

</div>


<div>

<h2>

∞

</h2>

<p>

Custom Designs

</p>

</div>

</div>

</div>



{/* RIGHT */}

<div
className=
"hero-preview">


<div
className=
"preview-card">


<div
className=
"preview-title">

QRify Pro

</div>


<div
className=
"preview-qr">

⌁

</div>


<p>

Scan & Visit

</p>

</div>

</div>

</div>

</section>

);

};

export default Hero;