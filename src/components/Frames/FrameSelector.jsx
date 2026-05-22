import "./FrameSelector.css";

import {
frames
}
from "./framesData";


const FrameSelector = ({

selectedFrame,

setSelectedFrame

})=>{


const handleFrameClick = (

frameClass

)=>{

if(

selectedFrame===

frameClass

){

setSelectedFrame(
""
);

}

else{

setSelectedFrame(

frameClass

);

}

};



return(

<div
className=
"frame-selector">

<div
className=
"frame-header">

<h3>

Choose Frame

</h3>

<span>

{

selectedFrame

?

"1 Selected"

:

"Optional"

}

</span>

</div>



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

className={

`frame-preview

${frame.className}`

}

>

<div
className=
"mini-qr">

□

</div>

</div>



<p>

{

frame.name

}

</p>


{

selectedFrame===

frame.className

&&(

<div
className=
"selected-badge">

✓

</div>

)

}

</div>

)

)

}

</div>

</div>

);

};

export default FrameSelector;