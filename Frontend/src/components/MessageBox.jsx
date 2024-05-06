import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "../App.css";


function MessageBox({messages, display, setDisplay, buttons}) {
    const [position, setPosition] = useState({
        x:window.innerWidth/2,
        y:window.innerHeight/2
    });
    const [grabbed, setGrabbed] = useState(false);

    const move = (e)=> {
       if(e.nativeEvent.offsetX <= 0
        || e.nativeEvent.offsetX >= 300
        || e.nativeEvent.offsetY <= 0
        || e.nativeEvent.offsetY >= 28) {
            setGrabbed(false);
        }

        if(!grabbed)
            return;

        setPosition(p=>(
            {
                ...p,
                x:p.x + e.nativeEvent.movementX,
                y:p.y + e.nativeEvent.movementY
            }
        ));
    };

    window.onresize = ()=> {
        setPosition({
            x:window.innerWidth/2,
            y:window.innerHeight/2
        });
    };

    return(
        <div className="message-box" 
        style={
            {
                display:display ? "block" : "none",
                left:position.x - 150,
                top:position.y - 150
            }
        }>
            <div className="message-box-header"
            onMouseDown={()=>setGrabbed(true)}
            onMouseUp={()=>setGrabbed(false)}
            onMouseMove={move}>
                <FontAwesomeIcon onClick={()=>setDisplay(false)}
                icon="fa-solid fa-circle-xmark"/>
            </div>
            <div className="message-box-body">
                <div>
                    {
                        messages.map((m, i)=> 
                            <h5 key={i}>{m}</h5>
                        )
                    }
                </div>
            </div>
            <div className="message-box-buttons">
                {
                    buttons.map((b, i)=> 
                        <button className="input-md btn-primary" onClick={b.cb} key={i}>
                            {b.text}
                            <FontAwesomeIcon 
                            className="ml-5"
                            icon={b.icon}/>
                        </button>
                    )
                }
            </div>
        </div>
    );
}

export default MessageBox;