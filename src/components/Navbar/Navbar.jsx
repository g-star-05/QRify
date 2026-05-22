import { useState } from "react";

import {

Link,

NavLink

}

from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {

const [

menuOpen,

setMenuOpen

] =

useState(
false
);


const closeMenu=
()=>{

setMenuOpen(
false
);

};


return(

<nav
className=
"navbar">


{/* LOGO */}

<Link

to="/"

className=
"logo"

>

<span>

QR

</span>

ify

</Link>



{/* MENU */}

<ul

className={

menuOpen

?

"nav-menu active"

:

"nav-menu"

}

>


<li>

<NavLink

to="/"

onClick=
{closeMenu}

className={({isActive})=>

isActive

?

"active-link"

:

""

}

>

Home

</NavLink>

</li>



<li>

<NavLink

to=
"/qr-generator"

onClick=
{closeMenu}

className={({isActive})=>

isActive

?

"active-link"

:

""

}

>

Generator

</NavLink>

</li>



<li>

<NavLink

to=
"/templates"

onClick=
{closeMenu}

className={({isActive})=>

isActive

?

"active-link"

:

""

}

>

Templates

</NavLink>

</li>



<li>

<NavLink

to=
"/features"

onClick=
{closeMenu}

className={({isActive})=>

isActive

?

"active-link"

:

""

}

>

Features

</NavLink>

</li>



<div
className=
"mobile-buttons">

<Link

to=
"/qr-generator"

onClick=
{closeMenu}

>

<button
className=
"start-btn">

Create QR

</button>

</Link>

</div>

</ul>



{/* DESKTOP BUTTON */}

<div
className=
"nav-buttons">

<Link
to=
"/qr-generator">

<button
className=
"start-btn">

Create QR

</button>

</Link>

</div>



{/* HAMBURGER */}

<div

className={

menuOpen

?

"hamburger active"

:

"hamburger"

}

onClick={()=>

setMenuOpen(

!menuOpen

)

}

>

<span></span>

<span></span>

<span></span>

</div>

</nav>

);

};

export default Navbar;