import { useRef } from "react";
export default function TimeCount(){
    const counter = useRef(0);
    return (
        <div>
            <button onClick={()=>{console.log(counter.current);counter.current++}}>Click Me!</button>
        </div>
    )
}