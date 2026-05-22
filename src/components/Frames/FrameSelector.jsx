import "./FrameSelector.css";

import {

frames

}

from "./framesData";


const FrameSelector = ({

selectedFrame,

setSelectedFrame

}) => {

const handleFrameClick =
(frameClass)=>{

if(

selectedFrame===

frameClass

){

/* DESELECT */

setSelectedFrame(
""
);

}

else{

/* SELECT */

setSelectedFrame(

frameClass

);

}

};


return(

<div
className=
"frame-selector">

<h3>

Frames

</h3>


<div
className=
"frame-grid">

{

frames.map(

(frame)=>(

<div

key=
{frame.id}

className={

selectedFrame===

frame.className

?

"frame-card active"

:

"frame-card"

}


onClick={()=>

handleFrameClick(

frame.className

)

}

>

<div
className=
"frame-preview">

□

</div>


<p>

{

frame.name

}

</p>

</div>

)

)

}

</div>

</div>

);

};

export default FrameSelector;